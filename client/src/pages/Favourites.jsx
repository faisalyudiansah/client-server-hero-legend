import React, { useEffect, useState } from 'react'
import FavouriteCard from '../components/FavouriteCard'
import axios from 'axios'
import Swal from 'sweetalert2'

import { useDispatch, useSelector } from 'react-redux'
import { fetchFavorites } from "../store/appSlice"  // panggil function nya

const Favourites = () => {
  // let [data, setData] = useState([])

  // async function fetchData() {
  //   try {
  //     let link = import.meta.env.VITE_BASE_URL + `/favourites`
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
  //   fetchData()
  // }, [])

  let dispatch = useDispatch()
  let { dataFavorites } = useSelector((state) => state.appReducer)

  useEffect(() => {
    dispatch(fetchFavorites())
  }, [])

  return (
    <>
      <section className='bg-violet-400 p-10 min-h-screen'>
        <div className="">
          <div className="container">
            <h1 className="text-center text-xl font-bold text-white">FAVOURITES</h1>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-7">

            {dataFavorites && dataFavorites.map(favorite => {
              return <FavouriteCard key={favorite.id} favorite={favorite} />
            })}

          </div>
        </div>

      </section>
    </>
  )
}

export default Favourites