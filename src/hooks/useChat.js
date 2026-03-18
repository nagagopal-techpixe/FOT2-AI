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

  // ── Reset chat state ───────────────────────────────────────────────────────
  const resetChat = useCallback(() => {
    setMessages([]);
    setConversationId(null);
  }, []);

  // ── Create new conversation ────────────────────────────────────────────────
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

  // ── Send message + get AI reply ────────────────────────────────────────────
 const sendMessage = useCallback(async (formData, convId) => {
  const targetId = convId || conversationId;

  const text = formData.get("text");
  const image = formData.get("image");
    // ✅ Add these logs
  console.log("targetId:", targetId);
  console.log("text:", text);
  console.log("image:", image);


  if (!targetId || (!text && !image)) return;

  // optimistic UI
  const optimisticUserMsg = {
    role: "user",
    text: text || "",
    image: image ? URL.createObjectURL(image) : null,
  };

  setMessages((prev) => [...prev, optimisticUserMsg]);
  setIsGenerating(true);

  try {
    // ✅ pass text and image separately — NOT formData
    const res = await sendMessageApi(targetId, text, image);
    const { aiMessage } = res.data;
    setMessages((prev) => [...prev, aiMessage]);
  } catch (err) {
    setError(err.response?.data?.message || "Failed to send message.");
  } finally {
    setIsGenerating(false);
  }
}, [conversationId]);

  // ── Load existing conversation ─────────────────────────────────────────────
  const loadConversation = useCallback(async (convId) => {
    setLoading(true);
    setError(null);
    try {
      const res = await getConversationApi(convId);
      const { conversation } = res.data;
      setConversationId(conversation._id);
      setMessages(conversation.messages);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load conversation.");
    } finally {
      setLoading(false);
    }
  }, []);

  // ── Get all conversations ──────────────────────────────────────────────────
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

  // ── Delete conversation ────────────────────────────────────────────────────
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