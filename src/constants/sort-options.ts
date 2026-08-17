import type {
	Order,
	RepositorySort,
	SortOption,
} from "../types/search-repositories";

export const sortOptionMap: Record<
	SortOption,
	{
		sort: RepositorySort;
		order: Order;
	}
> = {
	"stars-desc": { sort: "stars", order: "desc" },
	"stars-asc": { sort: "stars", order: "asc" },
	"forks-desc": { sort: "forks", order: "desc" },
	"forks-asc": { sort: "forks", order: "asc" },
	"updated-desc": { sort: "updated", order: "desc" },
	"updated-asc": { sort: "updated", order: "asc" },
};
