import {Navigate, Outlet} from 'react-router-dom'


const ProtectedRoute = () => {
  const token = localStorage.getItem('userToken')
  // console.log("protrected route token", token)
  if (token === null) {
    return <Navigate to="/login" />
  }
  return <Outlet />
}

export default ProtectedRoute