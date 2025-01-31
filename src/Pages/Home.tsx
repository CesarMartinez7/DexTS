import { useState, useEffect } from "react";
import MangaList from "../Components/MangaList";
import { GET_MANGA_LIST } from "../Request/RequestMangaList";
import { useQuery } from "@apollo/client";
import { Data } from "../Types/MangaList";
import Loading from "../Components/Loading";

export default function Home() {
  const { data, error, loading } = useQuery(GET_MANGA_LIST);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Función para mover al siguiente elemento
  const nextSlide = () => {
    if (data) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % data.Page.media.length);
    }
  };


  useEffect(() => {
    const interval = setInterval(nextSlide, 3000); 
    return () => clearInterval(interval); 
  }, [data]); 

  if (loading) return <Loading />;
  if (error) return <div>Error</div>;
  if (data) {
    const DATA: Data = data;

    return (
      <div className="w-full">
        <div className="h-[32vh] w-full flex flex-row flex-grow-0 overflow-hidden relative">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {DATA.Page.media.map((item, index) => (
              <div key={index} className="w-full h-full flex-shrink-0 relative">
                <img
                  src={item.bannerImage}
                  alt=""
                  className="w-full h-full object-cover relative"
                />
                <div className="absolute flex-col bg-gradient-to-t flex items-end md:p-12 p-6 from-base-100 via-transparent to-base-100 inset-0">
                  <h3 className="text-xl font-medium">{item.title.english}</h3>
                  <h2>{item.title.native}</h2>
                  <p>{item.chapters}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <MangaList query={"Evangelion"} />
        
      </div>
    );
  }
}