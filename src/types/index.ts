import { BaseKey } from "@refinedev/core"

export type endpointProduct = {
    endpoint: string
}

export interface IProduct {
        id ?: number | BaseKey,
        title: string,
        price: number,
        description: string,
        image: File | null | string | undefined,
        category: string,
        rating?: {
            rate: number | null,
            count: number | null,
        } | undefined,
}

export interface IUser {
        id ?: BaseKey,
        name: {firstname: string, lastname: string},
        username: string,
        email: string,
        phone: string,
        address: {
            city: string,
            geolocation: { lat: string, long: string },
            number: number,
            street: string,
            zipcode: string
        },
        password: string
       
}
    
export type IProductID = {
    id: number | string | undefined
}