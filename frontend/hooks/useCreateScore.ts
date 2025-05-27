import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createScore } from "../lib/api/scores";

/**
 * Hook pour envoyer un nouveau score et rafraîchir le top 10 et les stats.
 */
export function useCreateScore() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createScore,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["top-scores"] });
      queryClient.invalidateQueries({ queryKey: ["score-stats"] });
    },
  });
}
