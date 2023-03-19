import React, { useState } from 'react'
import usePocketbase from '../hooks/usePocketbase';
import toast from "react-hot-toast";
import { wait } from '../utils/helperFunctions';


const CreatePost = ({ setPosts }: { setPosts: React.Dispatch<React.SetStateAction<any[]>> }) => {

    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState("");
    const [loading, setLoading] = useState(false);

    const { addPost, userStore } = usePocketbase();
    let toastCreatPostId: string;


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        if (!userStore.token) {
            toast.error("You Should Login Before Creating Posts ")
            return
        }

        toastCreatPostId = toast.loading("Creating The Post", {
			id: toastCreatPostId,
		});

        setLoading(true)

        const data = new FormData(e.target as HTMLFormElement)

        data.append("user", userStore.model?.id!)

        try {

            const newPost = await addPost(data);

            console.log(newPost)

            setTitle("");
            setContent("");
            setImage("");
            setOpen(false);

            toast.success("The Post Has Been Created Successfully", {
				id: toastCreatPostId,
			});

            await wait(1000)

            location.reload()

        } catch (error) {
        
            // @ts-ignore
            toast.error(String(error.message), {
                id: toastCreatPostId
            })

            console.log(error)

        }

        setLoading(false)
        
    }

  return (
    <section>
        <button onClick={() => setOpen(true)} className="btn btn-accent gap-4 btn-circle btn-lg shadow-lg fixed bottom-8 left-8 z-10">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
        </button>
        <div onClick={() => setOpen(false)} className={`${open ? "opacity-100 visible pointer-events-auto" : "opacity-0 invisible pointer-events-none" } fixed inset-0 bg-black/60 cursor-pointer transition-all z-10`}></div>
        <form encType='multipart/form-data' className={`${open ? "scale-100 visible pointer-events-auto" : "scale-0 invisible pointer-events-none"} fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 transition-all card bg-base-100 shadow-xl p-4 pb-8 w-full lg:max-w-[400px] max-w-[90%] mx-1`} onSubmit={handleSubmit}>
            <h3 className='font-bold text-3xl text-secondary-content mb-4 bg-secondary p-2 py-4 rounded-xl text-center'>
                Create Post
            </h3>
            <label htmlFor='title' className="label label-text">
                Title
            </label>
            <input value={title} onChange={ e => setTitle(e.target.value) } name="title" id='title' type="text" placeholder="title" className="input input-bordered input-secondary w-full" required/>
            <label htmlFor='content' className="label label-text mt-4">
                Content
            </label>
            <textarea value={content} onChange={ e => setContent(e.target.value) } name="content" id='content' placeholder="content" className="textarea textarea-secondary w-full" required/>
            <label htmlFor='image' className="label label-text mt-4">
                Image
            </label>
            <input value={image} onChange={ e => setImage(e.target.value) } name="image" id='image' type="file" className="file-input file-input-bordered file-input-secondary w-full" />
            <button className={`btn ${loading ? "loading" : ""} btn-accent mt-10 gap-1`} type='submit'>
                Create <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </button>
        </form>
    </section>
  )
}

export default CreatePost