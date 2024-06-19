import { Button } from "@mui/material"
import { useGo, useList } from "@refinedev/core"
import { Show } from "@refinedev/mui"
import { useModalForm } from "@refinedev/react-hook-form"
import { Link } from "react-router-dom"

const ProductsList = () => {



    interface IProducts {
        id: number,
        title: string,
        price: number,
        description: string,
        category: string,
        image: string,
        rating: {
            rate: number,
            count: number
        }
    }
    const { data: products } = useList({
        resource: "products"
    })

    const {
        modal: { visible, close, show },
        refineCore: { onFinish, formLoading },
        handleSubmit, register, saveButtonProps
    } = useModalForm({
        refineCoreProps: { action: "create" },
        syncWithLocation: true
    })

    const go = useGo()
    return (
        <>
            <h1 className=" flex justify-center m-2 text-2xl font-bold shadow-md p-2">Products List</h1>
            <div className="flex justify-end m-2 me-4">
                <button className="bg-blue-600 rounded-md px-4 py-2 text-white p-2 hover:bg-blue-400"
                    onClick={() => {
                        go({
                            to: {
                                resource: "products",
                                action: "create",

                            },
                        },
                        )
                    }}
                >Create</button>
            </div>

            {products?.map(({ id, title, price, description, category, image, rating }: IProducts) => (
                <div
                    key={id}
                    className="flex justify-center items-center mt-2 gap-2 rounded-lg bg-base-primary shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-base-secondary"
                >
                    <button
                        onClick={() => {
                            go({
                                to: {
                                    resource: "products",
                                    action: "show",
                                    id: id

                                },
                            },
                            )
                        }}
                        className="flex justify-center items-center sm:w-72 p-4 border-2 shadow-md"
                    >
                        <img
                            className="rounded-t-lg"
                            width={"200px"}
                            height={"200px"}
                            src={image}
                            alt=""
                        />
                    </button>
                    <div className="w-2/3 p-4">
                        <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                            Title: {title}
                        </h5>

                        <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                            Category: {category}
                        </p>
                        <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                            {description}
                        </p>
                        <p className="text-white text-3xl font-bold mb-2">${price}</p>


                    </div>
                </div>
            ))}
        </>
    )
}

export default ProductsList