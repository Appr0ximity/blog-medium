import { useState } from "react"
import { Navbar } from "../components/Navbar"
import { TextBox } from "../components/TextBox"
import axios from "axios"
import { signinInput, SigninType } from "@appr0ximity/medium-common"
import { useNavigate } from "react-router-dom"

export const Signin = () =>{
    const [formData, setFormData] = useState<SigninType>({
        email: "",
        password: ""
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
        const errorMsg = document.getElementById("errorMsg")
        if(errorMsg){
            errorMsg.style.visibility = "hidden"
        }
        try {
            console.log(formData)
            const success = signinInput.safeParse(formData)
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
            try {
                const response = await axios.post("https://backend.harshakvs8.workers.dev/api/v1/user/signin", formData)
                const token = response.data.token;
                localStorage.setItem('jwtToken', token)
                console.log("Login successful")
                navigate("/my-posts")
            } catch (e) {
                console.log(e)
            }finally{
                const errorMsg = document.getElementById("errorMsg")
                if(errorMsg){
                    errorMsg.style.visibility = "visible"
                }
            }
        } catch (e) {
            console.log(e);
        }
    }


    return <div className="bg-black w-screen h-screen">
        <Navbar></Navbar>
        <div className="grid grid-cols-8 h-[70%]">
            <form className="col-span-4 ml-8 mt-10 bg-[#161515] h-full mr-6" onSubmit={handleSubmit}>
                <div className="flex h-full items-center flex-col justify-center">
                    <p className="text-white font-bold text-3xl flex justify-center items-center pb-2">Login to your account</p>
                        <span className="text-white font-light flex justify-center items-center pb-10">Don't have an account? &nbsp;<button type="button" className="text-white font-extralight flex justify-center items-center underline" onClick={()=>{
                            navigate("/signup")
                        }}>Sign Up</button></span>
                    <div className="flex items-center justify-center">
                        <TextBox title={"Email"} 
                        inputType="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}></TextBox>
                    </div>
                    <div className="flex items-center justify-center">
                        <TextBox title={"Password"} 
                        inputType="password"
                        name="password"
                        onChange={handleInputChange}
                        value={formData.password}></TextBox>
                        <span id="errorMsg" className="text-project-red absolute mt-10 right-[54vw] p-2" style={{visibility: "hidden"}}>Invalid Credentials!!</span>
                    </div>
                    <button type="submit" className="col-span-2 font-semibold bg-project-red text-white text-2xl px-9 py-2 max-w-fit flex justify-center hover:bg-white hover:text-project-red duration-200 mt-6">Submit</button>
                </div>
            </form>
            <div className="bg-project-red col-span-4 h-full mr-8 mt-10 p-3 grid-cols-1 flex justify-center items-center">
                <p className="text-6xl font-bold text-white mx-auto px-20 ">Pickup where you left off. The world doesn't wait.</p>
            </div>
        </div>
    </div>
}