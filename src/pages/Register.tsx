import { useEffect, useState } from 'react'
import usePocketbase from '../hooks/usePocketbase';
import toast from "react-hot-toast";
import { redirect, useNavigate } from 'react-router-dom';


const Register = () => {
  
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setpasswordConfirm] = useState("");
    const [name, setName] = useState("");
    const [avatar, setAvatar] = useState("");
    const [loading, setLoading] = useState(false);
    let toastRegisterId: string;
  
  
    const { creatUser, authUser, userStore } = usePocketbase();
  
    const navigate = useNavigate();

    useEffect(() => {
      if (userStore.token) {
        navigate("/")
      }
    }, [])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  
      toastRegisterId = toast.loading("Creating the user", {
        id: toastRegisterId
      })

      setLoading(true)
  
      const data = new FormData(e.target as HTMLFormElement);

      try {
  
        await creatUser(data);
        
        await authUser({
          username,
          password
        })

        toast.success("The User Has Been Creatd Successfully", {
          id: toastRegisterId
        })

        setUsername("");
        setEmail("");
        setPassword("");
        setpasswordConfirm("");
        setName("");
        setAvatar("");
  
        location.reload()

      } catch (error) {
        // @ts-ignore
        toast.error(String(error.message), {
          id: toastRegisterId
        })
  
        console.log(error)
        
      }
  
      setLoading(false)
    }
  
    return (
      <section className="flex justify-center items-center">
        <form encType='multipart/form-data' onSubmit={handleSubmit} className="card bg-base-100 shadow-xl p-4 pb-8 w-full max-w-[600px]">
          <h3 className='font-bold text-3xl text-secondary-content mb-4 bg-secondary p-2 py-4 rounded-xl text-center'>
            Register
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
          <label htmlFor='email' className="label label-text mt-4">
            Email
          </label>
          <label className="input-group">
            <span className="bg-neutral text-neutral-content">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </span>
            <input value={email} onChange={ e => setEmail(e.target.value) } name="email" id='email' type="email" placeholder="email" className="input input-bordered input-secondary focus:outline-none w-full" required/>
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
          <label htmlFor="passwordConfirm" className='sr-only'>password confirmation</label>
          <label className="input-group mt-2">
            <span className="bg-neutral text-neutral-content">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd" />
              </svg>
            </span>
            <input value={passwordConfirm} onChange={ e => setpasswordConfirm(e.target.value) } name="passwordConfirm" id='passwordConfirm' type="password" placeholder="password confirmation" className="input input-bordered input-secondary focus:outline-none w-full" required/>
          </label>
          <label htmlFor='name' className="label label-text justify-start gap-1 mt-4">
            Name <small className='text-accent font-bold'>(optional)</small>
          </label>
          <label className="input-group">
            <span className="bg-neutral text-neutral-content">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M4.5 3.75a3 3 0 00-3 3v10.5a3 3 0 003 3h15a3 3 0 003-3V6.75a3 3 0 00-3-3h-15zm4.125 3a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5zm-3.873 8.703a4.126 4.126 0 017.746 0 .75.75 0 01-.351.92 7.47 7.47 0 01-3.522.877 7.47 7.47 0 01-3.522-.877.75.75 0 01-.351-.92zM15 8.25a.75.75 0 000 1.5h3.75a.75.75 0 000-1.5H15zM14.25 12a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H15a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5h3.75a.75.75 0 000-1.5H15z" clipRule="evenodd" />
              </svg>
            </span>
            <input value={name} onChange={ e => setName(e.target.value) } name="name" id='name' type="text" placeholder="name" className="input input-bordered input-secondary focus:outline-none w-full"/>
          </label>
          <label htmlFor='avatar' className="label label-text justify-start gap-1 mt-4">
            Avatar <small className='text-accent font-bold'>(optional)</small>
          </label>
          <input value={avatar} onChange={ e => setAvatar(e.target.value) } name="avatar" id='avatar' type="file" className="file-input file-input-bordered file-input-secondary w-full" />
          <button className={`btn ${loading ? "loading" : ""} btn-accent mt-10 gap-1`} type='submit'>
            Create <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </form>
      </section>
    )
}

export default Register