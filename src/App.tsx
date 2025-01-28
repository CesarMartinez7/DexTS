import { Route, BrowserRouter, Routes } from "react-router-dom";
import Loading from "./Components/Loading";
import Manga from "./Pages/Manga";
import Home from "./Components/Home";

import Navbar, { Drawer } from "./Components/Navbar";
import MangaList from "./Components/MangaList";

export default function App() {
  return (
    <div className="flex">
      <div className="">
        <Drawer />
      </div>
      <div className="w-full">
        <BrowserRouter>
        <Navbar/>
          <Routes>
            <Route path="/search" element={<MangaList/>}></Route>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/loading" element={<Loading />}></Route>
            <Route path="/manga/:id" element={<Manga />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}
