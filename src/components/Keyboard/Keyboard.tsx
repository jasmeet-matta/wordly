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
    theme: "dark" | "light" | null
}

export function Keyboard({onKeyPress, letterStatuses, disableKeyboard, theme}: KeyboardProps) {
    const statusStyles = {
        correct: "bg-green-500 text-white",
        present: "bg-yellow-500 text-white",
        absent: "bg-zinc-600 text-white",
    }

    return (
        <div className="mt-5 space-y-2 w-full max-w-2xl">
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
                                    h-12 sm:h-16
                                    ${isSpecialKey ? "flex-[1.5]" : "flex-1"}
                                    rounded-md
                                    text-xs sm:text-sm font-bold
                                    transition
                                    ${status ? statusStyles[status] : "bg-muted hover:bg-primary/10"}
                                    ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}
                                    ${theme === "dark" && !status ? "text-white bg-zinc-500/80 hover:bg-white/50" : ""}
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
