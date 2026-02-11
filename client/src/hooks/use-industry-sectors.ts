import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";

export function useIndustrySectors() {
  return useQuery({
    queryKey: [api.industrySectors.list.path],
    queryFn: async () => {
      const res = await fetch(api.industrySectors.list.path);
      if (!res.ok) throw new Error("Failed to fetch industry sectors");
      return api.industrySectors.list.responses[200].parse(await res.json());
    },
  });
}
