import React from 'react'
import { useNavigate } from "react-router-dom";

import PropTypes from "prop-types";
import { useOne, useUpdate, useForm } from '@refinedev/core';

const Modal: React.FC = ({ isOpen, onClose, children }) => {

    if (!isOpen) return null

    type Inputs = {
        title: string,
        price: number,
        description: string,
        image: string,
        category: string,
        rating: {
            rate: number,
            count: number,
        },
    }

    const { formLoading, onFinish, queryResult } = useForm();

    const defaultValues = queryResult?.data.data

    const { data, isLoading } = useOne({ resource: "products", id: 7 });
    const { mutate, isLoading: isUpdating } = useUpdate();

    const categoryType = [
        { cat: "men's clothing", value: "men's clothing" },
        { cat: "women's clothing", value: "women's clothing" },
        { cat: "jewelery", value: "jewelery" },
        { cat: "electronics", value: "electronics" },
    ];

    const convert2base64 = (image: any) => {
        const reader = new FileReader();

        reader.readAsDataURL(image);
    };

    const onSubmit = (data: any) => {
        if (data.image.length > 0) {
            convert2base64(data.image[0]);
        }
        return mutate(data);
    };

    return (
        <div
            id="authentication-modal"
            //   tabIndex="-1"
            aria-hidden="true"
            className=" absolute  flex z-50 justify-center items-center w-full max-h-full"
        >
            <div className="relative p-4 w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl text-center uppercase font-semibold text-gray-900 dark:text-white">
                            Create New Post
                        </h3>
                        <button
                            type="button"
                            className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            data-modal-hide="authentication-modal"
                            onClick={onClose}
                        >
                            <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>

                    <div className="p-4 md:p-5">
                        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <label
                                    htmlFor="title"
                                    className="block uppercase mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Title
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    {...register("title", { required: true, maxLength: 20 })}
                                    aria-invalid={errors.title ? "true" : "false"}
                                    className="bg-gray-50  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    placeholder="Your product title"
                                    required
                                />
                                {errors.title?.type === "required" && (
                                    <p role="alert">Title is required</p>
                                )}
                            </div>
                            <div className="block">
                                <label
                                    htmlFor="category"
                                    className="block uppercase mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Category
                                </label>
                                <select
                                    id="category"
                                    {...register("category", { required: true, maxLength: 20 })}
                                    aria-invalid={errors.category ? "true" : "false"}
                                    className="block w-full px-2 py-1 rounded-md"
                                    name={"category"}
                                >
                                    <option value="">--Select a category--</option>
                                    {categoryType.map(({ cat, value }, index) => (
                                        <option className="py-1" key={index} value={value}>
                                            --{cat}--
                                        </option>
                                    ))}
                                </select>
                                {errors.category?.type === "required" && (
                                    <p role="alert">Category is required</p>
                                )}
                            </div>
                            <div>
                                <label
                                    htmlFor="price"
                                    className="block uppercase mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Price
                                </label>
                                <input
                                    type="decimal"
                                    name="price"
                                    {...register("price", { required: true, maxLength: 20 })}
                                    aria-invalid={errors.price ? "true" : "false"}
                                    id="price"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    placeholder="Price of product"
                                    required
                                />
                                {errors.price?.type === "required" && (
                                    <p role="alert">Price is required</p>
                                )}
                            </div>
                            <div>
                                <label
                                    htmlFor="image"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Image
                                </label>
                                <input
                                    type="file"
                                    name="image"
                                    alt="image"
                                    {...register("image", {
                                        required: true,
                                        valueAsNumber: true,
                                    })}
                                    aria-invalid={errors.image ? "true" : "false"}
                                    id="title"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    placeholder="Your product Image"
                                    required
                                />
                                {errors?.image?.type === "required" && (
                                    <p role="alert">Image is required</p>
                                )}
                            </div>
                            <div>
                                <label
                                    htmlFor="description"
                                    className="block uppercase mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Description
                                </label>
                                <textarea
                                    type="textarea"
                                    rows={5}
                                    name="description"
                                    {...register("description", {
                                        required: true,
                                    })}
                                    aria-invalid={errors.description ? "true" : "false"}
                                    id="description"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    placeholder="Your product description"
                                    required
                                />
                                {errors?.description ? errors?.message : "" && (
                                    <p role="alert">Description is required</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                // disabled={!isPending}
                                className="flex justify-center w-full uppercase text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                {!formLoading ? (
                                    "Create a Post"
                                ) : (
                                    <svg
                                        aria-hidden="true"
                                        className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-red-600"
                                        viewBox="0 0 100 101"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                            fill="currentColor"
                                        />
                                        <path
                                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                            fill="currentFill"
                                        />
                                    </svg>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal