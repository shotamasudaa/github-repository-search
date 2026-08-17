import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { Repository } from "../types/search-repositories";
import { RepositoryList } from "./repository-list";

const repository: Repository = {
	id: 1,
	name: "react",
	fullName: "facebook/react",
	url: "https://github.com/facebook/react",
	description: "A JavaScript library for building user interfaces.",
	stargazersCount: 100,
	language: "TypeScript",
};

describe("RepositoryList", () => {
	it("リポジトリがない場合は空状態を表示する", () => {
		render(<RepositoryList repositories={[]} />);

		expect(
			screen.getByText("リポジトリが見つかりませんでした。"),
		).toBeInTheDocument();
	});

	it("リポジトリの情報と安全な外部リンクを表示する", () => {
		render(<RepositoryList repositories={[repository]} />);

		const link = screen.getByRole("link", { name: "facebook/react" });
		expect(link).toHaveAttribute("href", repository.url);
		expect(link).toHaveAttribute("target", "_blank");
		expect(link).toHaveAttribute("rel", "noreferrer");
		expect(screen.getByText("★ 100")).toBeInTheDocument();
		expect(screen.getByText("TypeScript")).toBeInTheDocument();
	});
});
