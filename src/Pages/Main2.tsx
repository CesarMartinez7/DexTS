import {  useState, useRef } from "react";
import { useQuery } from "@apollo/client";
import { GET_MANGA_LIST } from "../Request/RequestMangaList";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Data } from "../Types/MangaList";
import { Link } from "react-router-dom";
import Loading from "../Components/Loading";



export default function Main2() {

    const div = useRef<HTMLDivElement>(null)
    const [isManga,setIsManga] = useState<boolean>(false)

    const { loading, error, data } = useQuery(GET_MANGA_LIST, {
        variables: {
            page: 1,
            perPage: 20,
            search: "goku",
            type:  !isManga ? "ANIME" :"MANGA",
        },
    });

    if (loading) {
        return <Loading/>
    }

    if (error) {
        return <div>Error</div>;
    }

    if (data) {
        const DATA: Data = data;
        console.log(DATA);
        return (
            <main className="min-h-svh w-screen md:px-20 p-2 overflow-hidden flex flex-col gap-8">
                <div>
                    <p>Filtros</p>
                    <button className="btn" onClick={() => setIsManga(!isManga)}>Manga</button>
                </div>
                <div
                    aria-label="controls-flex-controls"
                    className="grid grid-cols-[auto_1fr_auto] place-content-center items-center"
                >
                    <div className="p-4">
                        <button className="btn btn-circle" title="to-left" onClick={() => div.current?.scrollBy({left: - 200})} >
                            <Icon icon="lucide:chevron-left" width="24" height="24" />
                        </button>
                    </div>
                    <div className="flex gap-2 relative w-full overflow-hidden snap-x gradient-mask mask1" ref={div}>
                        {DATA.Page.media.map((i) => (
                            <Link to={`/manga/${i.id}`} className="flex-shrink-0 relative snap-start scroll-ml-6 " key={i.id}>
                                <img
                                    alt={`Imagen de ${i.title}`}
                                    src={i.coverImage.large}
                                    className=" h-[290px] w-[200px]  flex-shrink-0 relative rounded-md"
                                />
                            </Link>
                        ))}
                    </div>
                    <div className="p-4">
                        <button className="btn btn-circle" title="to-left" onClick={() => div.current?.scrollBy({left: 200})}>
                            <Icon icon="lucide:chevron-right" width="24" height="24" />
                        </button>
                    </div>
                </div>
                <div
                    aria-label="controls-flex-controls"
                    className="grid grid-cols-[auto_1fr_auto] place-content-center items-center"
                >
                    <div className="p-4">
                        <button className="btn btn-circle" title="to-left" onClick={() => div.current?.scrollBy({left: - 200})} >
                            <Icon icon="lucide:chevron-left" width="24" height="24" />
                        </button>
                    </div>
                    <div className="flex gap-2 relative w-full overflow-hidden snap-x gradient-mask mask1">
                        {DATA.Page.media.map((i) => (
                            <Link to={`/manga/${i.id}`} className="flex-shrink-0 relative snap-start scroll-ml-6" key={i.id}>
                                <img
                                    alt={`Imagen de ${i.title}`}
                                    src={i.coverImage.large}
                                    className="h-[290px] w-[200px] flex-shrink-0 relative rounded-md"
                                />
                            </Link>
                        ))}
                    </div>
                    <div className="p-4">
                        <button className="btn btn-circle" title="to-left">
                            <Icon icon="lucide:chevron-right" width="24" height="24" />
                        </button>
                    </div>
                </div>
            </main>
        );
    }
    return null;
}
