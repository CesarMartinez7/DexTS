import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { useState } from "react";

export default function Manga() {
  const [episodio, setEpisodio] = useState<number>(1);
  const { id } = useParams();
  return (
    <div className="flex flex-col justify-center items-center h-screen w-full">
      <h1>Estas leyendo</h1>
      <div className="flex justify-between items-center w-[800px]">
        <div>
          <button onClick={() => setEpisodio((e) => e - 1)} className="btn">
            Anterior
          </button>
        </div>
        <div>
          <button className="btn" onClick={() => setEpisodio((e) => e + 1)}>
            Siguiente
          </button>
        </div>
      </div>
      <iframe
        width={"800px"}
        height={"700px"}
        src={`https://vidsrc.icu/embed/manga/${id}/${episodio}`}
        frameborder="0"
      ></iframe>
    </div>
  );
}
