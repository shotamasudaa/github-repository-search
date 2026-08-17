type Order = "desc" | "asc";

export type SearchRepositoriesParams = {
	query: string;
	sort?: string;
	order?: Order;
	perPage?: number;
	page?: number;
};

export type GitHubRepository = {
	id: number;
	name: string;
	full_name: string;
	html_url: string;
	description: string | null;
	stargazers_count: number;
	language: string | null;
};

export type GitHubSearchRepositoriesResponse = {
	total_count: number;
	incomplete_results: boolean;
	items: GitHubRepository[];
};

export type Repository = {
	id: number;
	name: string;
	fullName: string;
	url: string;
	description: string | null;
	stargazersCount: number;
	language: string | null;
};

export type SearchRepositoriesResponse = {
	totalCount: number;
	incompleteResults: boolean;
	items: Repository[];
};
