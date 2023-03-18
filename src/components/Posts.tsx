import { createContext, useContext, useEffect, useState } from "react"
import { PostType } from "../custom-types";
import { postsContext } from "../App";
import Post from "./Post";
import usePocketbase from "../hooks/usePocketbase";


export const likesContext = createContext<any[]>([]);

function Posts() {

  const posts = useContext(postsContext);
  const [likes, setLikes] = useState<any[]>([]);
  const { getAllLikes } = usePocketbase();

  useEffect(() => {
    getAllLikes().then(data => setLikes(data))
  }, [])

  return (
    <section className="flex flex-wrap gap-6 justify-center">
      <likesContext.Provider value={likes}>
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
                <Post setLikes={setLikes} key={post.id} post={post} />
              )
            })
        }
      </likesContext.Provider>
    </section>
  )
}

export default Posts
