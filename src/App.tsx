import { Route, BrowserRouter, Routes } from "react-router-dom";
import Loading from "./Components/Loading";
import Manga from "./Pages/Manga";
import Home from "./Pages/Home";

import Navbar, { Drawer } from "./Components/Navbar";
import MangaList from "./Components/MangaList";
import { useState } from "react";

import {createContext } from "react";

interface GlobalQuery{
  query: string;
  setQuery: (e: string) => void
}

const defaultQuery: GlobalQuery = {
  query: "Hello cesar",
  setQuery: () => {}
}

export const QueryContext = createContext<GlobalQuery>(defaultQuery)

export default function App() {
  const [query,setQuery] = useState<string>("Dragon ball")
  return (
    <div className="flex">
      <div className="">
        <Drawer />
      </div>
      <div className="w-full">
        <QueryContext.Provider value={{query,setQuery}}>
        <BrowserRouter>
        <Navbar/>
          <Routes>
            <Route path="/search" element={<MangaList query={query}></MangaList>}></Route>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/loading" element={<Loading />}></Route>
            <Route path="/manga/:id" element={<Manga />}></Route>
          </Routes>
        </BrowserRouter>
        </QueryContext.Provider>
      </div>
    </div>
  );
}
