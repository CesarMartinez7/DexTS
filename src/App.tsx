import { Route, BrowserRouter, Routes } from "react-router-dom";
import Loading from "./Components/Loading";
import Navbar from "./Components/Navbar";
import MangaList from "./Components/MangaList";
import { useState } from "react";
import RUTAS from "./Pages/Lazy";
const { Informacion, Home, Favoritos } = RUTAS;
import { createContext } from "react";
import ASCIIText from "./Pages/Main";


interface GlobalQuery {
  query: string;
  setQuery: (e: string) => void;
}

const defaultQuery: GlobalQuery = {
  query: "Hello cesar",
  setQuery: () => {},
};

export const QueryContext = createContext<GlobalQuery>(defaultQuery);

export default function App() {
  const [query, setQuery] = useState<string>("Dragon ball");
  return (
    <div className="flex">
      <div className="w-full">
        <QueryContext.Provider value={{ query, setQuery }}>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route
                path="/main"
                element={<div className="h-screen"><ASCIIText text="Dexts" textFontSize={23} ></ASCIIText></div>}
              ></Route>
              <Route
                path="/search"
                element={<MangaList query={query}></MangaList>}
              ></Route>
              <Route path="/" element={<Home />}></Route>
              <Route path="/loading" element={<Loading />}></Route>
              <Route path="/manga/:id" element={<Informacion />}></Route>
              <Route path="/favorites" element={<Favoritos />}></Route>
            </Routes>
          </BrowserRouter>
        </QueryContext.Provider>
      </div>
    </div>
  );
}
