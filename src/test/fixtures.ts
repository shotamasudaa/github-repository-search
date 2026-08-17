import type { GitHubSearchRepositoriesResponse } from "../types/search-repositories";

export const githubSearchResponse: GitHubSearchRepositoriesResponse = {
	total_count: 1,
	incomplete_results: false,
	items: [
		{
			id: 1,
			name: "react",
			full_name: "facebook/react",
			html_url: "https://github.com/facebook/react",
			description: "A JavaScript library for building user interfaces.",
			stargazers_count: 100,
			language: "TypeScript",
		},
	],
};

export const createJsonResponse = (
	body: GitHubSearchRepositoriesResponse,
	status = 200,
) => new Response(JSON.stringify(body), { status });
