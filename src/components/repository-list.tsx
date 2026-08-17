import type { Repository } from "../types/search-repositories";

type RepositoryListProps = {
	repositories: Repository[];
};

export function RepositoryList({ repositories }: RepositoryListProps) {
	if (repositories.length === 0) {
		return <p>リポジトリが見つかりませんでした。</p>;
	}

	return (
		<div>
			{repositories.map((repository) => (
				<article key={repository.id}>
					<a href={repository.url} target="_blank" rel="noreferrer">
						{repository.fullName}
					</a>

					{repository.description && <p>{repository.description}</p>}

					<div>
						<span>★ {repository.stargazersCount}</span>
						{repository.language && <span>{repository.language}</span>}
					</div>
				</article>
			))}
		</div>
	);
}
