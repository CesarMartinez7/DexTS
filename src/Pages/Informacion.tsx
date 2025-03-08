import Loading from "../Components/Loading";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useReducer } from "react";
import { reducer, ConteoDeAcciones } from "../Types/MangaReducer";
import ImageNotFound from "../../public/imagent.svg";
import { TypesTy } from "../Types/Manga";
import HookInformacion from "../Hooks/informacion";
import { ArrayEpisodios } from "../Hooks/informacion";
import { useRef } from "react";

export default function Manga() {
  const { handleClickAdd, numeriId, refEmbed, loading, error, data } =
    HookInformacion();
  const [state, dispatch] = useReducer(reducer, { count: 1 });
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) return <Loading />;
  if (error) return <div>Error</div>;

  if (data) {
    const DATA = data.Media;
    return (
      <div className="flex w-full flex-col" ref={divRef}>
        <div className="flex flex-col h-auto w-full ">
          <div className=" h-[25vh] md:h-[30vh] relative">
            <img
              src={
                DATA.bannerImage === null || ""
                  ? ImageNotFound
                  : DATA.bannerImage
              }
              alt={`Baner de ${DATA.title.romaji}`}
              className="w-full relative h-full -z-30 object-cover  "
            />
            <div className=" inset-0 absolute bg-gradient-to-t from-base-100  to-transparent"></div>
          </div>
          <div className="grid lg:grid-cols-2 gap-3 lg:p-10 ">
            <div
              data-element="Datos"
              className="flex flex-col  gap-1.5 lg:p-12  p-5 "
            >
              <h3 className=" text-4xl font-extrabold  ">
                {DATA.title.romaji}
              </h3>
              <div className="text-[11px] opacity-70 font-extralight mt-1.5 mb-1.5 gap-2 flex flex-re">
                <p>Year: {DATA.startDate.year}</p>
                <p>Romanji: {DATA.title.native}</p>
                <p>Score: {DATA.meanScore}</p>
                <p>Tp: {DATA.format}</p>
                <p>{DATA.isAdult ? "+18" : "+14"}</p>
              </div>

              <div className="flex gap-2.5">
                {DATA.type === TypesTy.MANGA ? (
                  <button
                    className="btn btn-wide "
                    onClick={() => {
                      if (
                        refEmbed.current &&
                        refEmbed instanceof HTMLEmbedElement
                      ) {
                        refEmbed.current.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                  >
                    <Icon icon="pixelarticons:edit" width="20" height="20" />{" "}
                    Leer
                  </button>
                ) : (
                  <button
                    className="btn btn-wide "
                    onClick={() => {
                      if (
                        refEmbed.current
                      ) {
                        refEmbed.current.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                  >
                    <Icon icon="pixelarticons:see" width="20" height="20" />{" "}
                    Ver
                  </button>
                )}

                <button
                  className="btn btn-xs md:btn-sm"
                  onClick={() => handleClickAdd(DATA)}
                >
                  <Icon icon="lucide:heart" width="18" height="18" />
                  Añadir a favoritos
                </button>
              </div>
              <p
                className="font-extralight text-sm mt-2"
                dangerouslySetInnerHTML={{ __html: DATA.description }}
              ></p>
            </div>
            <div className="flex items-center justify-center ">
              <img
                src={`${DATA.coverImage.large}`}
                alt=""
                className="rounded-2xl object-cover w-fit h-fit"
              />
            </div>
          </div>
          <div className="w-full lg:p-12  h-auto">
            {DATA.type === TypesTy.ANIME ? (
              <div className="w-full h-full p-3 md:p-7">
                <div className="flex justify-between items-center w-full">
                  <div className="mt-5 mb-5">
                    <p className=" text-[12px]">Episodio {state.count}</p>
                    <p className="mb-2 text-[20px]">{DATA.title.romaji}</p>
                    <button
                      onClick={() =>
                        dispatch({
                          type: ConteoDeAcciones.DECREMENT,
                          payload: 0,
                        })
                      }
                      className="btn  btn-xs md:btn-md"
                    >
                      <Icon
                        icon="lucide:arrow-left"
                        width="20"
                        height="20"
                      />
                      Episodio anterior
                    </button>
                    <div className="dropdown dropdown-hover ">
                      <div
                        tabIndex={0}
                        role="button"
                        className="btn  btn-xs md:btn-md m-1"
                      >
                        Episodios
                      </div>
                      <ul
                        tabIndex={0}
                        className="dropdown-content menu bg-base-100 rounded-box z-[1]  auto-rows-max w-[69vw] grid grid-cols-8 grid-rows-auto overflow-y-scroll h-[60vh] gap-1 p-2 shadow"
                      >
                        {Array.from({ length: DATA.episodes }, (_, i) => (
                          <li>
                            <button
                              className="btn  btn-xs md:btn-md"
                              onClick={() =>
                                dispatch({
                                  type: ConteoDeAcciones.REASIGNAR,
                                  payload: i + 1,
                                })
                              }
                            >
                              Ep {i + 1}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div>
                    <button
                      className="btn  btn-xs md:btn-md "
                      onClick={() => {
                        refEmbed.current?.scrollIntoView({
                          behavior: "smooth",
                        });
                        dispatch({
                          type: ConteoDeAcciones.INCREMENT,
                          payload: 0,
                        });
                      }}
                    >
                      Siguiente Episodio
                      <Icon
                        icon="lucide:arrow-right"
                        width="20"
                        height="20"
                      />
                    </button>
                  </div>
                </div>
                <div ref={refEmbed} className="aspect-video">
                  <embed
                    className="w-full h-[400px] md:h-[700px] aspect-[700px] rounded-2xl"
                    src={`https://vidsrc.cc/v2/embed/anime/ani${numeriId}/${state?.count}/sub?autoPlay=false`}
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 md:h-screen gap-12">
                <div className="w-full md:h-[80vh] " ref={refEmbed}>
                  <iframe
                    title={`Cuadro de ${DATA.title.english} `}
                    className="w-full h-[600px] lg:h-screen rounded-xl p-6"
                    src={`https://vidsrc.icu/embed/manga/${numeriId}/${state?.count}`}
                  ></iframe>
                </div>
                <div className=" lg:p-6 w-full lg:h-screen flex gap-4 flex-col p-5.5">
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
                          icon="lucide:arrow-left"
                          width="20"
                          height="20"
                        />
                        Anterior
                      </button>
                    </div>
                    <div>
                      <button
                        className="btn "
                        onClick={() =>
                          dispatch({
                            type: ConteoDeAcciones.INCREMENT,
                            payload: 0,
                          })
                        }
                      >
                        Siguiente
                        <Icon
                          icon="pixelarticons:arrow-right"
                          width="20"
                          height="20"
                        />
                      </button>
                    </div>
                  </div>
                  <div className="w-full">
                    <p className="font- text-[16px]">Capitulo {state.count}</p>
                  </div>
                  <p className="font-medium mb-2 overflow-hidden">
                    Episodios - Capitulos
                  </p>
                  <ol className="grid grid-cols-10 g gap-2 h-full overflow-y-scroll scroll-smooth grid-flow-row auto-rows-max  ">
                    <ArrayEpisodios
                      episodes={DATA.chapters}
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
