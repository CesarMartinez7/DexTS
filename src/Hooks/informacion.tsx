import React, { RefObject } from "react";
import { MangaPeticion } from "../Types/Manga";
import {CountAction,ConteoDeAcciones} from "../Types/MangaReducer"
import { useParams } from "react-router-dom";
import { useRef } from "react";


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
    handleClickAdd : (DATA: MangaPeticion) => void
    numeriId: number
    refEmbed: RefObject<HTMLDivElement>
}



export default function HookInformacion () : ReturningHook {
    const refEmbed = useRef<HTMLDivElement>(null)
    const  {id} = useParams()
    const numeriId = id ? parseInt(id) : 0
    const handleClickAdd = (DATA: MangaPeticion)  => {
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

  
  return {handleClickAdd,numeriId,refEmbed}
    
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
