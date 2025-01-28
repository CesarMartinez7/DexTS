import { gql } from "@apollo/client";


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
        genres
        description
        coverImage {
          medium
        }
        bannerImage
      }
    }
  }
`;