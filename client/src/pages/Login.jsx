import React, { useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from "../store/appSlice"

const Login = () => {
  let [input, setInput] = useState()
  let navigate = useNavigate()
  let dispatch = useDispatch()

  let changeInput = (e) => {
    let { name, value } = e.target
    setInput({
      ...input,
      [name]: value
    })
  }

  async function submitLogin(e) {
    e.preventDefault()
    await dispatch(login(input))
    navigate('/')
  }

  // async function submitLogin(e) {
  //   e.preventDefault()
  //   try {
  //     let link = import.meta.env.VITE_BASE_URL + `/login`
  //     let { data } = await axios({
  //       method: 'post',
  //       url: link,
  //       data: input
  //     })
  //     localStorage.access_token = data.access_token
  //     navigate('/')
  //   } catch (error) {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Oops...",
  //       text: `${error.response.data.message}`,
  //     })
  //   }
  // }

  return (
    <>
      <div class="min-h-screen bg-violet-900 py-6 flex flex-col justify-center sm:py-12">
        <div class="relative py-3 sm:max-w-xl sm:mx-auto">
          <div class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div class="max-w-md mx-auto">
              <div>
                <h1 class="text-2xl text-center text-violet-900 font-semibold">HERO LEGENDS</h1>
                <p class="tex-sm text-center font-semibold">Login</p>
              </div>
              <div className="mt-10">
                <form onSubmit={submitLogin}>
                  <div className="relative">
                    <input
                      onChange={changeInput}
                      name='email'
                      id='email'
                      type="email"
                      placeholder="Email"
                      className="input input-bordered input-secondary w-full max-w-xs bg-white text-violet-900" />
                    <label htmlFor="email"></label>
                  </div>
                  <div className="relative my-6">
                    <input
                      onChange={changeInput}
                      name='password'
                      id='password'
                      type="password"
                      placeholder="Password"
                      className="input input-bordered input-secondary w-full max-w-xs bg-white text-violet-900" />
                    <label htmlFor="password"></label>
                  </div>
                  <div className="relative">
                    <button className="bg-violet-900 text-white text-sm rounded-md font-medium hover:bg-violet-700 py-3 px-4 text-center ">Login</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login