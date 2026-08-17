import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { SearchForm } from "./search-form";

describe("SearchForm", () => {
	it("検索語をトリムして送信する", async () => {
		const onSearch = vi.fn();
		const user = userEvent.setup();
		render(<SearchForm onSearch={onSearch} />);

		await user.type(screen.getByLabelText("リポジトリを検索"), "  react  ");
		await user.click(screen.getByRole("button", { name: "検索" }));

		expect(onSearch).toHaveBeenCalledWith("react");
	});

	it("空白だけの検索語は送信しない", async () => {
		const onSearch = vi.fn();
		const user = userEvent.setup();
		render(<SearchForm onSearch={onSearch} />);

		await user.type(screen.getByLabelText("リポジトリを検索"), "   ");
		await user.click(screen.getByRole("button", { name: "検索" }));

		expect(onSearch).not.toHaveBeenCalled();
	});
});
