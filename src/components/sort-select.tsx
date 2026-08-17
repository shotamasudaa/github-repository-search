import type { SortOption } from "../types/search-repositories";

type SortSelectProps = {
	value: SortOption;
	onSortChange: (value: SortOption) => void;
};

export function SortSelect({ value, onSortChange }: SortSelectProps) {
	return (
		<label>
			並び替え
			<select
				value={value}
				onChange={(event) => onSortChange(event.target.value as SortOption)}
			>
				<option value="stars-desc">スターが多い順</option>
				<option value="stars-asc">スターが少ない順</option>
				<option value="forks-desc">フォークが多い順</option>
				<option value="forks-asc">フォークが少ない順</option>
				<option value="updated-desc">最近更新された順</option>
				<option value="updated-asc">更新が古い順</option>
			</select>
		</label>
	);
}
