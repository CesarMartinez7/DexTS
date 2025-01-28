import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import Loading from "../Components/Loading";
import { MangaPeticion } from "../Types/Manga";
import React, { useReducer } from "react";
import { GET_DATA_MANGA } from "../Request/Request1";

enum ConteoDeAcciones {
  INCREMENT = "INCREMENT",
  DECREMENT = "DECREMENT",
  REASIGNAR = "REASIGNAR",
}

interface CountAction {
  type: ConteoDeAcciones;
  payload: number;
}

interface CountState {
  count: number;
}

function reducer(state: CountState, action: CountAction) {
  const { type, payload } = action;
  switch (type) {
    case ConteoDeAcciones.INCREMENT:
      return { count: state.count + 1 };
    case ConteoDeAcciones.DECREMENT:
      return { count: state.count - 1 };
    case ConteoDeAcciones.REASIGNAR:
      return { count: payload };
  }
}

type PropsArrayEpisodios = {
  episodios: number
  dispatch : React.Dispatch<CountAction>
}


const ArrayEpisodios = ({episodios,dispatch} : PropsArrayEpisodios) => {
  return(
    <>
    {Array.from({ length: episodios }, (_, i) => (
      <button
        className="btn btn-dash"
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
  )
}

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
            <p className="font-light">{DATA.type}</p>

            {DATA.type === "ANIME" ? (
              <div className="w-full h-full p-8">
                <embed
                  className="w-full h-[600px]"
                  src={`https://vidsrc.cc/v2/embed/anime/ani${id}/${state?.count}/sub?autoPlay=false`}
                />
              </div>
            ) : (
              <div className="grid grid-cols-2">
                <div className="w-full">
                  <iframe
                    className="w-full h-screen"
                    src={`https://vidsrc.icu/embed/manga/${id}/${state?.count}`}
                    frameBorder="0"
                  ></iframe>
                </div>
                <div className="p-12">
                  <div>
                    <p className="font-extralight text-[14px]">Capitulo {state.count}</p>
                    <h3 className="font-medium text-2xl">{DATA.title.english}</h3>
                  </div>
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
                        Anterior
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
                        Siguiente
                      </button>
                    </div>
                  </div>
                  <p className="font-medium mb-2">Episodios - Capitulos</p>
                  <ol className="grid grid-cols-10 gap-2 ">
                    <ArrayEpisodios episodios={DATA.chapters} dispatch={dispatch}></ArrayEpisodios>
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
