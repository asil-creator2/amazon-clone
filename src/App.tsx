import { 
  createBrowserRouter, 
  createRoutesFromElements,
   Outlet, 
   Route, 
   RouterProvider 
} from "react-router"

import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Cart from "./pages/Cart"
import Error404 from "./pages/Error404"
import Favorites from "./pages/Favorites"
import SignIn from "./auth/SignIn"
import SignUp from "./auth/SignUp"
import UserPage from "./pages/User"

const Layout = () => {
  return (
    <>
    <Navbar/>
    <Outlet/>
    <Footer/>
    </>
  )
}

const App = () => {
  const router = createBrowserRouter(createRoutesFromElements(
    <Route>

      <Route path="/" element = {<Layout/>}>
        <Route index element = {<Home/>}/>
        <Route path= '/cart' element = {<Cart/>}/>
        <Route path= '/favorites' element = {<Favorites/>}/>
        <Route path="/userinfo"  element= {<UserPage/>} />
      </Route>


      <Route path="*" element = {<Error404/>} />
      <Route path="/signin" element={<SignIn/>}/>
      <Route path="/signup" element={<SignUp/>}/>
      
    </Route>
  ))
  return (
    <RouterProvider router={router} />
  )
}

export default App
