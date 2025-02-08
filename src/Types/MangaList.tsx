


// Estas son las interfaces y tipos de las peticiones hechas en Mangalist.tsx 

export interface Welcome {
    data: Data;
    currentPage: number
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}


export const enum Format {
    TV,
    TV_SHORT,
    MOVIE,
    SPECIAL,
    OVA,
    MANGA,
    ONA,
    MUSIC,
    NOVEL,
    ONE_SHOT
}

export interface Data {
    Page: Page
}

export interface PageInfo {
    currentPage: number;
    hasNextPage: boolean;
    perPage:     number;
}



export interface Page{
    pageInfo: PageInfo
    media: Array<Media>
}



export interface Media {
    id: number;
    title: {
        romaji: string
        english: string
        native: string
        userPreferred: string
    }
    episodes: number
    chapters: number
    isAdult: boolean
    favourites: number
    popularity: number
    MeanScore: number;
    endDate : {
        year: string
    }
    duration: number
    format: Format
    genres: string[]
    description: string
    coverImage: {
        medium: string
        large: string
    }
    bannerImage: string
}