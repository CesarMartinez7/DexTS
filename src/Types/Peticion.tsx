

export interface Page{
    
}



export interface Manga {
    id: number;
    title: {
        romaji: string
        english: string
        native: string
        userPreferred: string
    }
    chapters: number
    genres: string[]
    description: string
    coverImage: {
        medium: string
        large: string
    }
    bannerImage: string
}