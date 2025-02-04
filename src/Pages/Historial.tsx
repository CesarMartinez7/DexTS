import { useEffect, useState } from "react"

interface Peticion {
    name: string;
    id: number;
    image: string;
    type: string;
    episodios: number
}



export default function Favorites(){
    const [data,setData] = useState<Peticion[]>([])

    useEffect(() => {
        const local: string | null = localStorage.getItem("favorites") 
        if(local){   
            const localStorageData  = JSON.parse(local)
            setData(localStorageData)
        }else{
            console.log("error")
        }
    },[])

    if (data.length === 0) return <div><h1>No hay registros</h1></div>
    return (
        <div className="h-screen">
            <ul className="grid grid-cols-2 xl:grid-cols-8 p-12 gap-2.5">
                {data.map((item) => (
                    <div className="card bg-base-100 image-full  shadow-sm">
                    <figure>
                      <img
                        src={item.image}
                        alt="Shoes" />
                    </figure>
                    <div className="card-body">
                      <h2 className="card-title">Card Title</h2>
                      <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                      <div className="card-actions justify-end">
                        <button className="btn btn-primary">Buy Now</button>
                      </div>
                    </div>
                  </div>
                ))}
            </ul>
        </div>
    )
}