import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Signin } from './pages/Signin'
import { Signup } from './pages/Signup'
import { MyPosts } from './pages/MyPosts'
import { Create } from './pages/Create'

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/signin' element={<Signin/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/my-posts' element={<MyPosts/>}></Route>
      <Route path='/create' element={<Create/>}></Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
