import { Route, Routes } from "react-router-dom"
import TablaProductos from "../pages/TablaProductos.tsx"
import Login from "../pages/Login"
import PrivateRoute from "./PrivateRoutes"
const AppRoutes: React.FC = () => {
  return (
    <Routes>
        <Route path='/' element={<TablaProductos/>}> </Route> {/*TablaProductos*/}
        <Route element={<Login />} path="/login" />
    </Routes>
  )
}

export default AppRoutes