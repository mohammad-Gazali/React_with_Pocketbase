import { PostType } from "../custom-types";
import usePocketbase from "../hooks/usePocketbase";
import { URL } from "../lib/pocketbase/client";
import { getAvatarUrl, hasThisPostLikeFromThisUser } from "../utils/helperFunctions";
import toast from "react-hot-toast";
import { useContext, useEffect, useState } from "react";
import { likesContext } from "./Posts";


const Post = ({ post, setLikes }: { post: PostType, setLikes: React.Dispatch<React.SetStateAction<any[]>>}) => {
	
	const { userStore, addLike, removeLike } = usePocketbase();
	const [currentPostForUser, setCurrentPostForUser] = useState(false);
	const [loading, setLoading] = useState(false);
	let toastPostLikeId: string

	const likes = useContext(likesContext)

	useEffect(() => {
		if (hasThisPostLikeFromThisUser(likes.filter(like => like.post === post.id), userStore.model?.id!)) {
			setCurrentPostForUser(true)
		}
	}, [userStore])

	const handleLike = async () => {
		if (userStore.token) {
			setLoading(true)
			if (!hasThisPostLikeFromThisUser(likes.filter(like => like.post === post.id), userStore.model?.id!)) {

				toastPostLikeId = toast.loading("Adding a Like", {
					id: toastPostLikeId
				})

				const data = new FormData();
	
				data.append("user", userStore.model?.id!)
				data.append("post", post.id)
	
				try {

					const response = await addLike(data);

					setCurrentPostForUser(true)

					toast.success("The Like Has Been Added Successfully", {
						id: toastPostLikeId
					})

					setLikes((preLikes) => [...preLikes, response])

				} catch (error: any) {
					toast.error(String(error.message), {
						id: toastPostLikeId
					})
				}

			} else {

				toastPostLikeId = toast.loading("Removing a Like", {
					id: toastPostLikeId
				})

				const like = getUserLike()

				try {

					await removeLike(like.id)

					setCurrentPostForUser(false)

					toast.success("The Like Has Been Removed Successfully", {
						id: toastPostLikeId
					})

					setLikes((preLikes) => preLikes.filter(l => l !== like))

				} catch (error: any) {
					toast.error(String(error.message), {
						id: toastPostLikeId
					})
				}

			}

			setLoading(false)

		} else {
			toast.error("You Must Login Before 😁")
		}
	}

	const getLikesNum = () => {
		return likes?.filter((item: any) => item.post === post.id).length
	}

	const getUserLike = () => {
		return likes.filter(like => like.user === userStore.model?.id && like.post === post.id)[0]
	}

	return (
		<div className="card w-96 bg-base-100 shadow-xl">
			<figure>
				{post.image ? (
					<img
						className="h-60 w-full object-cover"
						src={`${URL}/api/files/${post.collectionId}/${post.id}/${post.image}`}
						alt={post.title}
					/>
				) : null}
			</figure>
			<div className="card-body pt-2">
				<div className="flex items-center gap-4 my-3">
					<img
						className="avatar cursor-pointer rounded-full h-12 w-12 object-cover"
						src={getAvatarUrl(
							URL,
							"users",
							post.expand?.user?.id,
							post.expand?.user?.avatar,
							post.expand?.user?.username
						)}
						alt={post.expand?.user?.username}
					/>
					<div className="flex flex-col gap-1">
						<p className="capitalize font-bold text-secondary hover:text-secondary-focus hover:underline hover:decoration-2 cursor-pointer w-fit">
							{post.expand.user.name || post.expand.user.username}
						</p>
						<div className="flex items-center gap-1 text-neutral">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-4 h-4"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
								/>
							</svg>
							{post.created.toString().split(" ")[0]} &nbsp;
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-4 h-4"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
							{post.created.toString().split(" ")[1].split(".")[0]}
						</div>
					</div>
				</div>
				<h2 className="card-title">{post.title}</h2>
				<p>{post.content}</p>
				<div className="card-actions justify-between items-center mt-6">
					<div className="bg-accent/20 text-accent-focus py-1 px-2 rounded-lg font-semibold">
						{likes.length !== 0 ? getLikesNum() : 0 } likes
					</div>
					<button onClick={handleLike} className={`btn ${loading ? "loading" : ""} btn-ghost btn-circle text-secondary gap-2`}>
						{
							currentPostForUser
							?
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
								<path d="M7.493 18.75c-.425 0-.82-.236-.975-.632A7.48 7.48 0 016 15.375c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23h-.777zM2.331 10.977a11.969 11.969 0 00-.831 4.398 12 12 0 00.52 3.507c.26.85 1.084 1.368 1.973 1.368H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 01-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227z" />
							</svg>
							:
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
								<path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
							</svg>
						}
					</button>
				</div>
			</div>
		</div>
	);
};

export default Post;
