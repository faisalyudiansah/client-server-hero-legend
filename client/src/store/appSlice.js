import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import Swal from 'sweetalert2'

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    dataHome: [],
    dataFavorites: [],
  },
  reducers: {
    changeDataHome: (state, action) => {
      state.dataHome = action.payload
    },
    changeDataFavorites: (state, action) => {
      state.dataFavorites = action.payload
    },
  }
})

export const { changeDataHome, changeDataFavorites } = appSlice.actions

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

export const fetchHome = (input) => {
  return async (dispatch) => {
    try {
      let link = import.meta.env.VITE_BASE_URL + `/heroes`
      let { data } = await axios({
        method: 'get',
        url: link,
        headers: {
          access_token: localStorage.access_token,
        },
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

export const fetchFavorites = (input) => {
  return async (dispatch) => {
    try {
      let link = import.meta.env.VITE_BASE_URL + `/favourites`
      let { data } = await axios({
        method: 'get',
        url: link,
        headers: {
          access_token: localStorage.access_token,
        },
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


export default appSlice.reducer // untuk dipakai di configure store index.js