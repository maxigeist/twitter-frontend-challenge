import {
    useQuery,
    useMutation,
    useQueryClient,
} from '@tanstack/react-query'
import {User} from "../service";
import {useHttpRequestService} from "../service/HttpRequestService";
import {latestPosts, userInfoKey} from "./Constants";
import {useState} from "react";


interface UserInfoResponse {
    isLoading: boolean,
    data: User | undefined
}


export const useGetUserProfile = (id: string | undefined): UserInfoResponse => {
    const service = useHttpRequestService()
    const {isLoading, data} = useQuery<User>({
        queryKey: [userInfoKey, id],
        queryFn: () => service.getProfile(id!!), enabled: !!id
    })
    return {isLoading, data}
}

export const useGetLatestPosts = (query: string) => {
    const service = useHttpRequestService()
    const {isLoading, data, } = useQuery({
        queryKey: [latestPosts, query],
        queryFn: () => service.getPosts(query)
    })
    return {isLoading, data}
}



export const useMutateOnUnfollow = () => {
    const service = useHttpRequestService()
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: (id: string) => service.unfollowUser(id),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: [userInfoKey]})
        }
    })
    return {mutation}
}

export const useMutateOnFollow = () => {
    const service = useHttpRequestService()
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: (id: string) => service.followUser(id),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: [userInfoKey]})
        }
    })
    return {mutation}
}