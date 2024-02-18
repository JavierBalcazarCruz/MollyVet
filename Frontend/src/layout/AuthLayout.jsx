import { Outlet } from 'react-router-dom'

export const AuthLayout = () => {
  return (
    <>
    {/*Este sera el master page de el front */}
        <h1>Desde auth layaout</h1>
        <Outlet/>
    </>
  )
}
export default AuthLayout;