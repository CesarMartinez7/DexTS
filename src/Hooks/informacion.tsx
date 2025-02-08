import React, { RefObject } from "react";
import { Media } from "../Types/Manga";
import {CountAction,ConteoDeAcciones} from "../Types/MangaReducer"
import { useParams } from "react-router-dom";
import { useRef } from "react";
import { GET_DATA_MANGA } from "../Request/Request1";
import { ApolloError, useQuery } from "@apollo/client";
import { Data } from "../Types/Manga";

export type NewData = {
    nameEnglish: string;
    nameRomaji: string;
    id: number;
    image: string;
    type: string;
    episodios: unknown;
    descripcion: string;
  };


type ReturningHook = {
    handleClickAdd : (DATA: Media) => void
    numeriId: number
    refEmbed: RefObject<HTMLDivElement>
    loading: boolean
    error: ApolloError | undefined  
    data : Data
}



export default function HookInformacion () : ReturningHook {
    const refEmbed = useRef<HTMLDivElement>(null)
    const  {id} = useParams()
    const numeriId = id ? parseInt(id) : 0
    const { loading, error, data } = useQuery(GET_DATA_MANGA, {
        variables: {
          id: numeriId,
        },
      });
    const handleClickAdd = (DATA: Media)  => {
    const oldData: [] = JSON.parse(localStorage.getItem("favorites") || "[]");
    const ObjectData: NewData = {
      nameEnglish: DATA.title.english,
      nameRomaji: DATA.title.romaji,
      id: DATA.id,
      image: DATA.bannerImage,
      type: DATA.type,
      episodios: DATA.episodes,
      descripcion: DATA.description,
    }

    const existe = oldData.find(
      (producto: NewData) => producto.id === ObjectData.id
    );
    if (existe) window.alert("Ya lo añadistes anteriormente.");
    else {
      const newArrayData = [...oldData, ObjectData];
      localStorage.setItem("favorites", JSON.stringify(newArrayData));
    }
  };

  
  return {handleClickAdd,numeriId,refEmbed,loading,error,data}
    
}

















type PropsArrayEpisodios = {
  episodes: number;
  dispatch: React.Dispatch<CountAction>;
};


export const ArrayEpisodios = ({ episodes, dispatch }: PropsArrayEpisodios) => {
  return (
    <>
      {Array.from({ length: episodes }, (_, i) => (
        <button
          key={crypto.randomUUID()}
          className={`btn btn-active `}
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
