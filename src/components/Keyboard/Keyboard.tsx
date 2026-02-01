const ROWS = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "⌫"]
]
type LetterStatus = "correct" | "present" | "absent"
type KeyboardProps = {
    onKeyPress: (key: string) => void
    letterStatuses: Record<string, LetterStatus>
}

export function Keyboard({onKeyPress, letterStatuses}: KeyboardProps) {
    const statusStyles = {
        correct: "bg-green-500 text-white",
        present: "bg-yellow-500 text-white",
        absent: "bg-zinc-600 text-white",
    }

    return (
        <div className="mt-5 space-y-2">
            {ROWS.map((row, rowIndex) => (
                <div
                    key={rowIndex}
                    className="flex justify-center gap-2"
                >
                    {row.map((key) => {
                        const status = letterStatuses[key]

                        return (
                            <button
                                key={key}
                                onClick={() => onKeyPress(key)}
                                className={`
                                h-12
                                ${key === "ENTER" ? "min-w-[4rem]" : "min-w-[2.5rem]"}
                                px-2
                                rounded-md
                                ${status ? statusStyles[status] : "bg-muted"}
                                text-sm font-semibold
                                ${status ? statusStyles[status] : "bg-muted hover:bg-primary/10"}
                                transition
                            `}
                            >
                                {key}
                            </button>
                        )
                    })}
                </div>
            ))}
        </div>
    )
}
