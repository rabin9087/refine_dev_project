import { Autocomplete, Box, Button, TextField } from '@mui/material';
import { Create, useAutocomplete } from '@refinedev/mui';
import React from 'react'
import { Controller } from 'react-hook-form';
import { useForm } from "@refinedev/react-hook-form";
import { IUser } from 'src/types';
import { useCreate } from '@refinedev/core';

const CreateUser = () => {

    const {
        saveButtonProps,
        register,
        refineCore: { queryResult, autoSaveProps, formLoading },
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<IUser>();

    const { mutate: createuser, isLoading: isCreating } = useCreate();

    const onSubmit = handleSubmit((data) => {
        createuser(
            {
                resource: "users",
                values: data,
            },
            {
                onSuccess: () => {
                    console.log("User created successfully")
                    // navigate("/users")
                },
                onError: (error) => {
                    console.log("Error creating user:", error)
                }
            }
        )

    })

    return (
        <Create isLoading={true} saveButtonProps={saveButtonProps}>
            <Box
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

            </Box>
        </Create>
    )
}

export default CreateUser