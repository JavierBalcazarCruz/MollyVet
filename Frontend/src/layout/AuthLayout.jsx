import { Outlet } from 'react-router-dom'

export const AuthLayout = () => {
  return (
    <>
    {/*Este sera el master page de el front */}
       
        <Outlet/>
    </>
  )
}
export default AuthLayout;