import { Blog } from "../components/Blog"
import { Navbar } from "../components/Navbar"

export const MyPosts = () =>{
    return <div className="bg-black w-screen min-h-screen">
        <Navbar></Navbar>
        <Blog></Blog>
    </div>
}