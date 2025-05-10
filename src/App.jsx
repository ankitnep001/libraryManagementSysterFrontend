import { createBrowserRouter, RouterProvider } from "react-router-dom"
import PageNotFound from "./ui/common/pages/PageNotFound"
import Login from "./ui/user/pages/auth/Login"
import Signup from "./ui/user/pages/auth/Signup"
import Home from "./ui/user/pages/Home"
import UserTemplate from "./ui/user/template/UserTemplate"


const router = createBrowserRouter([

  {
    path: '/home',
    element: <UserTemplate />,
    children: [
      { index: true, element: <Home /> },
      { path: '/home', element: <Home /> },

      { path: '*', element: <PageNotFound /> }
    ]
  },

  {
    path: '/',
    element: null,
    children: [
      { index: true, element: <Login /> },
      { path: 'login', element: <Login /> },
      { path: 'signup', element: <Signup /> },

      { path: '*', element: <PageNotFound /> }
    ]
  },
  {
    path: '/auth',
    element: null,
    children: [
      { index: true, element: <Login /> },
      { path: 'login', element: <Login /> },
      // { path: 'signup', element: <Signup /> },

      { path: '*', element: <PageNotFound /> }
    ]
  },



])

function App() {

  return <RouterProvider router={router} />
}

export default App
