import brain from "../assets/purplebrain.png"
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import useDarkMode from "../hooks/useDarkMode";
import { Moon, Sun } from "lucide-react";

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("")
  const [isDarkMode, toggleDarkMode] = useDarkMode();

  const onSubmitHandler = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/signup`, {
        username, password
      });
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard");
        setUsername("");
        setPassword("");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setMsg(error.response?.data?.msg || "Something went wrong");
      } else {
        setMsg("Network error. Please try again.");
      }
    }
  };


  return (
    <div className='bg-white dark:bg-[#121212] h-screen w-screen fixed flex flex-col justify-center items-center gap-4 '>
      <div className="fixed p-3 top-2 left-2 flex gap-3 items-center">
        <img src={brain} alt="Logo" className='w-15  hover:cursor-pointer' onClick={() => { navigate("/") }} />
        <h3 className="text-3xl dark:text-white font-semibold">Second Brain</h3>
      </div>
      {/* Toggle Dark Mode */}
      <div className="absolute top-4 right-4">
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full bg-purple-600 text-white shadow-md"
        >
          {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
      <h3 className='text-2xl font-semibold dark:text-[#B0B0B0] '>Create a new account</h3>
      <form className='flex flex-col gap-3 w-full justify-center items-center p-5'>
        <Input placeholderText='USERNAME' type="text" id="username" value={username} onChange={(e) => { setUsername(e.target.value) }} />
        <Input placeholderText='PASSWORD' type="password" id="password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
        <h6 className='text-sm text-red-600'>{msg}</h6>
        <Button text="Sign Up" size="sm" variant="primary" onClick={onSubmitHandler} />
        <p className='text-xs font-normal dark:text-[#808080]'>Already have a account? <Link to="/signin" className="text-blue-600">SignIn</Link></p>
      </form>
    </div>
  )
}

export default Signup