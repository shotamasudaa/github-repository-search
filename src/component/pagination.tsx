type PaginationProps = {
	page: number;
	totalCount: number;
	perPage: number;
	onPageChange: (page: number) => void;
};

export function Pagination({
	page,
	totalCount,
	perPage,
	onPageChange,
}: PaginationProps) {
	const totalPages = Math.ceil(totalCount / perPage);

	return (
		<nav aria-label="pagination">
			<button
				type="button"
				onClick={() => onPageChange(page - 1)}
				disabled={page <= 1}
			>
				{"<"}
			</button>

			<span>
				{page} / {totalPages}
			</span>

			<button
				type="button"
				onClick={() => onPageChange(page + 1)}
				disabled={page >= totalPages}
			>
				{">"}
			</button>
		</nav>
	);
}
