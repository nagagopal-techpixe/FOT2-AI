import { useState, useCallback } from "react";
import {
  getAllProjectsApi,
  createProjectApi,
  renameProjectApi,
  deleteProjectApi,
} from "../api/project";

const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ── Fetch all projects ─────────────────────────────────────────────────────
  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getAllProjectsApi();
      setProjects(res.data.projects);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch projects.");
    } finally {
      setLoading(false);
    }
  }, []);

  // ── Create project ─────────────────────────────────────────────────────────
  const createProject = useCallback(async (title, description, image) => {
    try {
      const res = await createProjectApi(title, description, image);
      // Add new project to top of list
      setProjects((prev) => [res.data.project, ...prev]);
      return res.data.project;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create project.");
    }
  }, []);

  // ── Rename project ─────────────────────────────────────────────────────────
  const renameProject = useCallback(async (projectId, title) => {
    try {
      const res = await renameProjectApi(projectId, title);
      setProjects((prev) =>
        prev.map((p) => (p._id === projectId ? res.data.project : p))
      );
    } catch (err) {
      setError(err.response?.data?.message || "Failed to rename project.");
    }
  }, []);

  // ── Delete project ─────────────────────────────────────────────────────────
  const deleteProject = useCallback(async (projectId) => {
    try {
      await deleteProjectApi(projectId);
      setProjects((prev) => prev.filter((p) => p._id !== projectId));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete project.");
    }
  }, []);

  return {
    projects,
    loading,
    error,
    fetchProjects,
    createProject,
    renameProject,
    deleteProject,
  };
};

export default useProjects;