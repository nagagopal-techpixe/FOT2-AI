import axiosInstance from "./axiosInstance";

// Create a new empty conversation (called on "New Chat" click)
export const createConversationApi = (title = "Untitled") =>
  axiosInstance.post("/conversations/create", { title });

// Send a message and get AI reply
export const sendMessageApi = (conversationId, text) =>
  axiosInstance.post(`/conversations/${conversationId}/message`, { text });

// Get full conversation with all messages (used when opening from bookmark/history)
export const getConversationApi = (conversationId) =>
  axiosInstance.get(`/conversations/${conversationId}`);

// Get all conversations (history list)
export const getAllConversationsApi = (search = "") =>
  axiosInstance.get(`/conversations${search ? `?search=${search}` : ""}`);

// Delete a conversation
export const deleteConversationApi = (conversationId) =>
  axiosInstance.delete(`/conversations/${conversationId}`);

// Clear all conversations
export const clearAllConversationsApi = () =>
  axiosInstance.delete("/conversations/clear");