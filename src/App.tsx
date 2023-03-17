import { CreatePost, Navbar, Posts } from "./components"


function App() {


  return (
    <>
      <Navbar />
      <div className="px-12 py-8">
        <Posts />
        <CreatePost />
      </div>
    </>
  )
}

export default App
