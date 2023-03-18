import React from 'react'
import { CreatePost, Posts } from '../components'

const Home = ({ setPosts }: { setPosts: React.Dispatch<React.SetStateAction<any[]>> }) => {
  return (
    <>
        <Posts />
        <CreatePost setPosts={setPosts} />
    </>
  )
}

export default Home