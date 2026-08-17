import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { App } from "./app";
import { createJsonResponse, githubSearchResponse } from "./test/fixtures";

const renderApp = () => {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				retry: false,
				gcTime: 0,
			},
		},
	});

	return render(
		<QueryClientProvider client={queryClient}>
			<App />
		</QueryClientProvider>,
	);
};

const search = async (query = "react") => {
	const user = userEvent.setup();
	await user.type(screen.getByLabelText("リポジトリを検索"), query);
	await user.click(screen.getByRole("button", { name: "検索" }));
	return user;
};

describe("App", () => {
	it("検索結果を表示する", async () => {
		vi.stubGlobal(
			"fetch",
			vi.fn().mockResolvedValue(createJsonResponse(githubSearchResponse)),
		);
		renderApp();

		await search();

		expect(
			await screen.findByRole("link", { name: "facebook/react" }),
		).toBeInTheDocument();
	});

	it("API エラーを表示する", async () => {
		vi.stubGlobal(
			"fetch",
			vi.fn().mockResolvedValue(new Response(null, { status: 403 })),
		);
		renderApp();

		await search();

		expect(
			await screen.findByText("リポジトリの取得に失敗しました。"),
		).toBeInTheDocument();
	});

	it("不完全な検索結果に警告を表示する", async () => {
		vi.stubGlobal(
			"fetch",
			vi.fn().mockResolvedValue(
				createJsonResponse({
					...githubSearchResponse,
					incomplete_results: true,
				}),
			),
		);
		renderApp();

		await search();

		expect(await screen.findByRole("status")).toHaveTextContent(
			"検索結果が不完全な可能性があります。",
		);
	});

	it("取得可能な検索結果を 1,000 件に制限する", async () => {
		vi.stubGlobal(
			"fetch",
			vi
				.fn()
				.mockImplementation(() =>
					Promise.resolve(
						createJsonResponse({ ...githubSearchResponse, total_count: 1001 }),
					),
				),
		);
		renderApp();

		const user = await search();

		expect(
			await screen.findByText("1,000 件以上（表示は最大 1,000 件）"),
		).toBeInTheDocument();
		await user.selectOptions(screen.getByLabelText("表示件数"), "100");
		expect(await screen.findByText("1 / 10")).toBeInTheDocument();
	});
});
