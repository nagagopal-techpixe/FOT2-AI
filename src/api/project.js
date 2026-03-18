import axiosInstance from "./axiosInstance";

// Get all projects
export const getAllProjectsApi = () =>
  axiosInstance.get("/projects");

// Create new project (title + description + optional image)
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