import { useMutation } from '@tanstack/react-query';
import apiClient from '../api/client';
import { RecommendRequest, RecommendResponse } from '../types';

export const useRecommend = () => {
  return useMutation({
    mutationFn: async (request: RecommendRequest) => {
      const response = await apiClient.post<RecommendResponse>('/recommend', request);
      return response.data;
    },
  });
};
