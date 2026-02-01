const ROWS = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "⌫"]
]

type KeyboardProps = {
    onKeyPress: (key: string) => void
}

export function Keyboard({ onKeyPress }: KeyboardProps) {

    return (
        <div className="mt-5 space-y-2">
            {ROWS.map((row, rowIndex) => (
                <div
                    key={rowIndex}
                    className="flex justify-center gap-2"
                >
                    {row.map((key) => (
                        <button
                            key={key}
                            onClick={() => onKeyPress(key)}
                            className={`
                                h-12
                                ${key === "ENTER" ? "min-w-[4rem]" : "min-w-[2.5rem]"}
                                px-2
                                rounded-md
                                bg-muted
                                text-sm font-semibold
                                hover:bg-primary/10
                                transition
                            `}
                        >
                            {key}
                        </button>
                    ))}
                </div>
            ))}
        </div>
    )
}
