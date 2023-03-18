import { Footer, Navbar } from "./components";
import { Toaster } from "react-hot-toast";
import { useState, useEffect, createContext } from "react";
import { PostType } from "./custom-types";
import usePocketbase from "./hooks/usePocketbase";
import { Routes, Route } from "react-router-dom";
import { Home, Login } from "./pages";
import { pb } from "./lib/pocketbase/client";
import Register from "./pages/Register";



export const postsContext = createContext<PostType[]>([]);

function App() {

  const [posts, setPosts] = useState<any[]>([]);
  const { getAllPosts } = usePocketbase();

  useEffect(() => {
    getAllPosts().then(
      data => setPosts(data)
    )
  }, [])

  pb.collection("users").authRefresh()

  return (
    <>
      <Navbar />
      <main className="lg:px-12 px-4 py-8 ">
        <postsContext.Provider value={posts}>
          <Routes>
            <Route path="/" element={<Home setPosts={setPosts} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </postsContext.Provider>
      </main>
      <Footer />
      <Toaster />
    </>
  )
}

export default App
