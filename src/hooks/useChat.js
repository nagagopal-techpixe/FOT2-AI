import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  createConversationApi,
  sendMessageApi,
  getConversationApi,
  getAllConversationsApi,
  deleteConversationApi,
} from "../api/chat";

const useChat = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [conversationId, setConversationId] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ── Reset chat state
  const resetChat = useCallback(() => {
    setMessages([]);
    setConversationId(null);
  }, []);

  // ── Create new conversation
  const startNewChat = useCallback(async () => {
    try {
      const res = await createConversationApi();
      const { conversationId: id } = res.data;
      setConversationId(id);
      setMessages([]);
      navigate(`/app/chat/${id}`);
      return id;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create chat.");
    }
  }, [navigate]);

  // ── Send message + get AI reply
  const sendMessage = useCallback(async (formData, convId) => {
    const targetId = convId || conversationId;
    const text = formData.get("text") || "";
    const imageFiles = formData.getAll("images"); // array of File objects

    if (!targetId || (!text.trim() && imageFiles.length === 0)) return;

    // 1. Optimistic update — show user message immediately with blob previews
    const optimisticUserMsg = {
      role: "user",
      text: text.trim(),
      imageUrls: imageFiles.map((f) => URL.createObjectURL(f)),
      _optimistic: true,
    };
    setMessages((prev) => [...prev, optimisticUserMsg]);
    setIsGenerating(true);

    try {
      // 2. Send to API
      const res = await sendMessageApi(targetId, text, imageFiles);
      const { userMessage, aiMessage } = res.data;

      // 3. Normalize imageUrls for consistent rendering
      const realUserMsg = {
        ...userMessage,
        imageUrls: userMessage.imageUrls || [],
      };

      // 4. Replace optimistic msg with real user msg + AI reply
      setMessages((prev) => [
        ...prev.slice(0, -1), // remove optimistic
        realUserMsg,
        { ...aiMessage, imageUrls: [] },
      ]);

      setConversationId(targetId);
    } catch (err) {
      // Remove optimistic message on failure
      setMessages((prev) => prev.filter((m) => !m._optimistic));
      setError(err.response?.data?.message || "Failed to send message.");
    } finally {
      setIsGenerating(false);
    }
  }, [conversationId]);

  // ── Load existing conversation
  const loadConversation = useCallback(async (convId) => {
    setLoading(true);
    setError(null);
    try {
      const res = await getConversationApi(convId);
      const { conversation } = res.data;
      setConversationId(conversation._id);

      // Normalize imageUrls so JSX can use msg.imageUrls everywhere
      const mapped = (conversation.messages || []).map((m) => ({
        ...m,
        imageUrls: m.imageUrls || [],
      }));
      setMessages(mapped);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load conversation.");
    } finally {
      setLoading(false);
    }
  }, []);

  // ── Get all conversations
  const fetchAllConversations = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getAllConversationsApi();
      setConversations(res.data.conversations);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch history.");
    } finally {
      setLoading(false);
    }
  }, []);

  // ── Delete conversation
  const deleteConversation = useCallback(async (convId) => {
    try {
      await deleteConversationApi(convId);
      setConversations((prev) => prev.filter((c) => c._id !== convId));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete.");
    }
  }, []);

  return {
    messages,
    conversationId,
    isGenerating,
    conversations,
    loading,
    error,
    resetChat,
    startNewChat,
    sendMessage,
    loadConversation,
    fetchAllConversations,
    deleteConversation,
  };
};

export default useChat;