import { describe, expect, it, vi } from "vitest";
import { createJsonResponse, githubSearchResponse } from "../test/fixtures";
import { searchRepositories } from "./search-repositories";

describe("searchRepositories", () => {
	it("検索パラメータを送信し、レスポンスを画面用の形式へ変換する", async () => {
		const fetchMock = vi
			.fn()
			.mockResolvedValue(createJsonResponse(githubSearchResponse));
		vi.stubGlobal("fetch", fetchMock);

		await expect(
			searchRepositories({
				query: "react query",
				sort: "stars",
				order: "desc",
				page: 2,
				perPage: 20,
			}),
		).resolves.toEqual({
			totalCount: 1,
			incompleteResults: false,
			items: [
				{
					id: 1,
					name: "react",
					fullName: "facebook/react",
					url: "https://github.com/facebook/react",
					description: "A JavaScript library for building user interfaces.",
					stargazersCount: 100,
					language: "TypeScript",
				},
			],
		});

		const requestedUrl = new URL(String(fetchMock.mock.calls[0][0]));
		expect(requestedUrl.searchParams.get("q")).toBe("react query");
		expect(requestedUrl.searchParams.get("sort")).toBe("stars");
		expect(requestedUrl.searchParams.get("order")).toBe("desc");
		expect(requestedUrl.searchParams.get("page")).toBe("2");
		expect(requestedUrl.searchParams.get("per_page")).toBe("20");
	});

	it("不完全な検索結果を保持する", async () => {
		const fetchMock = vi.fn().mockResolvedValue(
			createJsonResponse({
				...githubSearchResponse,
				incomplete_results: true,
			}),
		);
		vi.stubGlobal("fetch", fetchMock);

		await expect(searchRepositories({ query: "react" })).resolves.toMatchObject(
			{
				incompleteResults: true,
			},
		);
	});

	it("API が失敗した場合に例外を送出する", async () => {
		vi.stubGlobal(
			"fetch",
			vi.fn().mockResolvedValue(new Response(null, { status: 403 })),
		);

		await expect(searchRepositories({ query: "react" })).rejects.toThrow(
			"failed to search repositories.",
		);
	});
});
