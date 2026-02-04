const ROWS = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "⌫"]
]
type LetterStatus = "correct" | "present" | "absent"
type KeyboardProps = {
    onKeyPress: (key: string) => void
    letterStatuses: Record<string, LetterStatus>
    disableKeyboard: boolean
}

export function Keyboard({onKeyPress, letterStatuses, disableKeyboard}: KeyboardProps) {
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
                    className="flex w-full gap-2 px-1"
                >
                    {row.map((key) => {
                        const status = letterStatuses[key]
                        const isDisabled = status === "absent" || disableKeyboard
                        const isSpecialKey = key === "ENTER" || key === "⌫"

                        return (
                            <button
                                key={key}
                                disabled={isDisabled}
                                onClick={() => {
                                    if (isDisabled) return
                                    onKeyPress(key)
                                }}
                                className={`
                                    h-12
                                    ${isSpecialKey ? "flex-[1.5]" : "flex-1"}
                                    rounded-md
                                    text-xs font-bold
                                    transition
                                    ${status ? statusStyles[status] : "bg-muted hover:bg-primary/10"}
                                    ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}
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
