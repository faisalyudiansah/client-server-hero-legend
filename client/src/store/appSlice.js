import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import Swal from 'sweetalert2'

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    dataHome: [],
    dataFavorites: [],
    dataToUpdate: {},
    dataHeroToEdit: {},
    isLoading: true
  },
  reducers: {
    changeDataHome: (state, action) => {
      state.dataHome = action.payload
    },
    changeDataFavorites: (state, action) => {
      state.dataFavorites = action.payload
    },
    changeDataToEdit: (state, action) => {
      state.dataToUpdate = action.payload
    },
    changeHeroToEdit: (state, action) => {
      state.dataHeroToEdit = action.payload
    },
    changeLoading: (state, action) => {
      state.isLoading = action.payload
    },
  }
})

export const { changeDataHome, changeDataFavorites, changeDataToEdit, changeHeroToEdit, changeLoading } = appSlice.actions

export const login = (input) => {
  return async (dispatch) => {
    try {
      let link = import.meta.env.VITE_BASE_URL + `/login`
      let { data } = await axios({
        method: 'post',
        url: link,
        data: input
      })
      localStorage.access_token = data.access_token
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.response.data.message}`,
      })
      throw error
    }
  }
}

export const fetchHome = () => {
  return async (dispatch) => {
    try {
      let link = import.meta.env.VITE_BASE_URL + `/heroes`
      let { data } = await axios({
        method: 'get',
        url: link,
        headers: {
          Authorization: 'Bearer ' + localStorage.access_token
        }
      })
      dispatch(changeDataHome(data))
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.response.data.message}`,
      })
      throw error
    }
  }
}

export const chooseHeroForFavorite = (idHero) => {
  return async (dispatch) => {
    try {
      let link = import.meta.env.VITE_BASE_URL + `/favourites/${idHero}`
      await axios({
        method: 'post',
        url: link,
        headers: {
          Authorization: 'Bearer ' + localStorage.access_token
        }
      })
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.response.data.message}`,
      })
      throw error
    }
  }
}

export const fetchFavorites = () => {
  return async (dispatch) => {
    try {
      let link = import.meta.env.VITE_BASE_URL + `/favourites`
      let { data } = await axios({
        method: 'get',
        url: link,
        headers: {
          Authorization: 'Bearer ' + localStorage.access_token
        }
      })
      dispatch(changeDataFavorites(data))
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.response.data.message}`,
      })
      throw error
    }
  }
}

export const updateFavoriteHero = (valueForm, favoriteId) => {
  return async (dispatch) => {
    try {
      let link = import.meta.env.VITE_BASE_URL + `/favourites/${favoriteId}`;
      await axios({
        method: 'put',
        url: link,
        data: valueForm,
        headers: {
          Authorization: 'Bearer ' + localStorage.access_token,
        },
      })
    } catch (error) {
      console.log(error)
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.response.data.message}`,
      })
      throw error
    }
  }
}

export const fetchDataToEdit = (favoriteId) => { 
  return async (dispatch) => {
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
      dispatch(changeHeroToEdit(foundHero))
      dispatch(changeDataToEdit({
        power: foundHero.power,
        role: foundHero.role
      }))
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.response.data.message}`,
      })
      throw error
    } finally {
      dispatch(changeLoading(false))
    }
  }
}

export default appSlice.reducer