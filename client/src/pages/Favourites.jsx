import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchFavorites } from '../store/appSlice'
import CardFavorites from '../components/CardFavorites'

const Favourites = () => {
  let dispatch = useDispatch()
  let { dataFavorites } = useSelector((state) => state.appReducer)

  useEffect(() => {
    dispatch(fetchFavorites())
  }, [])

  return (
    <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <h2 className="text-4xl tracking-widest text-white text-center uppercase font-bold">
        <span className="block">Favourites</span>
      </h2>
      <div className="mt-10 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">

        {dataFavorites && dataFavorites.map(favorite => {
          return <CardFavorites key={favorite.id} favorite={favorite} />
        })}

      </div>
    </div>
  )
}

export default Favourites