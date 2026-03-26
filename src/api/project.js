import axiosInstance from "./axiosInstance";

// Get all projects
export const getAllProjectsApi = () =>
  axiosInstance.get("/projects");

// Get single project + its conversations
export const getProjectByIdApi = (projectId) =>
  axiosInstance.get(`/projects/${projectId}`);

// Get conversations saved to a project
export const getProjectConversationsApi = (projectId) =>
  axiosInstance.get(`/projects/${projectId}/conversations`);

// Create new project
export const createProjectApi = (title, description, image) => {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description || "");
  if (image) formData.append("image", image);
  return axiosInstance.post("/projects/create", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// Rename project
export const renameProjectApi = (projectId, title) =>
  axiosInstance.put(`/projects/${projectId}/rename`, { title });

// Delete project
export const deleteProjectApi = (projectId) =>
  axiosInstance.delete(`/projects/${projectId}`);

// Save a conversation to a project
export const saveConversationToProjectApi = (projectId, conversationId) =>
  axiosInstance.post(`/projects/${projectId}/conversations`, { conversationId });

// Remove a conversation from a project
export const removeConversationFromProjectApi = (projectId, conversationId) =>
  axiosInstance.delete(`/projects/${projectId}/conversations/${conversationId}`);