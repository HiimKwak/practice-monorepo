import { useSuspenseQuery } from '@tanstack/react-query';

import { getMatchById } from './api';

export const QUERY_KEY = {
  MATCH_DETAIL: 'MATCH_DETAL',
};

export default function useGameDetail(matchId: string) {
  const { data, isLoading, error } = useSuspenseQuery({
    queryKey: [QUERY_KEY.MATCH_DETAIL, matchId],
    queryFn: () => getMatchById(matchId),
  });

  return {
    matchDetail: data,
    isLoading,
    error,
  };
}
