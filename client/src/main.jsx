import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom"
import Swal from 'sweetalert2'
import Login from './pages/Login'
import HomePage from './pages/HomePage'
import Favourites from './pages/Favourites'
import EditHero from './pages/EditHero'
import Layout from './Layout'

import store from './store/index.js'
import { Provider } from 'react-redux'

let authHome = () => {
  let access_token = localStorage.access_token
  if (!access_token) {
    throw redirect('/login')
  }
  return null
}

let authLogin = () => {
  let access_token = localStorage.access_token
  if (access_token) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Already logged in",
    })
    throw redirect('/')
  }
  return null
}

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
    loader: authLogin
  },
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
        loader: authHome,
      },
      {
        path: "/favourites",
        element: <Favourites />,
        loader: authHome,
      },
      {
        path: "/update/:id",
        element: <EditHero />,
        loader: authHome,
      }
    ],
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
