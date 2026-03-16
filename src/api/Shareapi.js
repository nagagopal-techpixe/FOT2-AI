import axiosInstance from "./axiosInstance";

export const generateShareLinkApi    = (conversationId) => axiosInstance.post(`/share/${conversationId}`);
export const revokeShareLinkApi      = (conversationId) => axiosInstance.delete(`/share/${conversationId}`);
export const getSharedConversationApi  = (shareToken)   => axiosInstance.get(`/share/view/${shareToken}`);
export const getSharedConversationsApi = ()             => axiosInstance.get(`/share`);