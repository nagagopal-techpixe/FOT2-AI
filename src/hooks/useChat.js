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

  // ── Create new conversation (called on "New Chat" click) ───────────────────
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
  const sendMessage = useCallback(async (text, convId) => {
    const targetId = convId || conversationId;
    if (!targetId || !text.trim()) return;

    // Immediately show user message in UI
    const optimisticUserMsg = { role: "user", text };
    setMessages((prev) => [...prev, optimisticUserMsg]);
    setIsGenerating(true);

    try {
      const res = await sendMessageApi(targetId, text);
      const { aiMessage } = res.data;

      // Add AI reply to messages
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send message.");
    } finally {
      setIsGenerating(false);
    }
  }, [conversationId]);

  // ── Load existing conversation (from bookmark or history) ──────────────────
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

  // ── Get all conversations (history) ───────────────────────────────────────
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
    startNewChat,
    sendMessage,
    loadConversation,
    fetchAllConversations,
    deleteConversation,
  };
};

export default useChat;