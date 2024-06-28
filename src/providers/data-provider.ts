import {DataProvider, HttpError} from '@refinedev/core'
import axios from 'axios'

type MethodTypes = "get" | "head" | "delete" | "options"
type MethodTypesWithBody = "post" | "put" | "patch"

const axiosInstance = axios.create()

axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    const customeError: HttpError = {
      ...error,
      message: error.response?.data?.message,
      statusCode: error.response?.status,
    }
    return Promise.reject(customeError)
  }
)

export const dataProvider = (apiUrl: string): DataProvider => ({
  
    getOne: async({resource, id}) => {
    const  data  = await axiosInstance.get(`${apiUrl}/${resource}/${id}`);

         return data
 
      },
      update: async({resource, id, variables}) => {
        const data = await axiosInstance.patch(`${apiUrl}/${resource}/${id}`, variables, {
          headers: {"Content-Type": "application/json"}
        });

        return data

  },
      
    getList: async ({ resource, pagination, filters, sorters, meta }) => {
            const {current = 1, pageSize= 5, mode = "server"} = pagination ?? {}
            const {data} = await axiosInstance.get(`${apiUrl}/${resource}`)
            return data
      },
  
      create: async({resource, variables, meta}) => {
        const headers = meta?.headers ?? {};
        const url = `${apiUrl}/${resource}`
        const {data} = await axiosInstance.post(url, variables, {headers})
        return {data}
      },
      
      deleteOne: async({resource, id, }) => {
        const { data } = await axiosInstance.delete(`${apiUrl}/${resource}/${id}`)
        return data
      },
      
      getApiUrl: () => apiUrl,
      // Optional methods:
      // getMany: () => { /* ... */ },
      // createMany: () => { /* ... */ },
      // deleteMany: () => { /* ... */ },
      // updateMany: () => { /* ... */ },
      // custom: () => { /* ... */ },
})