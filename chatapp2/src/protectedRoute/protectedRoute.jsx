import { useEffect, useState } from "react"

const { Outlet, Navigate } = require("react-router-dom")


const ProtectedRoute = ({auth}) => {
    return( auth ? <Outlet/> : <Navigate replace to="/login" /> )
}

export default ProtectedRoute;