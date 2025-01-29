
// Estas son las interfaces y tipos utilizados en la Pagina o Route de Manga para la peticion de los datos
export type Tags = {
    name: string;
    description: string;
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
    type: "MANGA" | "ANIME"
    format: string;
    status: string;
    description: string;
    startDate : {
        year: number;
    }
    episodios: unknown;
    chapters: number;
    coverImage: {
        extraLarge: string;
        large: string;
        medium: string;
        color: string
    }
    genres: string[]
    tags: Array<Tags>
}