import { useEffect, useState } from 'react'
import logo from './../assets/momentum.jpeg'
import { useNavigate } from 'react-router-dom'

export const Navbar = () =>{
    const [exists, setExists] = useState(false)

    const navigate = useNavigate()

    useEffect(()=>{
        if(localStorage.getItem("jwtToken")){
            setExists(true);
        }
    }, [exists])

    return <div className="bg-black py-11 flex justify-around items-center">
        <img src={logo} alt="Logo" className='w-[15vw] hover:cursor-pointer'/>
        <input type="text"  className="bg-black border-b border-white outline-none text-project-red p-2 w-[40vw]" placeholder='Search..'/>
        <p className="text-2xl text-white hover:text-project-red hover:cursor-pointer" onClick={()=>{
            navigate("/create")
        }}>Start writing</p>
        <p className="text-2xl text-white hover:text-project-red hover:cursor-pointer" onClick={()=>{
            if(exists){
                localStorage.removeItem("jwtToken")
                navigate("/signin")
            }
            navigate("/signin")
        }}>{exists? "Logout" : "Sign In"}</p>
    </div>
}