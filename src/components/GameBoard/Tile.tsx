type TileStatus = "correct" | "present" | "absent" | "empty"

type TileProps = {
    value?: string
    status?: TileStatus
}

export function Tile({ value = "", status = "empty" }: TileProps) {
    const base =
        "w-12 h-12 border-2 flex items-center justify-center text-xl font-bold uppercase transition"

    const statusStyles = {
        empty: "border-zinc-200/60",
        correct: "bg-green-500 text-white border-green-500",
        present: "bg-yellow-500 text-white border-yellow-500",
        absent: "bg-zinc-600 text-white border-zinc-600",
    }

    return (
        <div className={`${base} ${statusStyles[status]}`}>
            {value}
        </div>
    )
}
