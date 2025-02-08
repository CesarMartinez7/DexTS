
// Estas son las interfaces y tipos utilizados en la Pagina o Route de Manga para la peticion de los datos

import { Format } from "./MangaList";


export type Tags = {
    name: string;
    description: string;
}


export const enum TypesTy {
    MANGA = "MANGA",
    ANIME = "ANIME",
}


export interface MangaPeticion {
    bannerImage: string;
    id: number;
    idMal: number;
    title: {
        romaji: string;
        english: string;
        native: string
    }
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
    coverImage: {
        extraLarge: string;
        large: string;
        medium: string;
        color: string
    }
    genres: string[]
    tags: Array<Tags>
}