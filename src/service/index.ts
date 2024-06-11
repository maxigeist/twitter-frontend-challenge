export interface SingUpData {
    name: string;
    password: string;
    email: string;
    username: string;
}

export interface SignInData {
    username?: string;
    email?: string;
    password: string;
}

export interface PostData {
    content: string;
    parentId?: string;
    images?: File[];
}

export interface Post {
    id: string;
    content: string;
    parentId?: string;
    images?: string[];
    createdAt: Date;
    authorId: string;
    author: Author;
    userReactions: Reaction[];
    qtyLikes: number;
    qtyComments: number;
    qtyRetweets: number;
    comments: Post[];
}

export interface Reaction {
    id: string;
    type: string;
    createdAt: Date;
    userId: string;
    postId: string;
    updatedAt: Date;
    deletedAt?: Date;
}

export interface Author {
    id: string;
    name?: string;
    username: string;
    profilePicture?: string;
    private: boolean;
    createdAt: Date;
}

export interface User {
    id: string;
    name?: string;
    username: string;
    profilePicture?: string;
    private: boolean;
    createdAt: string;
    followers: Author[];
    following: Author[];
    posts: Post[];
}

export interface MessageDTO {
    id: string;
    content: string;
    createdAt: Date;
    conversationId: string;
    senderId: string;
    sender: Author;
}

export interface ChatDTO {
    id: string;
    name:string;
    members: Author[];
    messages: MessageDTO[];
}


export interface ChatViewDTO {
    id:string;
    name:string;
    lastMessage: MessageDTO;
    picture: string;
}


