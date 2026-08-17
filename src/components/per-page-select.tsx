import type { PerPage } from "../types/search-repositories";

type PerPageSelectProps = {
	value: number;
	onChange: (perPage: PerPage) => void;
};

export function PerPageSelect({ value, onChange }: PerPageSelectProps) {
	return (
		<label>
			表示件数
			<select
				value={value}
				onChange={(event) => onChange(Number(event.target.value) as PerPage)}
			>
				<option value={10}>10件</option>
				<option value={20}>20件</option>
				<option value={50}>50件</option>
				<option value={100}>100件</option>
			</select>
		</label>
	);
}
