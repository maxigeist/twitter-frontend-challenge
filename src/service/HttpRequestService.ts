import type {PostData, SingInData, SingUpData} from "./index";
import axios from "axios";
import {S3Service} from "./S3Service";

const url =
    process.env.REACT_APP_API_URL || "https://twitter-ieea.onrender.com/api";

const server = axios.create({
    baseURL: url
})

server.interceptors.response.use(
    function (response) {
        return response
    },
    function (error) {
        try {
            if (error.response.status === 401 || error.response.status === 403) {
                localStorage.clear()
                window.location.href = "/sign-in"
            }
            return Promise.reject(error)
        }catch (error){
            console.log(error)
        }
    },
)

server.interceptors.request.use(
    (config) => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers.Authorization = `${token}`;
            }
            return config;
        } catch (error) {
            return Promise.reject(error)
        }
    },
    (error) => {
        return Promise.reject(error);
    }
);


const httpRequestService = {
    signUp: async (data: Partial<SingUpData>) => {
        const res = await axios.post(`${url}/auth/signup`, data);
        if (res.status === 201) {
            localStorage.setItem("token", `Bearer ${res.data.token}`);
            return true;
        }
    },
    signIn: async (data: SingInData) => {
        const res = await axios.post(`${url}/auth/login`, data);
        if (res.status === 200) {
            localStorage.setItem("token", `Bearer ${res.data.token}`);
            return true;
        }
    },
    createPost: async (data: PostData) => {
        const res = await server.post(`${url}/post`, data);
        if (res.status === 201) {
            const {upload} = S3Service;
            for (const imageUrl of res.data.images) {
                const index: number = res.data.images.indexOf(imageUrl);
                await upload(data.images![index], imageUrl);
            }
            return res.data;
        }
    },
    getPaginatedPosts: async (limit: number, after: string, query: string) => {
        const res = await server.get(`${url}/post/${query}`, {
            params: {
                limit,
                after,
            },
        });
        if (res.status === 200) {
            return res.data;
        }
    },
    getPosts: async (query: string) => {
        const res = await server.get(`${url}/post/${query}`);
        if (res.status === 200) {
            return res.data;
        }
    },
    getPostsPaginated: async (limit: number, before: string, after: string) => {
        const res = await server.get(`${url}/post/`, {
            params: {
                limit,
                before,
                after,
            },
        });
        if (res.status === 200) {
            return res.data;
        }
    },
    getRecommendedUsers: async (limit: number, skip: number) => {
        const res = await server.get(`${url}/user`, {
            params: {
                limit,
                skip,
            },
        });
        if (res.status === 200) {
            return res.data;
        }
    },
    me: async () => {
        const res = await server.get(`${url}/user/me`);
        if (res.status === 200) {
            return res.data;
        }
    },
    getPostById: async (id: string) => {
        const res = await server.get(`${url}/post/${id}`);
        if (res.status === 200) {
            return res.data;
        }
    },
    createReaction: async (postId: string, reaction: string) => {
        const res = await server.post(
            `${url}/reaction/${postId}`,
            {type: reaction},
        );
        if (res.status === 201) {
            return res.data;
        }
    },
    deleteReaction: async (reactionId: string) => {
        const res = await server.delete(`${url}/reaction/${reactionId}`);
        if (res.status === 200) {
            return res.data;
        }
    },
    followUser: async (userId: string) => {
        const res = await server.post(`${url}/follow/${userId}`);
        if (res.status === 201) {
            return res.data;
        }
    },
    unfollowUser: async (userId: string) => {
        const res = await server.delete(`${url}/follow/${userId}`);
        if (res.status === 200) {
            return res.data;
        }
    },
    searchUsers: async (username: string, limit: number, skip: number) => {
        try {
            const cancelToken = axios.CancelToken.source();

            const response = await server.get(`${url}/user/search/${username}`, {
                params: {
                    limit,
                    skip,
                },
                cancelToken: cancelToken.token,
            });

            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            if (!axios.isCancel(error)) console.log(error);
        }
    },

    getProfile: async (id: string) => {
        const res = await server.get(`${url}/user/profile/${id}`);
        if (res.status === 200) {
            return res.data;
        }
    },
    getPaginatedPostsFromProfile: async (
        limit: number,
        after: string,
        id: string
    ) => {
        const res = await server.get(`${url}/post/by_user/${id}`, {
            params: {
                limit,
                after,
            },
        });

        if (res.status === 200) {
            return res.data;
        }
    },
    getPostsFromProfile: async (id: string) => {
        const res = await server.get(`${url}/post/by_user/${id}`);
        if (res.status === 200) {
            return res.data;
        }
    },

    isLogged: async () => {
        const res = await server.get(`${url}/user/me`);
        return res.status === 200;
    },

    getProfileView: async (id: string) => {
        const res = await server.get(`${url}/user/${id}`);

        if (res.status === 200) {
            return res.data;
        }
    },

    deleteProfile: async () => {
        const res = await server.delete(`${url}/user/me`);

        if (res.status === 204) {
            localStorage.removeItem("token");
        }
    },

    getChats: async () => {
        const res = await server.get(`${url}/chat`);

        if (res.status === 200) {
            return res.data;
        }
    },

    getMutualFollows: async () => {
        const res = await server.get(`${url}/follow/mutual`);

        if (res.status === 200) {
            return res.data;
        }
    },

    createChat: async (id: string) => {
        const res = await server.post(
            `${url}/chat`,
            {
                users: [id],
            },
        );

        if (res.status === 201) {
            return res.data;
        }
    },

    getChat: async (id: string) => {
        const res = await server.get(`${url}/chat/${id}`);

        if (res.status === 200) {
            return res.data;
        }
    },

    deletePost: async (id: string) => {
        await server.delete(`${url}/post/${id}`);
    },

    getPaginatedCommentsByPostId: async (
        id: string,
        limit: number,
        after: string
    ) => {
        const res = await server.get(`${url}/post/comment/by_post/${id}`, {
            params: {
                limit,
                after,
            },
        });
        if (res.status === 200) {
            return res.data;
        }
    },
    getCommentsByPostId: async (id: string) => {
        const res = await server.get(`${url}/comment/from_post/${id}`);
        if (res.status === 200) {
            console.log(res)
            return res.data
        }
    },
};

const useHttpRequestService = () => httpRequestService;

// For class component (remove when unused)
class HttpService {
    service = httpRequestService;
}

export {useHttpRequestService, HttpService};
