import React from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const Navbar = () => {
  let navigate = useNavigate()

  let logoutHandler = () => {
    Swal.fire({
      title: "Logout?",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear()
        navigate('/login')
      }
    })
  }

  return (
    <>
      <nav className="py-3 bg-purple-900 navbar-color">
        <div className="flex-1 flex items-center ml-10">
          <div className="flex-shrink-0 flex items-center">
            <a href='/' className="text-white text-2xl uppercase font-bold">Hero Legends</a>
          </div>
          <div className="hidden sm:block sm:ml-6">
            <div className="flex space-x-4 align-middle font-bold">
              <a href="/" className="text-white opacity-80 text-md uppercase hover:opacity-100 px-3 py-2">Home</a>
              <a href="/favourites" className="text-white opacity-80 text-md uppercase hover:opacity-100 px-3 py-2">Favourites</a>
              <a onClick={logoutHandler} className="text-white opacity-80 text-md uppercase hover:opacity-100 px-3 py-2">Logout</a>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar