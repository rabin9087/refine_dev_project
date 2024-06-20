import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

import PropTypes from "prop-types";
import { useCreate, useList, useOne, useSelect, useUpdate } from '@refinedev/core';
import { useForm } from '@refinedev/react-hook-form';
import { Create, useAutocomplete } from '@refinedev/mui';
import { Autocomplete, Box, MenuItem, Select, TextField } from '@mui/material';
import { Controller, SubmitHandler } from 'react-hook-form';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { IProduct } from 'src/types';

const CreateProduct = () => {
    const [images, setImages] = useState<string | null>(null);
    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    const navigate = useNavigate()

    const {
        saveButtonProps,
        register,
        refineCore: { queryResult, autoSaveProps, formLoading },
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<IProduct>({
        refineCoreProps: {
            invalidates: ["list", "all"],
            successNotification: (data, values, resource) => {
                return {
                    message: `Post Successfully created`,
                    description: "Success with no errors",
                    type: "success",
                };
            },
        }
    });

    const { data: categoryAutocompleteProps } = useList({
        resource: "products/categories"
    })

    const { mutate: createProduct, isLoading: isCreating } = useCreate();

    const convert2base64 = (image: any) => {
        const reader = new FileReader();
        return reader.readAsDataURL(image);
    };
    console.log(images)

    const onSubmit = handleSubmit((data) => {

        console.log(data)

        if (data?.image.length > 0) {
            {
                convert2base64(data.image[0]);
            }
        }
        console.log(data)
        const formData = new FormData()

        // for (let key in formData) {
        //     formData.append([key, formData[key]])
        // }
        formData.append("title", data?.title)
        formData.append("price", data?.price)
        formData.append("category", data?.category)
        formData.append("description", data?.description)
        formData.append("image", data?.image[0])
        console.log(formData)

        createProduct(
            {
                resource: "products",
                values: formData,
            },
            {
                onSuccess: () => {
                    console.log("Product created successfully")
                    navigate("/products")
                },
                onError: (error) => {
                    console.log("Error creating product:", error)
                }
            }
        )

    })

    const handelOnImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setImages(URL.createObjectURL(file))
        }
    }



    return (
        <Create saveButtonProps={saveButtonProps} isLoading={formLoading || isCreating}>
            <Box
                component="form"
                sx={{ display: "flex", flexDirection: "column" }}
                autoComplete='off'
                onSubmit={onSubmit}
            >
                <TextField
                    id='title'
                    {...register("title", {
                        required: "Title is required",
                    })}
                    error={!!errors.title}
                    helperText={errors.title ? 'Title is required' : ""}
                    label="Title"
                    name='title'
                />
                <TextField
                    type='number'
                    id='price'
                    {...register("price", {
                        required: "Price is required",
                    })}
                    error={!!errors.price}
                    helperText={errors.price ? 'Price is required' : ""}
                    label="Price"
                    name='price'
                />

                <TextField
                    select
                    label="Category"
                    defaultValue=""
                    inputProps={register("category", {
                        required: "Category is required"
                    })}
                    helperText={errors.category ? 'Category is required' : ""}
                >
                    {categoryAutocompleteProps?.map((item: string, i: number) => (
                        <MenuItem key={i} value={item}>{item.toUpperCase()}</MenuItem>
                    ))}
                </TextField>

                <TextField
                    id='description'
                    {...register("description", {
                        required: "Description is required",
                    })}
                    error={!!errors.description}
                    helperText={errors.description ? 'Description is required' : ""}
                    label="Description"
                    rows={5}
                    name='description'
                />

                {images && <img src={images} width={"200px"} height={"200px"} alt='Image' />}

                <TextField
                    type='file'
                    {...register("image", {
                        required: "Image is required",
                    })}
                    error={!!errors.image}
                    helperText={errors.image ? 'Image is required' : ""}
                    onChange={(e) => {
                        handelOnImageChange(e);
                        register("image").onChange(e); // Ensure react-hook-form gets the file
                    }}
                    name='image'
                    inputProps={{
                        accept: "image/*"
                    }}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    disabled={formLoading || isCreating}
                >
                    Save
                </Button>
            </Box>
        </Create>
    )
}

export default CreateProduct