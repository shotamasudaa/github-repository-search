import type {
	GitHubSearchRepositoriesResponse,
	SearchRepositoriesParams,
	SearchRepositoriesResponse,
} from "../types/search-repositories";

const GITHUB_API_BASE_URL = "https://api.github.com";

export const searchRepositories = async (
	params: SearchRepositoriesParams,
): Promise<SearchRepositoriesResponse> => {
	const url = new URL("/search/repositories", GITHUB_API_BASE_URL);

	const searchParams = new URLSearchParams({
		q: params.query,
	});

	if (params.sort) searchParams.set("sort", params.sort);
	if (params.order) searchParams.set("order", params.order);
	if (params.perPage) searchParams.set("per_page", String(params.perPage));
	if (params.page) searchParams.set("page", String(params.page));

	url.search = searchParams.toString();

	const response = await fetch(url);

	if (!response.ok) {
		throw new Error("failed to search repositories.");
	}

	const data: GitHubSearchRepositoriesResponse = await response.json();

	return {
		totalCount: data.total_count,
		incompleteResults: data.incomplete_results,
		items: data.items.map((repository) => ({
			id: repository.id,
			name: repository.name,
			fullName: repository.full_name,
			url: repository.html_url,
			description: repository.description,
			stargazersCount: repository.stargazers_count,
			language: repository.language,
		})),
	};
};
