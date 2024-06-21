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