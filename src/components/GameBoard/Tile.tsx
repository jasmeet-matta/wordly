type TileStatus = "correct" | "present" | "absent" | "empty"

type TileProps = {
    value?: string
    status?: TileStatus
    theme?: string | null
}

export function Tile({ value = "", status = "empty", theme = "" }: TileProps) {
    const base =
        "w-14 h-14 sm:w-14 sm:h-14 border-2 flex items-center justify-center text-2xl sm:text-2xl font-bold uppercase transition"

    const statusStyles = {
        empty: "border-zinc-200/60",
        correct: "bg-green-500 text-white border-green-500",
        present: "bg-yellow-500 text-white border-yellow-500",
        absent: "bg-zinc-600 text-white border-zinc-600",
    }

    return (
        <div className={`${base} ${statusStyles[status]} ${theme === "dark" ? "text-white border-gray-600/50" : ""}`}>
            {value}
        </div>
    )
}
