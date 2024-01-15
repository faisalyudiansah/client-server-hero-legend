import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'
import Swal from 'sweetalert2'

const EditHero = () => {
  let navigate = useNavigate()

  const { id } = useParams();
  let favoriteId = Number(id)

  let [data, setData] = useState({})
  let [loading, setLoading] = useState(true)
  let [valueForm, setValueForm] = useState({
    power: 0,
    role: '-'
  })

  async function fetchData() {
    try {
      let link = import.meta.env.VITE_BASE_URL + `/favourites`;
      let { data } = await axios({
        method: 'get',
        url: link,
        headers: {
          access_token: localStorage.access_token,
        },
        // headers: {
        //   Authorization: 'Bearer ' + localStorage.access_token,
        // },
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
    fetchData()
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
    try {
      let link = import.meta.env.VITE_BASE_URL + `/favourites/${favoriteId}`;
      await axios({
        method: 'put',
        url: link,
        data: valueForm,
        headers: {
          access_token: localStorage.access_token,
        },
        // headers: {
        //   Authorization: 'Bearer ' + localStorage.access_token,
        // },
      })
      navigate("/favourites")
    } catch (error) {
      console.log(error)
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.response.data.message}`,
      })
    }
  }

  return (
    <>
      <section className='bg-violet-400 p-10 min-h-screen'>
        <h1 className='text-white text-center font-bold text-xl'>UPDATE HERO</h1>
        {loading ? (
          <div className="text-center">
            <span className="loading loading-bars text-center text-violet-900 loading-lg"></span>
          </div>
        ) : (
          <div className="hero ">
            <div className="hero-content flex-col lg:flex-row">
              <img src={data.Hero.imageUrl} className="max-w-sm mt-10 rounded-3xl w-72 shadow-2xl" />
              <div className='bg-violet-900 p-10 mt-10 rounded-3xl'>
                <form action="" onSubmit={submitUpdate}>
                  <div className="py-4" >
                    <span htmlFor="power">Power</span>
                    <input
                      type="number"
                      className="w-full border input-bordered p-2 mt-2 rounded-md placeholder:text-inherit-300"
                      placeholder='Image Url'
                      name="power"
                      id="power"
                      onChange={changeInput}
                      value={valueForm.power}
                    />
                  </div>

                  <div className="py-4">
                    <span htmlFor="role">Role</span>
                    <select
                      className="select select-bordered w-full max-w-xs"
                      name="role"
                      id="role"
                      onChange={changeInput}
                      defaultValue='--select--'
                    >
                      <option disabled>--select--</option>
                      <option value='Jungler'>Jungler</option>
                      <option value='Roamer'>Roamer</option>
                      <option value='Mid Laner'>Mid Laner</option>
                      <option value='Gold Laner'>Gold Laner</option>
                      <option value='Exp Laner'>Exp Laner</option>
                    </select>
                  </div>
                  <button className="btn btn-primary">Update</button>
                </form>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  )
}

export default EditHero