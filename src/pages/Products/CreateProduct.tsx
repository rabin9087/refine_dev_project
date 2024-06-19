import React from 'react'
import { useNavigate } from "react-router-dom";

import PropTypes from "prop-types";
import { useCreate, useList, useOne, useSelect, useUpdate } from '@refinedev/core';
import { useForm } from '@refinedev/react-hook-form';
import { Create, useAutocomplete } from '@refinedev/mui';
import { Autocomplete, Box, MenuItem, Select, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { IProduct } from 'src/types';

const CreateProduct = () => {
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
                    message: `Post Successfully created with ${data?.title}`,
                    description: "Success with no errors",
                    type: "success",
                };
            },
        }
    });

    // const { autocompleteProps: categoryAutocompleteProps } = useAutocomplete({
    //     resource: "products/categories"
    // })

    const { data: categoryAutocompleteProps } = useList({
        resource: "products/categories"
    })

    const { mutate, isLoading: isUpdating } = useCreate();
    console.log(mutate)

    const convert2base64 = (image: any) => {
        const reader = new FileReader();

        return reader.readAsDataURL(image);
    };

    // const onSave = () => {
    //     return mutate(
    //         {
    //             resource: "products",
    //             values: register,
    //         },
    //         {
    //             onError: (error, variables, context) => {

    //             },
    //             onSuccess: (data, variables, context) => {

    //             },


    //         })
    // }

    const onSubmit = (data: any) => {
        try {
            const formData = new FormData()
            formData.append("title", data.title)
            formData.append("price", data.price)
            formData.append("category", data.category)
            formData.append("description", data.description)
            formData.append("image", data.image[0])
            console.log(formData)
        } catch (error) {

        }
    };

    return (
        <Create saveButtonProps={saveButtonProps} >
            <Box
                component="form"
                sx={{ display: "flex", flexDirection: "column" }}
                autoComplete='off'
                onSubmit={handleSubmit(onSubmit)}
            >
                <TextField
                    id='title'
                    {...register("title", {
                        required: "Title is required",
                    })}
                    error={!!errors.title}
                    label="Title"
                    name='title'
                />
                <TextField
                    id='price'
                    {...register("price", {
                        required: "Price is required",
                    })}
                    error={!!errors.price}
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
                    label="Description"
                    name='description'
                />

                <TextField
                    type='file'
                    {...register("image", {
                        required: "Image is required",
                    })}
                    error={!!errors.image}
                    helperText={errors.image ? 'Image is required' : ""}

                    label=" Choose Image"
                    name='image'
                />
            </Box>
        </Create>
    )
}

export default CreateProduct