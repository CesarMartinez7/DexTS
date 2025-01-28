import { useQuery } from "@apollo/client";
import { useState } from "react";
import { Manga } from "../Types/Peticion";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";
import { GET_MANGA_LIST } from "../Request/RequestMangaList";
import { Icon } from "@iconify/react/dist/iconify.js";

type Query = {
  query: string;
};

const List = ({ data } : any) => {
  const navigate = useNavigate();
  const handleClick = (id : number) : void => {
    navigate(`/manga/${id}`)
  }
  return (
    <ul className="list bg-base-100 rounded-box shadow-md overflow-y-auto">
      {data.Page.media.map((item: Manga) => (
        <li className="list-row" onClick={() => handleClick(item.id) }>
          <div>
            <img className="size-12 rounded-box object-cover" src={item.coverImage.large} />
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
          <button className="btn btn-square btn-ghost">
            <Icon icon="pixelarticons:play" width="20" height="20" />
          </button>
          <button className="btn btn-square btn-ghost">
            <Icon icon="pixelarticons:heart" width="20" height="20" />
          </button>
        </li>
      ))}
    </ul>
  );
};

export default function MangaList({ query }: Query) {
  const [isManga, setIsManga] = useState<boolean>(true);
  const { loading, error, data } = useQuery(GET_MANGA_LIST, {
    variables: {
      page: 1,
      perPage: 20,
      search: query,
      type: isManga ? "MANGA" : "ANIME",
    },
  });

  if (loading) return <Loading />;
  if (error) return <div>Errror</div>;
  return (
    <div className="p-2 lg:p-10">
      <form className="flex justify-between">
        <div></div>
        <div className="flex gap-2" id="gene">
          <button className="btn" onClick={() => setIsManga(true)}>
            Manga <Icon icon="pixelarticons:notes" width="20" height="20" />
          </button>
          <button className="btn" onClick={() => setIsManga(false)}>
            Anime <Icon icon="pixelarticons:user" width="20" height="20" />
          </button>
        </div>
      </form>
      <main className="my-2.5">
      <List data={data} />

      </main>
    </div>
  );
}
