import { Box, CircularProgress, Skeleton, Stack, TextField, Typography } from '@mui/material';
import { HttpError, useOne, useShow } from '@refinedev/core'
import { DateField, MarkdownField, NumberField, Show } from '@refinedev/mui';
import React from 'react'
import { IUser } from 'src/types'

const ShowUser = () => {
    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;

    const record = data?.data;

    const { data: users, isLoading: usersIsLoading, isError } = useOne<IUser, HttpError>({
        resource: "users", id: record?.users?.id || "", queryOptions: {
            enabled: !!record
        },
    })

    return (
        <Show isLoading={isLoading}>
            {isLoading ? <Stack spacing={1}>
                {/* For variant="text", adjust the height via font-size */}
                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />

                {/* For other variants, adjust the size with `width` and `height` */}
                <Skeleton variant="circular" width={40} height={40} />
                <Skeleton variant="rectangular" width={210} height={60} />
                <Skeleton variant="rounded" width={210} height={60} />
            </Stack> :
                <Box>
                    <Typography variant="h6">Users Details</Typography>
                    <Typography variant="body1">
                        <strong>Name:</strong> {record?.name?.firstname} {record?.name?.lastname}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Username:</strong> {record?.username}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Email:</strong> {record?.email}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Phone:</strong> {record?.phone}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Address:</strong> {record?.address?.number} {record?.address?.street}, {record?.address?.city}, {record?.address?.zipcode}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Geolocation:</strong> Lat: {record?.address?.geolocation.lat}, Long: {record?.address?.geolocation.long}
                    </Typography>
                </Box>
            }

        </Show>
    )
}

export default ShowUser