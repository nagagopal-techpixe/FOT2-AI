import axiosInstance from "./axiosInstance";

// Create a new empty conversation (called on "New Chat" click)
export const createConversationApi = (title = "Untitled") =>
  axiosInstance.post("/api/conversations/create", { title });

// Send a message and get AI reply
export const sendMessageApi = (conversationId, text) =>
  axiosInstance.post(`/api/conversations/${conversationId}/message`, { text });

// Get full conversation with all messages (used when opening from bookmark/history)
export const getConversationApi = (conversationId) =>
  axiosInstance.get(`/api/conversations/${conversationId}`);

// Get all conversations (history list)
export const getAllConversationsApi = () =>
  axiosInstance.get("/api/conversations");

// Delete a conversation
export const deleteConversationApi = (conversationId) =>
  axiosInstance.delete(`/api/conversations/${conversationId}`);