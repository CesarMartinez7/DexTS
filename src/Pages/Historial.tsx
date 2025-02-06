import { useEffect, useState } from "react"
import NotFound from "../Components/NoFound";
import { Link} from "react-router-dom";
import imageNoFound from "../../public/imagent.svg"

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

    // useEffect(() => {
    //     const local = localStorage.getItem("favorites") 
    //     if(local){   
    //         const localStorageData  = JSON.parse(local)
    //         setData(localStorageData)
    //     }else{
    //         console.log("error")
    //     }
    // },[data])

    if (data.length === 0) return <NotFound text="No hay registros"/>
    return (
        <div className="w-full p-12 flex flex-col gap-2.5">
            <button className="btn" onClick={() => {
                localStorage.setItem("favorites","[]")
            }}>Vaciar favoritos</button>
            <div className="grid grid-cols-2 gap-3.5 md:grid-cols-4">
                {data.map((item) => (
                    <Link className="card image-full shadow-sm " to={`/manga/${item.id}`}>
                    <figure>
                      <img
                        src={item.image === null ?imageNoFound : item.image  }
                        alt={item.nameRomanji} />
                    </figure>
                    <div className="card-body">
                      <h2 className="card-title font-medium">{item.nameEnglish} {item.nameRomanji}</h2>
                      <p className="font-light">{item.descripcion}</p>
                    </div>
                  </Link>
                ))}
            </div>
        </div>
    )
}