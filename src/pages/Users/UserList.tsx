import { Box, Button, CircularProgress, List, Paper, Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { BaseKey, HttpError, useGo, useList } from '@refinedev/core'
import { EditButton, ShowButton } from '@refinedev/mui'
import React from 'react'
import { Link } from 'react-router-dom'
import { IProduct, IUser } from 'src/types'

const UserList = () => {

    const { data: users, isLoading: loadingData } = useList<IUser, HttpError>({
        resource: "users"
    })
    const go = useGo()

    return (
        <List
            title={"Categories"}
        >
            {loadingData ?
                <div className="flex min-h-screen justify-center items-center">
                    <CircularProgress />
                </div>
                : <>
                    <h1 className=" flex justify-center m-2 text-2xl font-bold shadow-md p-2">Users List</h1>
                    <Link to={"/"} className="ms-2">
                        <Button
                            variant="contained"
                            className="inline-block rounded ms-2 bg-button-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                            {"<"} Back
                        </Button>
                    </Link>
                    <div className="flex justify-end m-2 me-4">
                        <Button
                            variant="contained"
                            // className="bg-blue-600 rounded-md px-4 py-2 text-white p-2 hover:bg-blue-400"
                            onClick={() => {
                                go({
                                    to: {
                                        resource: "users",
                                        action: "create",

                                    },
                                },
                                )
                            }}
                        >+ Create</Button>
                    </div>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>First Name</TableCell>
                                    <TableCell>last Name</TableCell>
                                    <TableCell>Username</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Phone</TableCell>
                                    <TableCell>Address</TableCell>
                                    <TableCell>Geo Location</TableCell>
                                    <TableCell>Password</TableCell>
                                    <TableCell>Edit</TableCell>
                                    <TableCell>View</TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users?.map(({ address, email, id, name, password, phone, username }: IUser) => (
                                    <TableRow key={id}>
                                        <TableCell>{id}</TableCell>
                                        <TableCell>{name.firstname}</TableCell>
                                        <TableCell>{name.lastname}</TableCell>
                                        <TableCell>{username}</TableCell>
                                        <TableCell>{email}</TableCell>
                                        <TableCell>{phone}</TableCell>
                                        <TableCell>{address.number} {address.street}, {address.city}, {address.zipcode}</TableCell>
                                        <TableCell>Lat: {address.geolocation.lat}, Long: {address.geolocation.long}</TableCell>
                                        <TableCell>{password}</TableCell>
                                        <TableCell><button

                                            onClick={() => {
                                                go({
                                                    to: {
                                                        resource: "users",
                                                        action: "edit",
                                                        id: id as BaseKey

                                                    },
                                                },
                                                )
                                            }}
                                        // className="flex justify-center items-center sm:w-72 p-4 border-2 shadow-md"
                                        ><EditButton /></button></TableCell>

                                        <TableCell><button

                                            onClick={() => {
                                                go({
                                                    to: {
                                                        resource: "users",
                                                        action: "show",
                                                        id: id as BaseKey

                                                    },
                                                },
                                                )
                                            }}
                                        // className="flex justify-center items-center sm:w-72 p-4 border-2 shadow-md"
                                        ><ShowButton /></button></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </>}
        </List>
    )
}

export default UserList