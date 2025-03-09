import { useState, useEffect, useRef } from "react";
import { useQuery } from "@apollo/client";
import { GET_MANGA_LIST } from "../Request/RequestMangaList";
import Loading from "../Components/Loading";
import NotFound from "../Components/NoFound";
import MangaList from "../Components/MangaList";
import { Icon } from "@iconify/react";
import { Data } from "../Types/MangaList";
import { Media } from "../Types/MangaList";
import { useNavigate } from "react-router-dom";


export default function Home() {
  const { data, error, loading } = useQuery(GET_MANGA_LIST);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const navigate = useNavigate();

  // Refs para scroll
  const scrollContainer = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (data) {
      const interval = setInterval(() => {
        nextSlide();
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [data]);

  const nextSlide = () => {
    if (!data?.Page?.media?.length) return;

    setCurrentIndex((prev) => {
      const nextIndex = (prev + 1) % data.Page.media.length;
      scrollToItem(nextIndex);
      return nextIndex;
    });
  };

  const prevSlide = () => {
    if (!data?.Page?.media?.length) return;

    setCurrentIndex((prev) => {
      const nextIndex = prev === 0 ? data.Page.media.length - 1 : prev - 1;
      scrollToItem(nextIndex);
      return nextIndex;
    });
  };

  // Función para hacer scroll hacia el elemento actual
  const scrollToItem = (index: number) => {
    if (itemRefs.current[index]) {
      itemRefs.current[index]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  };

  if (loading) return <Loading />;
  if (error) return <NotFound text="Error al traer los datos" />;

  if (data) {
    const DATA: Data = data;
    return (
      <div className="w-full content">
        {/* Sección del Slider */}
        <div className="h-[65vh] w-full flex overflow-hidden relative">
          <div
            className="flex transition-transform duration-500 ease-in-out "
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {DATA.Page.media.map((item, index) => (
              <div
                key={index}
                className="w-full h-full flex-shrink-0 relative "
              >
                <div className="absolute bg-black/70 inset-0 flex flex-col justify-end  md:p-20 p-4">
                <div className="flex text-sm gap-2.5 items-center">
                    <p className="text-xs">{item.isAdult ? "+18" : "+14"}</p>

                    <p>{item.format}</p>

                    <p>{item.episodes}</p>

                    <p className="flex flex-row gap-1 items-center">
                      {" "}
                      <Icon icon="pixelarticons:heart" width="14" height="14" />
                      {item.favourites}
                    </p>


                  </div>
                  {item.title.english ? (
                    <h4 className="font-semibold text-3xl">
                      {item.title.english}
                    </h4>
                  ) : (
                    <h4 className="text-3xl font-semibold">
                      {item.title.romaji}
                    </h4>
                  )}
                  
                  <p
                    className="text-sm w-full mt-2 md:w-2/4"
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  ></p>
                </div>
                <img
                  src={item.bannerImage || "/imagent.svg"}
                  alt={`Imagen de ${item.title.english || item.title.native}`}
                  className="w-full h-full object-cover  "
                />
              </div>
            ))}
          </div>
        </div>

        {/* Sección de miniaturas con Scroll */}
        <div className="grid grid-cols-[auto_1fr_auto] place-content-center items-center mt-4">
          {/* Botón Izquierdo */}
          <div className="p-4">
            <button
              className="btn btn-circle"
              onClick={prevSlide}
              title="button-to-left"
            >
              <Icon icon="lucide:chevron-left" width="24" height="24" />
            </button>
          </div>
          {/* Contenedor scrollable */}
          <div
            ref={scrollContainer}
            className="flex gap-2 w-full mask1 items-center h-[200px] overflow-hidden scroll-smooth snap-x"
          >
            {data.Page.media.map((item: Media, index: number) => (
              <div
                key={item.id}
                ref={(el) => (itemRefs.current[index] = el)}
                className={`snap-center cursor-pointer flex-shrink-0 w-[130px] h-[160px]`}
                onClick={() => navigate(`/manga/${item.id}`)}
                title={`See now ${item.title.english}`}
              >
                <img
                  src={item.coverImage.large}
                  alt={`Imagen de ${item.title.english || item.title.native}`}
                  className={`rounded-md w-full h-full transition-all duration-150   ${currentIndex === index ? "rounded-2xl scale-110 z-20 " : "grayscale-50 mask2"} `}
                />
              </div>
            ))}
          </div>

          {/* Botón Derecho */}
          <div className="p-4">
            <button
              className="btn btn-circle"
              onClick={nextSlide}
              title="button-to-right"
            >
              <Icon icon="lucide:chevron-right" width="24" height="24" />
            </button>
          </div>
        </div>

        <MangaList query={"Evangelion"} />
      </div>
    );
  }
}
