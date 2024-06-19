import axios from 'axios'
import { endpointProduct } from 'src/types'
const API_URL = "https://fakestoreapi.com"

export const axiosInstance = axios.create({
        baseURL: API_URL,
        headers: { "Content-type": "application/json; charset = UTF-8" }
    })

export const getAProduct = async (endpoint: string)=> {
        try {
            const {data} = await axiosInstance.get(endpoint )
        return data
        } catch (error) {
            throw new Error(`Error fetching product: ${error}`);
        }
        
    }


