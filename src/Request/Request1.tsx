import { gql } from "@apollo/client";

// Se utiliza en el router o componente de informacion para los datos de los mangas o anime.


export const GET_DATA_MANGA = gql`
  query ($id: Int, $type: MediaType) {
    # Define which variables will be used in the query (id)
    Media(id: $id, type: $type) {
      # Insert our variables into the query arguments (id) (type: ANIME is hard-coded in the query)
      id
      title {
        romaji
        english
        native
      }
      idMal
      type
      format
      status
      description
      startDate {
        year
      }
      episodes
      chapters
      coverImage {
        extraLarge
        large
        medium
        color
      }
      bannerImage
      volumes
      genres
      isAdult
      meanScore
      averageScore
      duration
      tags {
        name
        description
      }
    }
  }
`;