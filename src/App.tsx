import { Route,BrowserRouter,Routes } from "react-router-dom";
import Loading from "./Components/Loading";
import MangaList from "./Components/MangaList";





export default function App () {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MangaList/>}></Route>
        <Route path="/loading" element={<Loading/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}




