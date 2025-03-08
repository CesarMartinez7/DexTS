import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { Media, Welcome } from "../Types/MangaList";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";
import { GET_MANGA_LIST } from "../Request/RequestMangaList";
import NotFound from "./NoFound";

type Query = {
  query: string;
};

const List = ({ data, currentPage, setCurrentPage }: Welcome) => {
  const navigate = useNavigate();

  const handleClick = (id: number): void => {
    navigate(`/manga/${id}`);
  };
  if (data.Page.media.length === 0)
    return <NotFound text="No se encontraron resultados" />;
  return (
    <div>
      <ul className="list bg-base-100 overflow-y-auto">
        {data.Page.media.map((item: Media) => (
          <li
            className="list-row"
            onClick={() => handleClick(item.id)}
            key={item.id}
          >
            <div>
              <img
                className="size-14 rounded-md object-cover"
                src={item.coverImage.large}
                alt={`Imagen de ${item.title.romaji}`}
              />
            </div>
            <div>
              <div className="font-bold">{item.title.romaji}</div>
              <ul className=" gap-2  flex flex-wrap font-medium">
                {item.genres.map((gen,index) => (
                  <li className=" text-[10px] badge badge-ghost" key={`${item.id}${index}`}>{gen}</li>
                ))}
              </ul>
            </div>
            <p className="list-col-wrap textarea-xs opacity-75" dangerouslySetInnerHTML={{__html: item.description}}></p>
            
          </li>
        ))}
      </ul>

      <div className="flex justify-center mt-11">
        <div className="join">
          <button className="join-item btn" onClick={() => setCurrentPage((e) => e - 1 )}>«</button>
          <button className="join-item btn">Page {currentPage}</button>
          <button className="join-item btn" onClick={() => setCurrentPage((e) => e + 1 )}>»</button>
        </div>
      </div>
    </div>
  );
};

export default function MangaList({ query }: Query) {
  const [isManga, setIsManga] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const storedIsManga = localStorage.getItem("isManga");
    if (storedIsManga !== null) {
      setIsManga(storedIsManga === "true");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("isManga", String(isManga));
  }, [isManga]);

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
    <div className="p-2 lg:p-10">
      <div className="flex justify-end">
        <p className="mx-10 mb-2 font-light text-[13px]">Filtros</p>
      </div>
      <div className="flex justify-end">
        <div className="flex gap-2" id="gene">
          <button className="btn" onClick={() => setIsManga(!isManga)}>
            {isManga ? "Anime" : "Manga"}
          </button>
        </div>
      </div>
      <main className="my-2.5">
        <List
          data={data}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </main>
      <div className="flex justify-center mt-11">
      </div>
    </div>
  );
}
