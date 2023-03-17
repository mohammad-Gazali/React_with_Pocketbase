import React, { useState } from 'react'
import { pb } from '../lib/pocketbase/client';


const CreatePost = () => {

    const [open, setOpen] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = new FormData(e.target as HTMLFormElement)

        pb.collection("posts").create(data).then(
            data => console.log(data)
        )
        
    }

  return (
    <section>
        <button onClick={() => setOpen(true)} className="btn btn-accent gap-4 btn-circle btn-lg shadow-lg fixed bottom-8 left-8">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
        </button>
        <div onClick={() => setOpen(false)} className={`${open ? "opacity-100 visible pointer-events-auto" : "opacity-0 invisible pointer-events-none" } fixed inset-0 bg-black/60 cursor-pointer transition-all z-10`}></div>
        <form encType='multipart/form-data' className={`${open ? "scale-100 visible pointer-events-auto" : "scale-0 invisible pointer-events-none"} fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 transition-all card bg-base-100 shadow-xl p-4 pb-8 w-[440px]`} onSubmit={handleSubmit}>
            <h3 className='font-bold text-3xl text-secondary-content mb-4 bg-secondary p-2 py-4 rounded-xl text-center'>
                Create Post
            </h3>
            <label htmlFor='title' className="label label-text">
                Title
            </label>
            <input name="title" id='title' type="text" placeholder="title" className="input input-bordered input-secondary w-full" required/>
            <label htmlFor='content' className="label label-text mt-4">
                Content
            </label>
            <textarea name="content" id='content' placeholder="content" className="textarea textarea-secondary w-full" required/>
            <label htmlFor='image' className="label label-text mt-4">
                Image
            </label>
            <input name="image" id='image' type="file" className="file-input file-input-bordered file-input-secondary w-full" />
            <button className='btn btn-accent mt-10 gap-1' type='submit'>
                Create <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </button>
        </form>
    </section>
  )
}

export default CreatePost