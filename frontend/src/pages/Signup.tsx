import { useState } from "react"
import { Navbar } from "../components/Navbar"
import { TextBox } from "../components/TextBox"
import axios from "axios"
import { signupInput } from "@appr0ximity/medium-common"
import { useNavigate } from "react-router-dom"

export const Signup = () =>{
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmedPassword: ""
    })
    const navigate = useNavigate()



    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData((prev)=>(
            {
                ...prev,
                [name]: value,
            }
        ))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if(formData.password != formData.confirmedPassword){
            const errorMsg = document.getElementById("errorMsg")
            if(errorMsg){
                errorMsg.style.visibility = "visible"
            }
            return;
        }
        try {
            const errorMsg = document.getElementById("errorMsg")
            if(errorMsg){
                errorMsg.style.visibility = "hidden"
            }
            const success = signupInput.safeParse(formData)
            if(!success){
                const errorMsg = document.getElementById("errorMsg")
                console.log("signup parse not successful")
                if(errorMsg){
                    errorMsg.innerHTML = "Invalid Credentials!! Please try again!"
                    errorMsg.style.visibility = "visible"
                    console.log(errorMsg)
                }
                return;
            }
            const response = await axios.post("https://backend.harshakvs8.workers.dev/api/v1/user/signup", formData)
            const token = response.data.token;
            localStorage.setItem('jwtToken', token)
            navigate("/my-posts")
        } catch (e) {
            console.log(e);
        }
    }


    return <div className="bg-black w-screen h-screen">
        <Navbar></Navbar>
        <div className="grid grid-cols-8 h-[70%]">
            <form className="col-span-4 ml-8 mt-10 bg-[#161515] h-full mr-6" onSubmit={handleSubmit}>
                <div className="flex h-full items-center flex-col justify-center">
                    <p className="text-white font-bold text-3xl flex justify-center items-center pb-2">Create your account</p>
                    <span className="text-white font-light flex justify-center items-center pb-10">Already have an account? &nbsp;<button type="button" className="text-white font-extralight flex justify-center items-center underline" onClick={()=>{
                        navigate("/signin")
                    }}>Sign In</button></span>
                    <div className="flex items-center justify-center">
                        <TextBox title={"Email"} 
                        inputType="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}></TextBox>
                    </div>
                    <div className="flex items-center justify-center">
                        <TextBox title={"Name"} 
                        inputType="text"
                        name="name"
                        onChange={handleInputChange}
                        value={formData.name}></TextBox>
                    </div>
                    <div className="flex items-center justify-center">
                        <TextBox title={"Password"} 
                        inputType="password"
                        name="password"
                        onChange={handleInputChange}
                        value={formData.password}></TextBox>
                    </div>
                    <div className="flex items-center justify-center w-full">
                        <TextBox title={"Confirm Password"}
                        inputType="password"
                        name="confirmedPassword"
                        onChange={handleInputChange}
                        value={formData.confirmedPassword}></TextBox>
                        <span id="errorMsg" className="text-project-red absolute mt-10 right-[52vw] p-2" style={{visibility: "hidden"}}>Passwords do not match!</span>
                    </div>
                    <button type="submit" className="col-span-2 font-semibold bg-project-red text-white text-2xl px-9 py-2 max-w-fit flex justify-center hover:bg-white hover:text-project-red duration-200 mt-6">Submit</button>
                </div>
            </form>
            <div className="bg-project-red col-span-4 h-full mr-8 mt-10 p-3 grid-cols-1 flex justify-center items-center">
                <p className="text-6xl font-bold text-white mx-auto px-20 ">Everyone has a story to tell. Start yours today.</p>
            </div>
        </div>
    </div>
}