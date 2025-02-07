import { useEffect, useState } from "react"
import NotFound from "../Components/NoFound";
import imageNoFound from "../../public/imagent.svg"
import { Icon } from "@iconify/react/dist/iconify.js";


interface Peticion {
    nameEnglish?: string | null ;
    nameRomanji?: string;
    id: number;
    image: string | null;
    type: string;
    episodios: number
    descripcion: string
}



export default function Favorites(){
    const [data,setData] = useState<Peticion[]>([])

    useEffect(() => {
        const local = localStorage.getItem("favorites") 
        if(local){   
            const localStorageData  = JSON.parse(local)
            setData(localStorageData)
            console.log(data)
        } else {
            console.log("error")
        }
    }, []) // Solo se ejecuta una vez cuando se monta el componente
    

    if (data.length === 0) return <NotFound text="Añade peliculas o animes favoritos a tu coleccion."></NotFound>
    return (
        <div className="w-full p-12 flex flex-col gap-2.5">
            <div>

            <button className="btn" onClick={() => {
                localStorage.setItem("favorites","[]")
            }}><Icon icon="pixelarticons:trash" width="24" height="24" /> Vaciar favoritos</button>
            </div>
            <div className="grid grid-cols-2 gap-3.5 md:grid-cols-4">
                {data.map((item) => (
                    <a className="card image-full shadow-sm z-20 " href={`manga/${item.id} `} key={item.id}>
                    <figure>
                      <img
                        src={item.image === null ?imageNoFound : item.image  }
                        alt={item.nameRomanji} />
                    </figure>
                    <div className="card-body">
                      <h2 className="card-title font-medium">{item.nameEnglish} {item.nameRomanji}</h2>
                      <p className="font-light">{item.descripcion}</p>
                    </div>
                  </a>
                ))}
            </div>
        </div>
    )
}