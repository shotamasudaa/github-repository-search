import type { Repository } from "../types/search-repositories";
import styles from "./repository-list.module.css";

type RepositoryListProps = {
	repositories: Repository[];
};

export function RepositoryList({ repositories }: RepositoryListProps) {
	if (repositories.length === 0) {
		return <p className={styles.empty}>リポジトリが見つかりませんでした。</p>;
	}

	return (
		<div className={styles.list}>
			{repositories.map((repository) => (
				<article className={styles.item} key={repository.id}>
					<a
						className={styles.title}
						href={repository.url}
						target="_blank"
						rel="noreferrer"
					>
						{repository.fullName}
					</a>

					{repository.description && (
						<p className={styles.description}>{repository.description}</p>
					)}

					<div className={styles.meta}>
						<span>★ {repository.stargazersCount}</span>

						{repository.language && <span>{repository.language}</span>}
					</div>
				</article>
			))}
		</div>
	);
}
