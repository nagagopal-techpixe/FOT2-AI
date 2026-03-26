import axiosInstance from "./axiosInstance";

// Create a new empty conversation (called on "New Chat" click)
export const createConversationApi = (title = "Untitled") =>
  axiosInstance.post("/conversations/create", { title });

// Send a message and get AI reply — accepts single File, File[], or null
export const sendMessageApi = (conversationId, text, images) => {
  const formData = new FormData();
  formData.append("text", text);

  if (images) {
    // Normalize: single File → array, so we always loop
    const files = Array.isArray(images) ? images : [images];
    files.forEach((file) => formData.append("images", file)); // matches uploadChat.array("images", 10)
  }

  return axiosInstance.post(
    `/conversations/${conversationId}/message`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

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