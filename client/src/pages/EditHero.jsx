import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

import axios from 'axios'
import Swal from 'sweetalert2'

import { useDispatch } from 'react-redux'
import { fetchDataToEdit, updateFavoriteHero } from '../store/appSlice';

const EditHero = () => {
  let dispatch = useDispatch()
  let navigate = useNavigate()

  const { id } = useParams()
  let favoriteId = Number(id)

  let [data, setData] = useState({})
  let [loading, setLoading] = useState(true)
  let [valueForm, setValueForm] = useState({
    power: 0,
    role: '-'
  })

  // let { isLoading, dataToUpdate, dataHeroToEdit } = useSelector((state) => state.appReducer)
  // useEffect(()=>{
  //   dispatch(fetchDataToEdit(favoriteId))
  // }, [])

  async function fetchDataToEdit() {
    try {
      let link = import.meta.env.VITE_BASE_URL + `/favourites`;
      let { data } = await axios({
        method: 'get',
        url: link,
        headers: {
          Authorization: 'Bearer ' + localStorage.access_token,
        },
      })
      let foundHero = data.find(hero => hero.id === favoriteId);
      setData(foundHero)
      setValueForm({
        power: foundHero.power,
        role: foundHero.role
      })
    } catch (error) {
      console.log(error)
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.response.data.message}`,
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDataToEdit()
  }, [])

  let changeInput = (e) => {
    let { name, value } = e.target
    setValueForm({
      ...valueForm,
      [name]: value
    })
  }

  const submitUpdate = async (e) => {
    e.preventDefault();
    await dispatch(updateFavoriteHero(valueForm, favoriteId))
    navigate("/favourites")
  }

  return (
    <>
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-4xl tracking-widest text-white text-center uppercase font-bold">
          <span className="block">Update Hero</span>
        </h2>
        {loading ? (
          <div className="text-center">
            <h1 className='text-white'>LOADING...</h1>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-10">
            <div className="col-start-2 col-span-3">
              <img src={data.Hero.imageUrl}
                className="w-full h-full object-center object-cover opacity-70 group-hover:opacity-100 rounded-md" />
            </div>
            <div className="col-start-6 col-span-4">
              <div className="card px-10 py-5 sm:px-20 sm:py-10 rounded-md">
                <form className="mt-6 mb-6 space-y-6" onSubmit={submitUpdate}>
                  <div className="mb-5">
                    <label htmlFor="power-update" className="sr-only">Power</label>
                    <input
                      value={valueForm.power}
                      onChange={changeInput}
                      name='power'
                      id="power-update"
                      type="number"
                      autoComplete="off"
                      required
                      className="block w-full px-3 py-2 border rounded-sm text-purple-900 focus:outline-none focus:ring focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-lg tracking-wider"
                      placeholder="Power (ex: 2200)" />
                  </div>
                  <div>
                    <label htmlFor="role-update" className="sr-only">Role</label>
                    <select
                      onChange={changeInput}
                      name="role"
                      id="role-update"
                      defaultValue={valueForm.role !== '-' ? valueForm.role : '-- Select Role --'}
                      className="block w-full px-3 py-2 border rounded-sm text-purple-900 focus:outline-none focus:ring focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-lg tracking-wider">
                      <option disabled>-- Select Role --</option>
                      <option value="Jungler">Jungler</option>
                      <option value="Roamer">Roamer</option>
                      <option value="Mid Laner">Mid Laner</option>
                      <option value="Gold Laner">Gold Laner</option>
                      <option value="Exp Laner">Exp Laner</option>
                    </select>
                  </div>
                  <div>
                    <button type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent text-sm rounded-sm text-purple-900 bg-white bg-opacity-90 hover:bg-white hover:bg-opacity-80 focus:outline-none focus:ring focus:border-purple-500 focus:ring-purple-500 tracking-wider font-bold">Update</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  )
}

export default EditHero