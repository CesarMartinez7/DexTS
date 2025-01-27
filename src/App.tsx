import { Route, BrowserRouter, Routes } from "react-router-dom";
import Loading from "./Components/Loading";
import Manga from "./Pages/Manga";
import Home from "./Components/Home";

import { Drawer } from "./Components/Navbar";

export default function App() {
  return (
    <div className="flex">
      <div className="">
        <Drawer />
      </div>
      <div className="w-full">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/loading" element={<Loading />}></Route>
            <Route path="/manga/:id" element={<Manga />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}
