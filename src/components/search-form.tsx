import { type SubmitEventHandler, useState } from "react";
import styles from "./search-form.module.css";

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
		<form className={styles.form} onSubmit={handleSubmit}>
			<label className={styles.visuallyHidden} htmlFor="repository-search">
				リポジトリを検索
			</label>

			<input
				id="repository-search"
				className={styles.input}
				type="search"
				value={inputValue}
				onChange={(event) => setInputValue(event.target.value)}
				placeholder="リポジトリを検索"
			/>

			<button className={styles.button} type="submit">
				検索
			</button>
		</form>
	);
}
