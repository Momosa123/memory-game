import { useQuery } from "@tanstack/react-query";
import { fetchScoreStats } from "../lib/api/scores";

/**
 * Hook pour récupérer les statistiques globales sur les scores.
 */
export function useScoreStats() {
  return useQuery({
    queryKey: ["score-stats"],
    queryFn: fetchScoreStats,
  });
}
