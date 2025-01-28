import { useQuery} from "@apollo/client";
import { useState } from "react";
import { Manga } from "../Types/Peticion";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";
import { GET_MANGA_LIST } from "../Request/RequestMangaList";



type Query = {
  query: string
}

export default function MangaList({query} : Query) {

  const navigate = useNavigate();
  const [isManga,setIsManga] = useState<boolean>(true)
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
    <div className="p-10">
      <form
      className="flex justify-between"
      >
        <div>sdfsdf</div>
        <div className="filter" id="gene">
          <input className="btn btn-square" type="reset" value="×" />
          <input
            className="btn"
            type="radio"
            onClick={() => setIsManga(true)}
            name="frameworks"
            aria-label="Manga"
          />
          <input
            className="btn"
            type="radio"
            onClick={() => setIsManga(false)}
            name="frameworks"
            aria-label="Anime"
          />
        </div>
      </form>
      <ul className="list bg-base-100 rounded-box shadow-md overflow-y-auto">
        {data.Page.media.map((item: Manga, index: number) => (
          <li
            className="cursor-pointer"
            title={`Leer ${item.title.romaji}`}
            onClick={() => {
              navigate(`/manga/${item.id}`);
            }}
          >
            <li className="p-4 pb-2 text-xs opacity-60 tracking-wide"></li>
            <li className="list-row">
              <div className="text-4xl font-thin opacity-30 tabular-nums">
                {index + 1}
              </div>
              <div>
                <img
                  className="size-10 rounded-box"
                  src={item.coverImage.medium}
                  alt={`${item.title.userPreferred}`}
                />
              </div>
              <div className="list-col-grow">
                <div>{item.title.romaji}</div>
                <div className="text-xs font-semibold opacity-60">
                  {item.description}
                </div>
              </div>
              <button type="button" className="btn btn-square btn-ghost">
                <svg
                  className="size-[1.2em]"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M6 3L20 12 6 21 6 3z"></path>
                  </g>
                </svg>
              </button>
            </li>
          </li>
        ))}
      </ul>
    </div>
  );
}
