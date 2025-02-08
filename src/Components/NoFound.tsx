interface PropsNotFound {
    text: string
}

export default function NotFound ({text}: PropsNotFound)  {
    return(
        <main className="flex justify-center p-3 items-center h-full h-screen">
            <h3 className="text-2xl text-center">{text}</h3>
        </main>
    )
}