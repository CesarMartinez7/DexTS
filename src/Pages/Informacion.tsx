import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import Loading from "../Components/Loading";
import { MangaPeticion } from "../Types/Manga";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useReducer } from "react";
import { GET_DATA_MANGA } from "../Request/Request1";
import { reducer, CountAction, ConteoDeAcciones } from "../Types/MangaReducer";

type PropsArrayEpisodios = {
  episodios: number;
  dispatch: React.Dispatch<CountAction>;
};

const ArrayEpisodios = ({ episodios, dispatch }: PropsArrayEpisodios) => {
  return (
    <>
      {Array.from({ length: episodios }, (_, i) => (
        <button
          className={`btn btn-soft btn- `}
          type="button"
          onClick={() =>
            dispatch({
              type: ConteoDeAcciones.REASIGNAR,
              payload: i + 1,
            })
          }
        >
          {i + 1}
        </button>
      ))}
    </>
  );
};

const Genres = ({ DATA }: any) => {
  return (
    <section>
      <ul className="flex gap-2 flex-wrap">
        {DATA.genres.map((gen: any) => (
          <li className="badge h-fit w-fit badge-ghost">{gen}</li>
        ))}
      </ul>
    </section>
  );
};

export default function Manga() {
  const [state, dispatch] = useReducer(reducer, { count: 1 });
  const { id } = useParams();
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
    return (
      <div className="flex w-full flex-col">
        <div className="flex flex-col h-auto w-full">
          <div className="grid lg:grid-cols-2 gap-3 lg:p-4 h-screen">
            <div
              data-element="Datos"
              className="flex flex-col items-center justify-center gap-1.5 lg:p-12  p-5 "
            >
              <h3 className="font-semibold text-4xl ">{DATA.title.romaji}</h3>
              <p className="text-[12px] mt-1.5 mb-1.5">{DATA.title.native}</p>
              <Genres DATA={DATA} />
              <p className="font-extralight">{DATA.description}</p>
              <p>{DATA.chapters}</p>
              <p className="font-extralight text-[12px]">{DATA.status}</p>
            </div>
            <div className="flex items-center justify-center">
              <img
                src={`${DATA.coverImage.large}`}
                alt=""
                className=" rounded-2xl object-cover"
              />
            </div>
          </div>
          <div className="w-full lg:p-12 overflow-y-auto">
            {DATA.type === "ANIME" ? (
              <div className="w-full h-full p-8">
                <embed
                  className="w-full h-[600px]"
                  src={`https://vidsrc.cc/v2/embed/anime/ani${id}/${state?.count}/sub?autoPlay=false`}
                />
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 h-screen gap-12">
                <div className="w-full h-[80vh] ">
                  <iframe
                    title={`Cuadro de ${DATA.title.english} `}
                    className="w-full h-[600px] lg:h-screen rounded-xl p-6"
                    src={`https://vidsrc.icu/embed/manga/${id}/${state?.count}`}
                  ></iframe>
                </div>
                <div className="p-1 lg:p-6 w-full h-full flex gap-4 flex-col">
                  <div className="flex justify-between items-center w-full">
                    <div>
                      <button
                        onClick={() =>
                          dispatch({
                            type: ConteoDeAcciones.DECREMENT,
                            payload: 0,
                          })
                        }
                        className="btn"
                      >
                        <Icon
                          icon="pixelarticons:arrow-left"
                          width="20"
                          height="20"
                        />
                      </button>
                    </div>
                    <div>
                      <button
                        className="btn"
                        onClick={() =>
                          dispatch({
                            type: ConteoDeAcciones.INCREMENT,
                            payload: 0,
                          })
                        }
                      >
                        <Icon
                          icon="pixelarticons:arrow-right"
                          width="20"
                          height="20"
                        />
                      </button>
                    </div>
                  </div>
                  <div>
                    <p className="font-extralight text-[14px]">
                      Capitulo {state.count}
                    </p>
                    <h3 className="font-medium text-2xl">
                      {DATA.title.english}
                    </h3>
                  </div>

                  <p className="font-medium mb-2">Episodios - Capitulos</p>
                  <ol className="grid grid-cols-10 gap-2 overflow-auto h-screen">
                    <ArrayEpisodios
                      episodios={DATA.chapters}
                      dispatch={dispatch}
                    ></ArrayEpisodios>
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
