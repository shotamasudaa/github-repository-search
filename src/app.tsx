import { useState } from "react";
import styles from "./app.module.css";
import { Pagination } from "./components/pagination";
import { PerPageSelect } from "./components/per-page-select";
import { RepositoryList } from "./components/repository-list";
import { SearchForm } from "./components/search-form";
import { SortSelect } from "./components/sort-select";
import { GITHUB_MAX_SEARCH_RESULTS } from "./constants/github";
import { sortOptionMap } from "./constants/sort-options";
import { useSearchRepositories } from "./hooks/use-search-repositories";
import type { PerPage, SortOption } from "./types/search-repositories";

export function App() {
	const [query, setQuery] = useState("");
	const [page, setPage] = useState(1);
	const [perPage, setPerPage] = useState<PerPage>(10);
	const [sortOption, setSortOption] = useState<SortOption>("stars-desc");
	const { sort, order } = sortOptionMap[sortOption];

	const { data, isFetching, isError } = useSearchRepositories({
		query,
		sort,
		order,
		page,
		perPage,
	});

	const accessibleResultCount = data
		? Math.min(data.totalCount, GITHUB_MAX_SEARCH_RESULTS)
		: 0;

	const hasMoreResults = data ? data.totalCount > accessibleResultCount : false;

	const handleSearch = (query: string) => {
		setQuery(query);
		setPage(1);
	};

	const handlePerPageChange = (perPage: PerPage) => {
		setPerPage(perPage);
		setPage(1);
	};

	const handleSortChange = (sortOption: SortOption) => {
		setSortOption(sortOption);
		setPage(1);
	};

	const handlePageChange = (page: number) => {
		setPage(page);

		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	return (
		<main className={styles.container}>
			<header className={styles.header}>
				<h1 className={styles.title}>GitHub リポジトリ検索</h1>
				<p className={styles.description}>
					GitHub 上の公開リポジトリを検索できます。
				</p>
			</header>

			<SearchForm onSearch={handleSearch} />

			{data && (
				<div className={styles.resultHeader}>
					<p className={styles.resultCount}>
						{hasMoreResults
							? `${accessibleResultCount.toLocaleString()} 件以上（表示は最大 ${GITHUB_MAX_SEARCH_RESULTS.toLocaleString()} 件）`
							: `${accessibleResultCount.toLocaleString()} 件`}
					</p>

					<div className={styles.controls}>
						<SortSelect value={sortOption} onSortChange={handleSortChange} />

						<PerPageSelect value={perPage} onChange={handlePerPageChange} />
					</div>
				</div>
			)}

			{isFetching && <p className={styles.status}>読み込み中...</p>}

			{isError && (
				<p className={styles.error}>リポジトリの取得に失敗しました。</p>
			)}

			{data?.incompleteResults && (
				<p className={styles.warning} role="status">
					検索結果が不完全な可能性があります。検索条件を絞り込んでください。
				</p>
			)}

			{data && <RepositoryList repositories={data.items} />}

			{data && data.totalCount > 0 && (
				<Pagination
					page={page}
					totalCount={accessibleResultCount}
					perPage={perPage}
					onPageChange={handlePageChange}
				/>
			)}
		</main>
	);
}
