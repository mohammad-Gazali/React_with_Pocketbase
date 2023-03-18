export interface PostType { 
    collectionId: string;
    collectionName: string;
    content: string;
    created: string;
    expand: any;
    id: string;
    image: string;
    title: string;
    updated: string;
    user: string;
    isNew: boolean;
}

export interface UserType {
    id: string;
    collectionId: string;
    collectionName: string;
    username: string; 
    email: string; 
    emailVisibility: boolean;
    verified: boolean;
    created: string;
    updated: string;
    name: string;
    avatar: string;
}