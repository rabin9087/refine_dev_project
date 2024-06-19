export type endpointProduct = {
    endpoint: string
}

export interface IProduct {
        id ?: number,
        title: string,
        price: number,
        description: string,
        image: File | null,
        category: string,
        rating: {
            rate: number | null,
            count: number | null,
        } | undefined,
    }