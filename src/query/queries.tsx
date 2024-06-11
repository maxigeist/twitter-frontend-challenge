import {
    useQuery,
    useMutation,
    useQueryClient,
} from '@tanstack/react-query'
import {Post, PostData, User} from "../service";
import {HttpService} from "../service/HttpRequestService";
import {
    createPost,
    currentUser,
    latestPosts,
    login,
    post,
    postComments,
    recommendedUsers,
    userInfoKey
} from "./Constants";
import {SignInData} from "../service";

const httpService = new HttpService()

export const useGetUserProfile = (id: string | undefined) => {
    const {isLoading, data} = useQuery<User>({
        queryKey: [userInfoKey, id],
        queryFn: () => httpService.service.getProfile(id!!),
        enabled: !!id
    })
    return {isLoading, data}
}

export const useGetUserToken = (signInData: SignInData) => {
    const {isLoading, data} = useQuery({
        queryKey: [login, signInData],
        queryFn: () => httpService.service.signIn(signInData), enabled: !!signInData
    })
    return {isLoading, data}
}

export const useCreatePost = (postData: PostData) => {
    const {isLoading, data} = useQuery({
        queryKey: [createPost, postData],
        queryFn: () => httpService.service.createPost(postData), enabled: !!postData
    })
    return {isLoading, data}
}//Esto debería ser una mutation

export const useGetRecommendedUsers = (limit: number, skip: number) => {
    const {isLoading, data} = useQuery({
        queryKey: [recommendedUsers, limit, skip],
        queryFn: () => httpService.service.getRecommendedUsers(limit, skip)
    })
    return {isLoading, data}
}

export const useGetCurrentUser = () => {
    const {isLoading, data} = useQuery({
        queryKey: [currentUser],
        queryFn: () => httpService.service.me()
    })
    return {isLoading, data}
}

export const useGetPosts = (query: string) => {
    const {isLoading, data} = useQuery({
        queryKey: [latestPosts, query],
        queryFn: () => httpService.service.getPosts(query)
    })
    return {isLoading, data}
}

export const useGetPost = (id: string | undefined) => {
    const { data, isLoading} = useQuery<Post, Error>({
        queryKey: [post, id],
        queryFn: () => httpService.service.getPostById(id!!),
        enabled: !!id
    });
    return {data, isLoading};
};

export const useGetPostComments = (id: string) => {
    const {isLoading, data} = useQuery({
        queryKey: [postComments, id],
        queryFn: () => httpService.service.getCommentsByPostId(id!!), enabled: !!id
    })
    return {isLoading, data}
}

export const useCreateUnfollow = () => {
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: (id: string) => httpService.service.unfollowUser(id),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: [userInfoKey]})
        }
    })
    return {mutation}
}

export const useCreateFollow = () => {
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: (id: string) => httpService.service.followUser(id),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: [userInfoKey]})
        }
    })
    return {mutation}
}