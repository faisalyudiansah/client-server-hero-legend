import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import HomeCard from '../components/HomeCard'

import { useDispatch, useSelector } from 'react-redux'
import { fetchHome } from "../store/appSlice"  // panggil function nya

const HomePage = () => {
  // let [data, setData] = useState([])

  // async function fetch() {
  //   try {
  //     let link = import.meta.env.VITE_BASE_URL + `/heroes`
  //     let { data } = await axios({
  //       method: 'get',
  //       url: link,
  //       headers: {
  //         access_token: localStorage.access_token,
  //       },
  //       // headers: {
  //       //   Authorization: 'Bearer ' + localStorage.access_token
  //       // }
  //     })
  //     console.log(data)
  //     setData(data)
  //   } catch (error) {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Oops...",
  //       text: `${error.response.data.message}`,
  //     })
  //   }
  // }

  // useEffect(() => {
  //   fetch()
  // }, [])

  let dispatch = useDispatch()
  let { dataHome } = useSelector((state) => state.appReducer)

  useEffect(() => {
    dispatch(fetchHome())
  }, [])

  return (
    <>
      <section className='bg-violet-400 p-10 min-h-screen'>
        <div className="">
          <div className="container">
            <h1 className="text-center text-xl font-bold text-white">CHOOSE YOUR HERO</h1>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-7">

            {dataHome && dataHome.map(hero => {
              return <HomeCard key={hero.id} hero={hero} />
            })}
            
          </div>
        </div>

      </section>
    </>
  )
}

export default HomePage