
// Estas son las interfaces y tipos utilizados en la Pagina o Route de Manga para la peticion de los datos

import { Format } from "./MangaList";


export interface Response {
    data:          Data;
    loading:       boolean;
    networkStatus: number;
}

export interface Data {
    Media: Media;
}


export type Tags = {
    name: string;
    description: string;
}


export const enum TypesTy {
    MANGA = "MANGA",
    ANIME = "ANIME",
}


export interface Media {
    bannerImage: string;
    id: number;
    idMal: number;
    title: Title
    type: TypesTy
    format: Format;
    status: string;
    description: string;
    startDate : {
        year: number;
    };
    episodes: number;
    chapters: number;
    isAdult: boolean;
    meanScore: number;
    averageScore: number;
    duration: number
    coverImage: CoverImage
    genres: string[]
    tags: Array<Tags>
}



export interface CoverImage {
    extraLarge: string;
    large:      string;
    medium:     string;
    color:      string;
    __typename: string;
}



export interface Title {
    romaji:     string;
    english:    string;
    native:     string;
    __typename: string;
}