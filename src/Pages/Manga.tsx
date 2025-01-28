import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import { useState } from "react";
import Loading from "../Components/Loading";
import { MangaPeticion } from "../Types/Manga";

const GET_DATA_MANGA = gql`
  query ($id: Int, $type: MediaType) {
    # Define which variables will be used in the query (id)
    Media(id: $id, type: $type) {
      # Insert our variables into the query arguments (id) (type: ANIME is hard-coded in the query)
      id
      title {
        romaji
        english
        native
      }
      idMal
      type
      format
      status
      description
      startDate {
        year
      }
      episodes
      chapters
      coverImage {
        extraLarge
        large
        medium
        color
      }
      volumes
      genres
      tags {
        name
        description
      }
    }
  }
`;

export default function Manga() {
  const { id } = useParams();
  const [episodio, setEpisodio] = useState<number>(1);
  const numeriId = id ? parseInt(id) : 0;
  const { loading, error, data } = useQuery(GET_DATA_MANGA, {
    variables: {
      id: numeriId,
    },
  });

  if (loading) return <Loading />;
  if (error) return <div>Error</div>;

  if (data) {
    const DATA: MangaPeticion = data.Media;
    console.log(DATA.id);
    return (
      <div className="flex w-full overflow-y-auto flex-col">
        <div className="flex flex-col justify-center overflow-y-auto items-center h-screen w-full">
          <div className="w-full p-16 overflow-y-auto">
            <h3 className="font-semibold text-4xl ">{DATA.title.romaji}</h3>
            <p className="text-[12px] mt-1.5 mb-1.5">{DATA.title.native}</p>
            <ul className="flex gap-2 flex-wrap">
              {DATA.genres.map((tag) => (
                <li className="badge h-fit w-fit badge-ghost">{tag}</li>
              ))}
            </ul>
            <p className="font-extralight">{DATA.description}</p>
            <p className="font-">{DATA.type}</p>
            <div className="flex justify-between items-center w-[800px]">
              <div>
                <button
                  onClick={() => setEpisodio((e) => e - 1)}
                  className="btn"
                >
                  Anterior
                </button>
              </div>
              <div>
                <button
                  className="btn"
                  onClick={() => setEpisodio((e) => e + 1)}
                >
                  Siguiente
                </button>
              </div>
            </div>

            {DATA.type === "ANIME" ? (
              <div className="w-full h-full p-8">
                <embed
                  className="w-full h-[600px]"
                  src={`https://vidsrc.cc/v2/embed/anime/ani${id}/${episodio}/sub?autoPlay=false`}
                />
              </div>
            ) : (
              <div className="flex">
                <iframe
                  className="w-[800px] h-screen"
                  src={`https://vidsrc.icu/embed/manga/${id}/${episodio}`}
                  frameBorder="0"
                ></iframe>
                <div className="p-12">
                  <p className="font-medium mb-2">Episodios - Capitulos</p>
                  <ol className="grid grid-cols-10 gap-2 ">
                    {Array.from({ length: DATA.chapters }, (_, i) => (
                      <button className="btn btn-dash btn-primary">{i + 1}</button>
                    ))}
                  </ol>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
