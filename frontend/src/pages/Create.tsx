import { Navbar } from "../components/Navbar"

export const Create = () =>{

    const hideDiv = (id: string) =>{
        const element = document.getElementById(id)
        if(element){
            element.style.visibility = "hidden"
        }
    }

    const focusElement = (id: string) => {
        const element = document.getElementById(id)
        if(element){
            element.focus()
        }
    }


    return <div className="bg-black min-h-screen w-screen">
        <Navbar></Navbar>
        <div className="flex justify-center items-center py-10">
            <p className="text-5xl text-gray-100">Start writing!</p>
        </div>
        {/* Title Tag */}
        <div id="editabletitle" onFocus={()=>{hideDiv("titlediv")}} contentEditable className="pl-2 font-serif z-20 border-b border-white outline-none text-white  mx-auto block w-[70vw] text-7xl pb-4" />
        <div onClick={()=>{ 
            hideDiv("titlediv") 
            focusElement("editabletitle")
            }} id="titlediv" className="flex justify-center z-10 items-center py-10">
            <p className="text-7xl mb-[10vw] mr-[55vw] font-serif font-extralight text-gray-400 absolute">Title...</p>
        </div>
        {/* Content tag */}
        <div onFocus={()=>{hideDiv("contentdiv")}} id="editablecontent" contentEditable className="overflow-hidden pl-2 z-20 w-[70vw] pb-2 box-border min-h-full h-fit font-serif border-b bg-black border-white outline-none text-white  mx-auto block text-5xl mt-20"/>
        <div onClick={()=>{
            hideDiv("contentdiv")
            focusElement("editablecontent")
        }} id="contentdiv" className="z-10 flex justify-center items-center py-10">
            <p className="text-5xl mb-[8vw] mr-[42vw] font-serif font-extralight text-gray-400 absolute">Start writing here!...</p>
        </div>
        {/* Image tag */}
        <div onFocus={()=>{hideDiv("imagediv")}} id="editableimage" contentEditable className="overflow-hidden pl-2 z-20 w-[40vw] pb-2 box-border min-h-full h-fit font-serif border-b bg-black border-white outline-none text-white  mx-auto block text-3xl mt-20"/>
        <div onClick={()=>{
            hideDiv("imagediv")
            focusElement("editableimage")
        }} id="imagediv" className="z-10 flex justify-center items-center py-10">
            <p className="text-3xl mb-[8vw] mr-[16vw] font-serif font-extralight text-gray-400 absolute">Paste your image link here!...</p>
        </div>

    </div>
}