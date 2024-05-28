import {useEffect, useState} from "react";
import {useHttpRequestService} from "../service/HttpRequestService";
import {User} from "../service";


export const useGetUser = () => {
    const service = useHttpRequestService()
    const [user, setUser] = useState<User>()

    useEffect(() => {
        service.me().then(r => setUser(r))
    }, []);

    return {user}

}