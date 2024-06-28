import { Box, CircularProgress, Stack, TextField, Typography } from '@mui/material';
import { BaseKey, HttpError, useOne, useShow, useUpdate } from '@refinedev/core';
import { DateField, Edit, MarkdownField, NumberField, Show } from '@refinedev/mui';
import { useForm } from '@refinedev/react-hook-form';
import React from 'react'
import { IUser } from 'src/types';

const EditUser = () => {

    const {
        saveButtonProps,
        register,
        refineCore: { autoSaveProps, formLoading },
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<IUser>();

    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;

    const record = data?.data;

    const { data: users, isLoading: usersIsLoading, isError } = useOne<IUser, HttpError>({
        resource: "users", id: record?.users?.id || "", queryOptions: {
            enabled: !!record
        },
    })

    const { mutate: updateUser, isLoading: isUpdating } = useUpdate();

    const onSubmit = handleSubmit((data) => {

        updateUser(
            {
                resource: "users",
                values: data,
                id: record?.users?.id as BaseKey,
            },

            {
                onSuccess: () => {
                    console.log("User updated successfully")

                },
                onError: (error) => {
                    console.log("Error updating user:", error)
                }
            }
        )
    })

    return (
        <Edit isLoading={isLoading} saveButtonProps={saveButtonProps}>
            {isLoading ? <div className="flex min-h-screen justify-center items-center">
                <CircularProgress />
            </div> : <Box
                component="form"
                sx={{ display: "flex", flexDirection: "column" }}
                autoComplete='off'
                onSubmit={onSubmit}
            >
                <TextField
                    id='firstname'
                    {...register("name.firstname", {
                        required: "First name is required",
                    })}
                    label="First Name"
                    error={!!errors.name?.firstname}
                    helperText={errors.name?.firstname ? errors.name.firstname.message : ""}
                />

                <TextField
                    id='lastname'
                    {...register("name.lastname", {
                        required: "Last name is required",
                    })}
                    label="Last Name"
                    error={!!errors.name?.lastname}
                    helperText={errors.name?.lastname ? errors.name.lastname.message : ""}
                />

                <TextField
                    id='username'
                    {...register("username", {
                        required: "Username is required",
                    })}
                    error={!!errors.username}
                    helperText={errors.username ? 'Username is required' : ""}
                    label="Username"

                    name='username'
                />

                <TextField
                    id='email'
                    {...register("email", {
                        required: "Email is required",
                    })}
                    error={!!errors.email}
                    helperText={errors.email ? 'Email is required' : ""}
                    label="Email"

                    name='email'
                />
                <TextField
                    id='phone'
                    {...register("phone", {
                        required: "Phone is required",
                    })}
                    error={!!errors.phone}
                    helperText={errors.phone ? 'Phone is required' : ""}
                    label="Phone"

                    name='phone'
                />

                <TextField
                    id='password'
                    {...register("password", {
                        required: "Password is required",
                    })}
                    error={!!errors.password}
                    helperText={errors.password ? 'Password is required' : ""}
                    label="Password"
                    rows={5}
                    name='password'
                />

                <TextField
                    id='street'
                    {...register("address.street", {
                        required: "Street is required",
                    })}
                    label="Street"
                    error={!!errors.address?.street}
                    helperText={errors.address?.street ? errors.address.street.message : ""}
                />

                <TextField
                    id='number'
                    {...register("address.number", {
                        required: "Number is required",
                    })}
                    label="Number"
                    type="number"
                    error={!!errors.address?.number}
                    helperText={errors.address?.number ? errors.address.number.message : ""}
                />

                <TextField
                    id='city'
                    {...register("address.city", {
                        required: "City is required",
                    })}
                    label="City"
                    error={!!errors.address?.city}
                    helperText={errors.address?.city ? errors.address.city.message : ""}
                />

                <TextField
                    id='zipcode'
                    {...register("address.zipcode", {
                        required: "Zipcode is required",
                    })}
                    label="Zipcode"
                    error={!!errors.address?.zipcode}
                    helperText={errors.address?.zipcode ? errors.address.zipcode.message : ""}
                />

                <TextField
                    id='lat'
                    {...register("address.geolocation.lat", {
                        required: "Latitude is required",
                    })}
                    label="Latitude"
                    error={!!errors.address?.geolocation?.lat}
                    helperText={errors.address?.geolocation?.lat ? errors.address.geolocation.lat.message : ""}
                />

                <TextField
                    id='long'
                    {...register("address.geolocation.long", {
                        required: "Longitude is required",
                    })}
                    label="Longitude"
                    error={!!errors.address?.geolocation?.long}
                    helperText={errors.address?.geolocation?.long ? errors.address.geolocation.long.message : ""}
                />

            </Box>}

        </Edit>
    )
}

export default EditUser