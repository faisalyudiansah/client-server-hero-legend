import React from 'react'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  let navigate = useNavigate()

  let logout = () => {
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
      <div className="navbar bg-violet-900 text-white">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-violet-900 rounded-box w-52">
              <li><a className='hover:bg-violet-800' href='/'>Home</a></li>
              <li><a className='hover:bg-violet-800' href='/favourites'>Favourites</a></li>
              <li><a className='hover:bg-violet-800' onClick={logout}>Logout</a></li>
            </ul>
          </div>
          <a href='/' className="btn btn-ghost text-xl mx-4">HERO LEGENDS</a>
        </div>
        <div className="navbar-center hidden lg:flex -mx-36">
          <ul className="menu menu-horizontal px-1 font-bold gap-4">
            <li><a className='hover:bg-violet-800' href='/'>Home</a></li>
            <li><a className='hover:bg-violet-800' href='/favourites'>Favourites</a></li>
            <li><a className='hover:bg-violet-800' onClick={logout}>Logout</a></li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default Navbar