import { useEffect, useState } from "react"
import { PostType } from "../custom-types";
import { pb } from "../lib/pocketbase/client";
import Post from "./Post";


function Posts() {

  const [posts, setPosts] = useState<any>([]);


  useEffect(() => {
    pb.collection('posts').getFullList()
    .then(
      data => setPosts(data)
    )
  }, [])

  return (
    <section className="flex flex-wrap gap-6 justify-center">
      {
        posts.length === 0
        ?
        <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            {/* @ts-ignore */}
            <div className="radial-progress text-primary animate-spin" style={{ "--value": 70 }}></div>
        </div>
        :
        posts.map((post: PostType) => {
            return (
              <Post key={post.id} post={post} />
            )
          })
      }
    </section>
  )
}

export default Posts
