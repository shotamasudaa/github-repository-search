import { useState } from "react";
import { Pagination } from "./components/pagination";
import { PerPageSelect } from "./components/per-page-select";
import { RepositoryList } from "./components/repository-list";
import { SearchForm } from "./components/search-form";
import { SortSelect } from "./components/sort-select";
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

	return (
		<main>
			<h1>GitHub Repository Search</h1>

			<SearchForm onSearch={handleSearch} />

			<SortSelect value={sortOption} onSortChange={handleSortChange} />

			<PerPageSelect value={perPage} onChange={handlePerPageChange} />

			{isFetching && <p>Loading...</p>}

			{isError && <p>{"error"}</p>}

			{data && <RepositoryList repositories={data.items} />}

			{data && data.totalCount > 0 && (
				<Pagination
					page={page}
					totalCount={data.totalCount}
					perPage={perPage}
					onPageChange={setPage}
				/>
			)}
		</main>
	);
}
