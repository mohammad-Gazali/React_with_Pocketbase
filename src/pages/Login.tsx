import { useEffect, useState } from "react";
import usePocketbase from "../hooks/usePocketbase";
import toast from "react-hot-toast";
import { redirect, useNavigate } from "react-router-dom";


const Login = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  let toastLoginId: string;

  const { authUser, userStore } = usePocketbase();

  const navigate = useNavigate();

  useEffect(() => {
    if (userStore.token) {
      navigate("/")
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    toastLoginId = toast.loading("Authenticate the user", {
      id: toastLoginId
    })

    setLoading(true)

    try {

      await authUser({
        username,
        password
      })

      toast.success("You Have Been Authenticated Successfully", {
        id: toastLoginId
      })

      setUsername("");
      setPassword("");

      location.reload()

    } catch (error) {
      // @ts-ignore
      toast.error(String(error.message), {
        id: toastLoginId
      })
      console.log(error)
    }

    setLoading(false)
  }

  return (
    <section className="flex justify-center items-center">
      <form onSubmit={handleSubmit} className="card bg-base-100 shadow-xl p-4 pb-8 w-full max-w-[600px]">
        <h3 className='font-bold text-3xl text-secondary-content mb-4 bg-secondary p-2 py-4 rounded-xl text-center'>
          Login
        </h3>
        <label htmlFor='username' className="label label-text">
          Username
        </label>
        <label className="input-group">
          <span className="bg-neutral text-neutral-content">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          </span>
          <input value={username} onChange={ e => setUsername(e.target.value) } name="username" id='username' type="text" placeholder="useranme" className="input input-bordered input-secondary focus:outline-none w-full" required/>
        </label>
        <label htmlFor='password' className="label label-text mt-4">
          Password
        </label>
        <label className="input-group">
          <span className="bg-neutral text-neutral-content">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
          </span>
          <input value={password} onChange={ e => setPassword(e.target.value) } name="password" id='password' type="password" placeholder="password" className="input input-bordered input-secondary focus:outline-none w-full" required/>
        </label>
        <button className={`btn ${loading ? "loading" : ""} btn-accent mt-10 gap-1`} type='submit'>
          Login <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
          </svg>
        </button>
      </form>
    </section>
  )
}

export default Login