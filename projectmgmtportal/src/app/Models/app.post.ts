export interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export interface UserPost {
    id: number;
    name: string;
    username: string;
    email: string;
    phone:string;
    posts:Post[]
}

export interface Product {
    id: number;
    name: string;
    description: string;
    status: string;
}