import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";

export const baseUrl = import.meta.env.VITE_API_URL as string;
export const publishableKey = import.meta.env
	.VITE_CLERK_PUBLISHABLE_KEY as string;
export const imageUrl = import.meta.env.VITE_URL_IMAGE_KIT as string;

export interface User {
	_id: string;
	username: string;
	email?: string;
	name?: string;
	avatar?: string;
}

export interface Post {
	_id: string;
	title: string;
	slug: string;
	category: string;
	desc?: string;
	img?: string;
	createdAt: string;
	updatedAt?: string;
	user?: User;
	content?: string;
	featured?: boolean;
}

export interface ApiResponse {
	posts: Post[];
	hasMore?: boolean;
	total?: number;
	page?: number;
	message?: string;
	status?: string;
}

export interface QueryParams {
	featured?: string | boolean;
	limit?: string | number;
	sort?: string;
	page?: string | number;
	cat?: string;
	search?: string;
	author?: string;
	[key: string]: string | number | boolean | undefined;
}

export interface PostData {
	title: string;
	slug: string;
	category: string;
	desc?: string;
	content: string;
	img?: string;
	featured?: boolean;
}

type RequestData = PostData | FormData;

const api: AxiosInstance = axios.create({
	baseURL: baseUrl,
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
	},
	timeout: 30000,
});

const request = async <T>(
	method: string,
	url: string,
	params?: QueryParams,
	data?: RequestData,
	config?: AxiosRequestConfig
): Promise<T> => {
	const response = await api({
		method,
		url,
		params,
		data,
		...config,
	});
	return response.data;
};

export const API = {
	getFeaturedPosts: (): Promise<ApiResponse> =>
		request<ApiResponse>("GET", "/posts", {
			featured: true,
			limit: 4,
			sort: "newest",
		}),

	getAllPosts: (params?: QueryParams): Promise<ApiResponse> =>
		request<ApiResponse>("GET", "/posts", params),

	getPostBySlug: (slug: string): Promise<ApiResponse> =>
		request<ApiResponse>("GET", `/posts/slug/${slug}`),

	searchPosts: (query: string, params?: QueryParams): Promise<ApiResponse> =>
		request<ApiResponse>("GET", "/posts", { search: query, ...params }),

	createPost: (data: PostData | FormData): Promise<ApiResponse> =>
		request<ApiResponse>("POST", "/posts", undefined, data),

	updatePost: (id: string, data: PostData | FormData): Promise<ApiResponse> =>
		request<ApiResponse>("PUT", `/posts/${id}`, undefined, data),

	deletePost: (id: string): Promise<ApiResponse> =>
		request<ApiResponse>("DELETE", `/posts/${id}`),
};

export default API;
