import {Tile} from "./Tile"
import {getRowStatuses} from "@/utils/getRowStatuses"

type GameBoardProps = {
    guesses: string[]
    currentGuess: string
    wordLength: number
    maxGuesses: number
    targetWord: string
    theme: string
}

export function GameBoard({
                              guesses,
                              currentGuess,
                              wordLength,
                              maxGuesses,
                              targetWord,
                              theme,
                          }: GameBoardProps) {
    return (
        <div className="grid gap-2">
            {Array.from({length: maxGuesses}).map((_, rowIndex) => {
                const guess = guesses[rowIndex] ?? ""
                const isCurrentRow = rowIndex === guesses.length

                return (
                    <div key={rowIndex} className="flex gap-2 justify-center">
                        {Array.from({length: wordLength}).map((_, colIndex) => {
                            const letter =
                                isCurrentRow
                                    ? currentGuess[colIndex] ?? ""
                                    : guess[colIndex] ?? ""

                            const isSubmittedRow = rowIndex < guesses.length
                            const statuses = isSubmittedRow
                                ? getRowStatuses(guess, targetWord)
                                : []

                            return <Tile
                                key={colIndex}
                                value={letter}
                                status={statuses[colIndex] ?? "empty"}
                                theme={theme}
                            />

                        })}
                    </div>
                )
            })}
        </div>
    )
}
