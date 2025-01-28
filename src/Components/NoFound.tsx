interface PropsNotFound {
    text: string
}

export default function NotFound ({text}: PropsNotFound)  {
    return(
        <main className="flex justify-center items-center h-full">
            <h3 className="text-2xl">{text}</h3>
        </main>
    )
}