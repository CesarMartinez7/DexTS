import { useQuery } from "@apollo/client";
import  { useState } from "react";
import { Media, Welcome } from "../Types/MangaList";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";
import { GET_MANGA_LIST } from "../Request/RequestMangaList";
import { Icon } from "@iconify/react/dist/iconify.js";
import NotFound from "./NoFound";

type Query = {
  query: string;
};





const List = ({data,currentPage,setCurrentPage} : Welcome) => {
  const navigate = useNavigate();
  

  
  const handleClick = (id: number): void => {
    navigate(`/manga/${id}`);
  };
  if (data.Page.media.length === 0)
    return <NotFound text="No se encontraron resultados" />;
  return (
    <div>
      <ul className="list bg-base-100 rounded-box shadow-md overflow-y-auto">
        {data.Page.media.map((item: Media) => (
          <li className="list-row" onClick={() => handleClick(item.id)} key={item.id}>
            <div>
              <img
                className="size-12 rounded-box object-cover"
                src={item.coverImage.large}
                alt={`Imagen de ${item.title.romaji}`}
              />
            </div>
            <div>
              <div>{item.title.romaji}</div>
              <ul className=" gap-1.5  flex flex-wrap  font-semibold opacity-60">
                {item.genres.map((gen) => (
                  <li className="badge text-[10px]">{gen}</li>
                ))}
              </ul>
            </div>
            <p className="list-col-wrap text-xs">{item.description}</p>
            <button className="btn btn-square btn-ghost" title="dsf">
              <Icon icon="pixelarticons:play" width="20" height="20"  />
            </button>
            <button className="btn btn-square btn-ghost" title="dsf">
              <Icon icon="pixelarticons:heart" width="20" height="20" />
            </button>
          </li>
        ))}
      </ul>

      <div className="flex justify-center">
        <div className="join">
          <button className="join-item btn">1</button>
          <button
            className="join-item btn btn-active"
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            2
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default function MangaList({ query }: Query) {
  const [isManga, setIsManga] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { loading, error, data } = useQuery(GET_MANGA_LIST, {
    variables: {
      page: currentPage,
      perPage: 20,
      search: query,
      type: isManga ? "MANGA" : "ANIME",
    },
  });

  if (loading) return <Loading />;
  if (error) return <NotFound text="Ocurrio un error " />;
  return (
    <div className="p-2 lg:p-10 ">
      <div className="flex justify-end">
        <p className="mx-44 mb-2 font-light text-[13px]">Filtros</p>
      </div>
      <div className="flex justify-end">
        <div className="flex gap-2" id="gene">
          <button className="btn" onClick={() => setIsManga(!isManga)}>
            Manga <Icon icon="pixelarticons:notes" width="20" height="20" />
          </button>
          <button className="btn btn-dash" onClick={() => setIsManga(!isManga)}>
            Anime <Icon icon="pixelarticons:user" width="20" height="20" />
          </button>
        </div>
      </div>
      <main className="my-2.5">
        <List data={data} currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </main>
    </div>
  );
}
