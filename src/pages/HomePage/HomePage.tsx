import { Button } from '@mui/material'
import { useGo } from '@refinedev/core'
import { ListButton } from '@refinedev/mui'
import React, { act } from 'react'
import { Link } from 'react-router-dom'

const showLists = [
    { path: "products", value: "Products List", },
    { path: "categories", value: "Categories List", },
    { path: "users", value: "Users List", },
]

const HomePage = () => {

    const go = useGo()
    return (
        <div
            className='block items-center gap-2 m-2 p-2'
        >
            {showLists.map(({ path, value }, index) => (
                <ListButton
                    className='block'
                    key={index}
                    resource={path}>
                </ListButton>
            ))

            }
        </div>
    )
}

export default HomePage