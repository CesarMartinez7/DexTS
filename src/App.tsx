import { Route,BrowserRouter,Routes } from "react-router-dom";
import Loading from "./Components/Loading";
import MangaList from "./Components/MangaList";
import Manga from "./Pages/Manga";
import Navbar from "./Components/Navbar";





export default function App () {
  return(
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<MangaList/>}></Route>
        <Route path="/loading" element={<Loading/>}></Route>
        <Route path="/manga/:id" element={<Manga/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}




