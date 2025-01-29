import MangaList from "../Components/MangaList";
import { MangaPeticion } from "../Types/Manga";
import { GET_MANGA_LIST } from "../Request/RequestMangaList";
import { useQuery } from "@apollo/client";
import { Data } from "../Types/MangaList";
import Loading from "../Components/Loading";


export default function Home() {
  const {data,error,loading} = useQuery(GET_MANGA_LIST)
  if(loading) return <Loading/>
  if(error) return <div>Error</div>
  if (data) {
    const DATA: Data = data
    
    return(
    <div className=" w-full">
      <div className="h-[32vh] w-full flex flex-row  flex-grow-0 overflow-hidden ">
         {DATA.Page.media.map((item) => (
          <div className="w-full h-full flex-shrink-0 relative">
            <img src={item.bannerImage} alt="" className="w-full h-full object-cover relative" />
            <div className="absolute flex-col bg-gradient-to-t flex items-end md:p-12 p-6  from-base-100 via-transparent to-base-100 inset-0">
              <h3 className="text-xl font-medium">{item.title.english}</h3>
              <h2>{item.title.native}</h2>
            </div>
            
          </div>
         ))}
      </div>
      <MangaList query={"Goku"} />
    </div>
    )
  }

}
