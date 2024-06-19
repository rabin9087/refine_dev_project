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

export const dataProvider= (url: string): DataProvider => ({
    getOne: async({resource, id, meta}) => {
            const response = await fetch(`${url}/${resource}/${id}`);
            if(response.status < 200 || response.status > 299) throw response

        const data = await response.json()
         return {data}
 
      },
      update: async({resource, id, variables}) => {
        const response = await fetch(`${url}/${resource}/${id}`, {
            method: "patch",
            body: JSON.stringify(variables),
            headers: {
                "Content-type": "application/json"
            },
        });

        if(response.status < 200 || response.status > 299) throw response

        const data = await response.json()
        return {data}

      },
      getList: async({resource}) => {
        const response = await fetch(`${url}/${resource}`)
        const data = await response.json()
console.log(data)
        return data
      },
      create: async({resource, variables, meta}) => {
        return 
      },
      deleteOne: () => {
        throw new Error("Not implemented");
      },
      getApiUrl: () => url,
      // Optional methods:
      // getMany: () => { /* ... */ },
      // createMany: () => { /* ... */ },
      // deleteMany: () => { /* ... */ },
      // updateMany: () => { /* ... */ },
      // custom: () => { /* ... */ },
})