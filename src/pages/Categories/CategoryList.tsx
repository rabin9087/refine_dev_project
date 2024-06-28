import { Button, List, Table } from '@mui/material';
import { HttpError, useGo, useList } from '@refinedev/core';
import React from 'react'
import { IProduct } from 'src/types';

const CategoryList = () => {

    const { data, isLoading, isError } = useList<IProduct, HttpError>({
        resource: "products/categories",
    });

    console.log(data)

    const go = useGo()
    return (
        <List
            title={"Categories"}
        >
            <div className="flex justify-end m-2 me-4">
                <Button
                    variant="contained"
                    // className="bg-blue-600 rounded-md px-4 py-2 text-white p-2 hover:bg-blue-400"
                    onClick={() => {
                        go({
                            to: {
                                resource: "category",
                                action: "create",

                            },
                        },
                        )
                    }}
                >+ Create</Button>
            </div>
            {data?.map((item, i) => (
                <h1 key={i}>{item}</h1>
            ))}
        </List>
    )
}

export default CategoryList