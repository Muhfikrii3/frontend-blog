import PostListItem from "./PostListItem";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSearchParams } from "react-router-dom";
import API, {
	type ApiResponse,
	type Post,
	type QueryParams,
} from "../../services/api";

const fetchPosts = async (
	pageParam: number,
	searchParams: URLSearchParams
): Promise<ApiResponse> => {
	const searchParamsObj: QueryParams = {};

	// Convert URLSearchParams to object
	searchParams.forEach((value, key) => {
		searchParamsObj[key as keyof QueryParams] = value;
	});

	return API.getAllPosts({
		page: pageParam,
		limit: 10,
		...searchParamsObj,
	});
};

const PostList = () => {
	const [searchParams] = useSearchParams();

	const {
		data,
		error,
		fetchNextPage,
		hasNextPage,
		isFetching,
		isFetchingNextPage,
	} = useInfiniteQuery<ApiResponse, Error>({
		queryKey: ["posts", searchParams.toString()],
		queryFn: ({ pageParam = 1 }) =>
			fetchPosts(pageParam as number, searchParams),
		initialPageParam: 1,
		getNextPageParam: (lastPage, pages) =>
			lastPage.hasMore ? pages.length + 1 : undefined,
	});

	if (isFetching && !isFetchingNextPage) return <div>Loading...</div>;

	if (error) return <div>Something went wrong! {error.message}</div>;

	const allPosts: Post[] = data?.pages?.flatMap((page) => page.posts) || [];

	return (
		<InfiniteScroll
			dataLength={allPosts.length}
			next={fetchNextPage}
			hasMore={!!hasNextPage}
			loader={<h4>Loading more posts...</h4>}
			endMessage={
				<p>
					<b>All posts loaded!</b>
				</p>
			}
		>
			{allPosts.map((post) => (
				<PostListItem key={post._id} post={post} />
			))}
		</InfiniteScroll>
	);
};

export default PostList;
