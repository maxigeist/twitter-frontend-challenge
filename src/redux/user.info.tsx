import {User} from "../service";


const initialState: User = {
    id: "",
    name: "",
    profilePicture: "",
    username: "",
    createdAt: new Date(),
    followers: [],
    following: [],
    posts: [],

}