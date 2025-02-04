import { lazy } from "react"

const Home = lazy(() => import("./Home"))
const Informacion = lazy(() => import("./Informacion"))
const Favoritos = lazy(() => import("./Historial"))



const RUTAS = {
    Home,
    Informacion,
    Favoritos
}


export default RUTAS