import { type SubmitEventHandler, useState } from "react";

type SearchFormProps = {
	onSearch: (query: string) => void;
};

export function SearchForm({ onSearch }: SearchFormProps) {
	const [inputValue, setInputValue] = useState("");

	const handleSubmit: SubmitEventHandler<HTMLFormElement> = (event) => {
		event.preventDefault();

		const query = inputValue.trim();

		if (!query) return;

		onSearch(query);
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				type="search"
				value={inputValue}
				onChange={(event) => setInputValue(event.target.value)}
			/>
			<button type="submit">Search</button>
		</form>
	);
}
