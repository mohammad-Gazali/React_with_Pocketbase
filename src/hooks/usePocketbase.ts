import { pb } from "../lib/pocketbase/client";


export default function usePocketbase() {

    const getAllPosts = async () => {
        return pb.collection("posts").getFullList({
            sort: "-created",
            expand: "user,likes"
        });
    }

    const addPost = async (data: FormData) => {
        return pb.collection("posts").create(data);
    }

    const updatePost = async (id: string, data: any) => {
        return pb.collection("posts").update(id, data)
    }

    const creatUser = async (data: FormData) => {
        return pb.collection("users").create(data)
    }

    const authUser = async ({ username, password }: { username: string, password: string }) => {
        return pb.collection("users").authWithPassword(username, password)
    }

    const getAllLikes = async () => {
        return pb.collection("likes").getFullList()
    }

    const addLike = async (data: FormData) => {
        return pb.collection("likes").create(data)
    }

    const removeLike = async (id: string) => {
        return pb.collection("likes").delete(id)
    }

    const userStore = pb.authStore

    return {
        getAllPosts,
        addPost,
        updatePost,
        creatUser,
        authUser,
        getAllLikes,
        addLike,
        removeLike,
        userStore
    }
}