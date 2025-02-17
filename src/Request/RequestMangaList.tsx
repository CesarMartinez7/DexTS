import { gql } from "@apollo/client";


// Manga list request

export const GET_MANGA_LIST = gql`
  query GetMedia($page: Int, $perPage: Int, $search: String, $type: MediaType) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        currentPage
        hasNextPage
        perPage
      }
      media(search: $search, type: $type) {
        id
        title {
          romaji
          english
          native
          userPreferred
        }
        chapters
        format
        duration
        favourites
        popularity
        description
        meanScore
        endDate {
          year
        }
        episodes
        genres
        isAdult
        description
        coverImage {
          medium
          large
        }
        bannerImage
      }
    }
  }
`;