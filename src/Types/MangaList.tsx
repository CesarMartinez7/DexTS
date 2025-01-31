


// Estas son las interfaces y tipos de las peticiones hechas en Mangalist.tsx 

export interface Welcome {
    data: Data;
    currentPage: number
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>
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
    chapters: number
    isAdult: boolean
    genres: string[]
    description: string
    coverImage: {
        medium: string
        large: string
    }
    bannerImage: string
}