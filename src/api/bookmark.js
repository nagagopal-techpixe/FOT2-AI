import axiosInstance from "./axiosInstance";

// Save a conversation to bookmarks
export const addBookmarkApi = (conversationId) =>
  axiosInstance.post(`/bookmarks/${conversationId}`);

// Get all bookmarks for logged-in user
export const getBookmarksApi = () =>
  axiosInstance.get("/bookmarks");

// Remove a bookmark
export const removeBookmarkApi = (conversationId) =>
  axiosInstance.delete(`/bookmarks/${conversationId}`);

// Check if a conversation is already bookmarked (returns { isBookmarked: true/false })
export const checkBookmarkApi = (conversationId) =>
  axiosInstance.get(`/bookmarks/check/${conversationId}`);