import { useState } from "react";
import { Pagination } from "./component/pagination";
import { SearchForm } from "./component/search-form";
import { useSearchRepositories } from "./hooks/use-search-repositories";

export function App() {
	const [query, setQuery] = useState("");
	const [page, setPage] = useState(1);
	const perPage = 10;

	const { data, isFetching, isError } = useSearchRepositories({
		query,
		page,
		perPage,
	});

	const handleSearch = (query: string) => {
		setQuery(query);
		setPage(1);
	};

	return (
		<main>
			<h1>GitHub Repository Search</h1>

			<SearchForm onSearch={handleSearch} />

			{isFetching && <p>Loading...</p>}

			{isError && <p>{"error"}</p>}

			{data?.items.map((repository) => (
				<div key={repository.id}>
					<a href={repository.url}>{repository.fullName}</a>
				</div>
			))}

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
