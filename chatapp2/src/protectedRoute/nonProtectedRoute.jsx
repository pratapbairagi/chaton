
const { Outlet, Navigate } = require("react-router-dom")


const NonProtectedRoute = ({auth}) => {
    return( !auth ? <Outlet/> : <Navigate replace to="/" />)
}

export default NonProtectedRoute;