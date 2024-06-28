import { CircularProgress, Skeleton, Stack, TextField, Typography } from '@mui/material';
import { HttpError, useOne, useShow } from '@refinedev/core'
import { DateField, MarkdownField, NumberField, Show } from '@refinedev/mui';
import React from 'react'
import { IUser } from 'src/types'

const ShowUser = () => {
    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;

    const record = data?.data;

    const { data: users, isLoading: usersIsLoading, isError } = useOne<IUser, HttpError>({
        resource: "users", id: record?.products?.id || "", queryOptions: {
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
            </Stack> : <Stack gap={1}>
                <Typography variant="body1" fontWeight="bold">
                    Id
                </Typography>
                <NumberField value={record?.id ?? ""} />
                <Typography variant="body1" fontWeight="bold">
                    Title
                </Typography>
                <TextField value={record?.title} />
                <Typography variant="body1" fontWeight="bold">
                    Content
                </Typography>
                <MarkdownField value={record?.content} />
                <Typography variant="body1" fontWeight="bold">
                    Category
                </Typography>
                {usersIsLoading ? <>Loading...</> : <>{users?.data?.email}</>}
                <Typography variant="body1" fontWeight="bold">
                    Created At
                </Typography>
                <DateField value={record?.createdAt} />
            </Stack>}

        </Show>
    )
}

export default ShowUser