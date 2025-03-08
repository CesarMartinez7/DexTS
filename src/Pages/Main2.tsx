import {  useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_MANGA_LIST } from "../Request/RequestMangaList";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Data } from "../Types/MangaList";



export default function Main2() {

    // const div = useRef<HTMLDivElement>(null)
    const [isManga,setIsManga] = useState<boolean>(false)

    const { loading, error, data } = useQuery(GET_MANGA_LIST, {
        variables: {
            page: 1,
            perPage: 20,
            search: "dragon",
            type:  !isManga ? "ANIME" :"MANGA",
        },
    });

    if (loading) {
        return <div>Cargando</div>;
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
                        <button className="btn btn-circle" title="to-left" >
                            <Icon icon="lucide:chevron-left" width="24" height="24" />
                        </button>
                    </div>
                    <div className="flex gap-2 relative w-full overflow-auto snap-x gradient-mask mask1">
                        {DATA.Page.media.map((i) => (
                            <div className="flex-shrink-0 relative snap-start scroll-ml-6 " key={i.id}>
                                <img
                                    alt={`Imagen de ${i.title}`}
                                    src={i.coverImage.large}
                                    className="h-full w-fit max-h-fit flex-shrink-0 relative rounded-md"
                                />
                            </div>
                        ))}
                    </div>
                    <div className="p-4">
                        <button className="btn btn-circle" title="to-left">
                            <Icon icon="lucide:chevron-right" width="24" height="24" />
                        </button>
                    </div>
                </div>
                <div
                    aria-label="controls-flex-controls"
                    className="grid grid-cols-[auto_1fr_auto] place-content-center items-center"
                >
                    <div className="p-4">
                        <button className="btn btn-circle" title="to-left">
                            <Icon icon="lucide:chevron-left" width="24" height="24" />
                        </button>
                    </div>
                    <div className="flex gap-2 relative w-full overflow-scroll snap-x gradient-mask mask1">
                        {DATA.Page.media.map((i) => (
                            <div className="flex-shrink-0 relative snap-start scroll-ml-6" key={i.id}>
                                <img
                                    alt={`Imagen de ${i.title}`}
                                    src={i.coverImage.large}
                                    className="h-full w-full flex-shrink-0 relative rounded-md"
                                />
                            </div>
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
