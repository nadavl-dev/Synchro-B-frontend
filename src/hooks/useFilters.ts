import { useQuery } from '@tanstack/react-query';
import apiClient from '../api/client';
import { Filter } from '../types';

export const useFilters = () => {
  return useQuery({
    queryKey: ['filters'],
    queryFn: async () => {
      const response = await apiClient.get<Filter>('/filters');
      return response.data;
    },
    staleTime: 1000 * 60 * 60, // 1 hour
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
  });
};
