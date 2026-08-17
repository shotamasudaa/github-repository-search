import styles from "./pagination.module.css";

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
		<nav className={styles.pagination} aria-label="ページネーション">
			<button
				className={styles.button}
				type="button"
				onClick={() => onPageChange(page - 1)}
				disabled={page <= 1}
			>
				前へ
			</button>

			<span className={styles.page}>
				{page} / {totalPages}
			</span>

			<button
				className={styles.button}
				type="button"
				onClick={() => onPageChange(page + 1)}
				disabled={page >= totalPages}
			>
				次へ
			</button>
		</nav>
	);
}
