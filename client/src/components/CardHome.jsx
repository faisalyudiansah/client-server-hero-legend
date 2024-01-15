import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { chooseHeroForFavorite } from '../store/appSlice'

const CardHome = ({ hero }) => {
  let dispatch = useDispatch()
  let navigate = useNavigate()

  let chooseHero = async (idHero) => {
    await dispatch(chooseHeroForFavorite(idHero))
    navigate('/favourites')
  }

  return (
    <>
      <div className="group">
        <div className="relative">
          <div className="w-full">
            <img src={hero.imageUrl}
              className="w-full h-full object-center object-cover opacity-70 group-hover:opacity-100 rounded-md" />
            <div className="absolute bottom-0 px-2 py-4 flex flex-col bg-gradient-to-t from-black w-full rounded-md">
              <p className="text-xl text-white uppercase inline-block align-start text-left pl-2 font-bold">{hero.name}</p>
              <p className="text-md text-white inline-block align-start text-left pl-2">{hero.type}</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center h-16">
          <button onClick={() => {
            chooseHero(hero.id)
          }}
            className="px-3 py-2 text-gray-900 bg-gray-100 rounded-sm focus:outline-none focus:ring focus:ring-gray-500 uppercase tracking-widest font-bold">Choose
            Hero</button>
        </div>
      </div>
    </>
  )
}

export default CardHome