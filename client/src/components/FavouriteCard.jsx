import React from 'react'
import { Link } from 'react-router-dom'

const FavouriteCard = ({ favorite }) => {
    return (
        <>
            <div className="card w-80 shadow-lg relative">
                <div className="overlay absolute top-0 left-0 right-0 bottom-0 rounded-3xl bg-gray-900 opacity-50"></div>
                <img src={favorite.Hero.imageUrl} alt="picture" className='rounded-3xl' />
                <div className="overlay-content absolute top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center text-white">
                    <h2 className="text-3xl font-bold mb-2">{favorite.Hero.name}</h2>
                    <p className="text-lg mb-4">{favorite.Hero.type}</p>
                    <div className='p-1 font-bold rounded-2xl'>
                        <p className="text-sm m-2">POWER: {favorite.power}</p>
                        <p className="text-sm m-2">ROLE: {favorite.role}</p>
                    </div>
                    <Link to={'/update/' + favorite.id} className="mt-5 btn text-white bg-violet-900 hover:bg-violet-800 rounded-xl">Update</Link>
                </div>
            </div>
        </>
    )
}

export default FavouriteCard