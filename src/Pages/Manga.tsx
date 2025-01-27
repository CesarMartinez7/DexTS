import { useParams } from "react-router-dom";
import { useQuery , gql} from "@apollo/client";
import { useState } from "react";
import Loading from "../Components/Loading";
import { MangaPeticion } from "../Types/Manga";


const GET_DATA_MANGA = gql`
 query ($id: Int, $type: MediaType) { # Define which variables will be used in the query (id)
  Media (id: $id,type: $type ) { # Insert our variables into the query arguments (id) (type: ANIME is hard-coded in the query)
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
    volumes
    genres
    tags {
      name
      description
    }
  }
}

`  


export default function Manga() {
  const {id} = useParams();
  const [episodio, setEpisodio] = useState<number>(1);
  const numeriId = id ? parseInt(id) : 0
  const {loading,error,data} = useQuery(GET_DATA_MANGA,{
    variables: {
      id: numeriId
    }
  })
  
  if(loading) return <Loading/>
  if(error) return <div>Error</div>


  if(data) {
    const DATA: MangaPeticion = data.Media
    console.log(DATA.id)
    return (
      <div className="flex">
      <div className="flex flex-col justify-center items-center h-screen w-full">
        <h1>Estas leyendo {DATA.title.romaji} </h1>
        <div className="flex justify-between items-center w-[800px]">
          <div>
            <button onClick={() => setEpisodio((e) => e - 1)} className="btn">
              Anterior
            </button>
          </div>
          <div>
            <button className="btn" onClick={() => setEpisodio((e) => e + 1)}>
              Siguiente
            </button>
          </div>
        </div>
        <iframe
          width={"800px"}
          height={"700px"}
          src={`https://vidsrc.icu/embed/manga/${id}/${episodio}`}
          frameBorder="0"
        ></iframe>
      </div>
      </div>
    );
  }



  
}
