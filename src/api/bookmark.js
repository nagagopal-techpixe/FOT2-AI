import axiosInstance from "./axiosInstance";

// Save a conversation to bookmarks
export const addBookmarkApi = (conversationId) =>
  axiosInstance.post(`/api/bookmarks/${conversationId}`);

// Get all bookmarks for logged-in user
export const getBookmarksApi = () =>
  axiosInstance.get("/api/bookmarks");

// Remove a bookmark
export const removeBookmarkApi = (conversationId) =>
  axiosInstance.delete(`/api/bookmarks/${conversationId}`);

// Check if a conversation is already bookmarked (returns { isBookmarked: true/false })
export const checkBookmarkApi = (conversationId) =>
  axiosInstance.get(`/api/bookmarks/check/${conversationId}`);