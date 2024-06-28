import { Button, List } from "@mui/material"
import { BaseKey, HttpError, useGo, useList } from "@refinedev/core"
import { Show } from "@refinedev/mui"
import { useModalForm } from "@refinedev/react-hook-form"
import { Link } from "react-router-dom"
import Modal from "src/components/Modal"
import { IProduct } from "src/types"
import CircularProgress from '@mui/material/CircularProgress';

const ProductsList = () => {


    const { data: products, isLoading: loadingData } = useList<IProduct, HttpError>({
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
        <List>
            {loadingData ? <div className="flex min-h-screen justify-center items-center">
                <CircularProgress />
            </div> :
                <div>

                    <h1 className=" flex justify-center m-2 text-2xl font-bold shadow-md p-2">Products List</h1>
                    <Link to={"/"} className="ms-2">
                        <Button
                            variant="contained"
                            className="inline-block rounded ms-2 bg-button-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                            {"<"} Back
                        </Button>
                    </Link>
                    <div className="flex justify-end m-2 me-4">
                        <Button
                            variant="contained"
                            // className="bg-blue-600 rounded-md px-4 py-2 text-white p-2 hover:bg-blue-400"
                            onClick={() => {
                                go({
                                    to: {
                                        resource: "products",
                                        action: "create",

                                    },
                                },
                                )
                            }}
                        >+ Create</Button>
                    </div>

                    {products?.map(({ id, title, price, description, category, image }: IProduct) => (
                        <div
                            key={id}
                            className="flex justify-center items-center mt-2 gap-2 rounded-lg bg-base-primary shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-base-secondary"
                        >
                            <Button
                                variant="outlined"
                                onClick={() => {
                                    go({
                                        to: {
                                            resource: "products",
                                            action: "show",
                                            id: id as BaseKey

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
                                    src={image as string}
                                    alt=""
                                />
                            </Button>
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
                </div>}

        </List>)
}


export default ProductsList