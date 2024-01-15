import React from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

const HomeCard = ({ hero }) => {
    let navigate = useNavigate()

    async function chooseHero(idHero) {
        try {
            let link = import.meta.env.VITE_BASE_URL + `/favourites/${idHero}`
            let { data } = await axios({
                method: 'post',
                url: link,
                headers: {
                    access_token: localStorage.access_token,
                },
                // headers: {
                //     Authorization: 'Bearer ' + localStorage.access_token
                // }
            })
            navigate('/favourites')
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `${error.response.data.message}`,
            })
        }
    }

    return (
        <>
            <div className="card w-80 shadow-lg relative">
                <div className="overlay absolute top-0 left-0 right-0 bottom-0 rounded-3xl bg-gray-900 opacity-50"></div>
                <img src={hero.imageUrl} alt="picture" className='rounded-3xl' />
                <div className="overlay-content absolute top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center text-white">
                    <h2 className="text-3xl font-bold mb-2">{hero.name}</h2>
                    <p className="text-lg mb-4">{hero.type}</p>
                    <button onClick={() => {
                        chooseHero(hero.id)
                    }} className="btn text-white bg-violet-900 hover:bg-violet-800 rounded-xl">Choose Hero</button>
                </div>
            </div>
        </>
    )
}

export default HomeCard