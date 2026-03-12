import axiosInstance from "./axiosInstance";

export const generateShareLinkApi    = (conversationId) => axiosInstance.post(`/api/share/${conversationId}`);
export const revokeShareLinkApi      = (conversationId) => axiosInstance.delete(`/api/share/${conversationId}`);
export const getSharedConversationApi  = (shareToken)   => axiosInstance.get(`/api/share/view/${shareToken}`);
export const getSharedConversationsApi = ()             => axiosInstance.get(`/api/share`);