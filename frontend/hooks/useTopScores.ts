import { useQuery } from "@tanstack/react-query";
import { fetchTopScores } from "../lib/api/scores";

/**
 * Hook pour récupérer le top 10 des scores.
 */
export function useTopScores() {
  return useQuery({
    queryKey: ["top-scores"],
    queryFn: fetchTopScores,
  });
}
