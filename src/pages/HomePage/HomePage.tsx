import { useGo } from '@refinedev/core'
import React, { act } from 'react'
import { Link } from 'react-router-dom'

const showLists = [
    { path: "/products", value: "Products List", },
    { path: "/categories", value: "Categories List", },
    { path: "/users", value: "Users List", },
]

const HomePage = () => {

    const go = useGo()
    return (
        <div className='flex items-center gap-2 m-2 p-2'>
            {showLists.map(({ path, value }, index) => (
                <Link
                    key={index}
                    to={path}
                    className="inline-block rounded ms-2 bg-button-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                    {value}
                </Link>
            ))

            }
        </div>
    )
}

export default HomePage