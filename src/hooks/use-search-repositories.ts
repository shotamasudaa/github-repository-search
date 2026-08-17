import { useQuery } from "@tanstack/react-query";
import { searchRepositories } from "../api/search-repositories";
import type { SearchRepositoriesParams } from "../types/search-repositories";

export const useSearchRepositories = (params: SearchRepositoriesParams) => {
	return useQuery({
		queryKey: ["search-repositories", params],
		queryFn: async () => searchRepositories(params),
		enabled: params.query.length > 0,
	});
};
