import { useState, useEffect } from "react";
import MangaList from "../Components/MangaList";
import { GET_MANGA_LIST } from "../Request/RequestMangaList";
import { useQuery } from "@apollo/client";
import { Data } from "../Types/MangaList";
import Loading from "../Components/Loading";
import ImageNoFound from "../../public/imagent.svg";
import { Icon } from "@iconify/react/dist/iconify.js";
import NotFound from "../Components/NoFound";

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
  if (error) return <NotFound text="Error al traer los datos"></NotFound>;
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
                  src={
                    item.bannerImage === null ? ImageNoFound : item.bannerImage
                  }
                  alt={`Imagen de ${item.title.english}`}
                  className="w-full h-full object-cover relative"
                />
                <div className="absolute flex-col bg-gradient-to-t flex items-end md:p-12 p-6 from-base-100 via-transparent to-base-100 inset-0">
                  <h2 className="font-extralight text-xs">
                    {item.title.native}
                  </h2>
                  <h3 className="text-2xl font-medium">{item.title.english}</h3>
                  <div className="flex flex-row gap-2.5 text-xs font-light mt-0.5">
                    <p className="text-xs">{item.isAdult ? "+18" : "+14"}</p>
                    <p>{item.format}</p>
                    <p>Episodios {item.episodes}</p>
                    <p className="flex flex-row gap-1 items-center">
                      {" "}
                      <Icon icon="pixelarticons:heart" width="14" height="14"  />
                      {item.favourites}
                    </p>
                    <p className="flex items-center">
                      {" "}
                      <Icon
                        icon="pixelarticons:chart-bar"
                        width="14"
                        height="14"
                      />{" "}
                      {item.popularity}
                    </p>
                  </div>
                  {/* <div className="overflow-hidden text-xs h-[50%] w-[100%] md:w-[50%] mt-2">
                    <p
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    ></p>
                  </div> */}
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
