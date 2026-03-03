import {useState, useEffect, useRef} from 'react';

type TileStatus = "correct" | "present" | "absent" | "empty"

type TileProps = {
    value?: string
    status?: TileStatus
    theme?: string | null
}

export function Tile({ value = "", status = "empty", theme = "" }: TileProps) {
    const base = "w-12 h-12 sm:w-16 sm:h-16 border-2 flex items-center justify-center text-xl sm:text-2xl font-bold uppercase transition transition-transform duration-200 ease-in-out";
    const [isPopping, setPopping] = useState(false);
    const previousValue = useRef<string | null>(value)

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout> | undefined
        if (status === "empty" && previousValue.current === "" && value !== ""){
            queueMicrotask(() => setPopping(true))
            timer = setTimeout(() => setPopping(false), 100);
        }
        previousValue.current = value;
        if (timer) {
            return () => clearTimeout(timer);
        }
    }, [value, status]);

    const statusStyles = {
        empty: "border-zinc-200/60",
        correct: "bg-green-500 text-white border-green-500",
        present: "bg-yellow-500 text-white border-yellow-500",
        absent: "bg-zinc-600 text-white border-zinc-600",
    }

    return (
        <div className={`
            ${base} ${statusStyles[status]} 
            ${theme === "dark" ? "text-white border-gray-600/50" : ""}
            ${isPopping ? "scale-110" : "scale-100"}
            `}>
            {value}
        </div>
    )
}
