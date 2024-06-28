import React, { ChangeEvent, useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from '@refinedev/react-hook-form';
import PropTypes from "prop-types";
import { useOne, useUpdate, useList, BaseKey, HttpError, useShow, useDelete } from '@refinedev/core';
import { Edit, DeleteButton } from '@refinedev/mui';
import { Box, Button, CircularProgress, MenuItem, TextField } from '@mui/material';
import { IProduct } from 'src/types';

const EditProduct = () => {
  const [images, setImages] = useState<string | null>(null);
  const { id } = useParams()

  const { queryResult } = useShow({})
  const { data, isLoading } = queryResult

  const record = data?.data

  const { data: product, isLoading: productIsLoading, isError, isSuccess } = useOne<IProduct, HttpError>({
    resource: "products", id: id || "", queryOptions: {
      enabled: !!record
    },
  })

  if (isLoading) {
    return <div className="flex min-h-screen justify-center items-center">
      <CircularProgress />
    </div>;
  }

  if (isError) {
    return <div>Something went wrong!</div>;
  }


  const {
    saveButtonProps,
    register,
    refineCore: { autoSaveProps, formLoading },
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IProduct>();

  const { data: categoryAutocompleteProps } = useList({
    resource: "products/categories"
  })

  const { mutate: updateProduct, isLoading: isUpdating } = useUpdate();
  const convert2base64 = (image: any) => {
    const reader = new FileReader();

    reader.readAsDataURL(image);
  };

  const onSubmit = handleSubmit((data) => {
    // if (data?.image.length > 0) {
    //   {
    //     convert2base64(data.image[0]);
    //   }
    // }
    // const formData = new FormData()
    // formData.append("title", data?.title)
    // formData.append("price", data?.price)
    // formData.append("category", data?.category)
    // formData.append("description", data?.description)
    // formData.append("image", data?.image[0])
    // console.log(formData, data)

    updateProduct(
      {
        resource: "products",
        values: data,
        id: id as BaseKey,
      },

      {
        onSuccess: () => {
          console.log("Product updated successfully")

        },
        onError: (error) => {
          console.log("Error updating product:", error)
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

  const { mutate: deleteAProduct } = useDelete();

  // const handelOnDelete = () => {
  //   return deleteAProduct({
  //     resource: "products",
  //     id: id as BaseKey,
  //   });
  // }

  const handleDelete = () => {
    deleteAProduct(
      {
        resource: "products",
        id: id as BaseKey,
      },
      // {
      //   onSuccess: () => {
      //     push("/posts");
      //   },
      // }
    );
  };

  return (
    <Edit saveButtonProps={saveButtonProps} >
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete='off'
      // onSubmit={onSubmit}
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
          type='text'
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
          {...register("category", {
            required: "Category is required"
          })}
          // value={register?.category}
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

        {images && <img
          className='shadow-md rounded-md m-2 p-2'
          src={images} width={"200px"} height={"200px"} alt='Image' />}

        <TextField
          type='file'
          {...register("image", {
            required: "Image is required",
          })}
          error={!!errors.image}
          helperText={errors.image ? 'Image is required' : ""}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            handelOnImageChange(e);
            register("image").onChange(e); // Ensure react-hook-form gets the file
          }}
          name='image'
          inputProps={{
            accept: "image/*"
          }}
        />

      </Box>
    </Edit>
  )
}

export default EditProduct