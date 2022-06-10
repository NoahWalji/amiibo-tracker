import axios from "axios"

export const axiosInstance = axios.create({
    baseURL: "https://amiibo-tracker.herokuapp.com/api"
})