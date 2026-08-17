import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Pagination } from "./pagination";

describe("Pagination", () => {
	it("先頭ページでは前へ、最終ページでは次へを無効にする", () => {
		const { rerender } = render(
			<Pagination
				page={1}
				totalCount={30}
				perPage={10}
				onPageChange={vi.fn()}
			/>,
		);

		expect(screen.getByRole("button", { name: "前へ" })).toBeDisabled();

		rerender(
			<Pagination
				page={3}
				totalCount={30}
				perPage={10}
				onPageChange={vi.fn()}
			/>,
		);
		expect(screen.getByRole("button", { name: "次へ" })).toBeDisabled();
	});

	it("次へを押すと次のページ番号を通知する", async () => {
		const onPageChange = vi.fn();
		const user = userEvent.setup();
		render(
			<Pagination
				page={2}
				totalCount={30}
				perPage={10}
				onPageChange={onPageChange}
			/>,
		);

		await user.click(screen.getByRole("button", { name: "次へ" }));

		expect(onPageChange).toHaveBeenCalledWith(3);
	});
});
