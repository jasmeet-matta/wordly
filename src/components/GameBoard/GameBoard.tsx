import {Tile} from "./Tile"
import {getRowStatuses} from "@/utils/getRowStatuses"
import {useEffect, useState} from "react";

type GameBoardProps = {
    guesses: string[]
    currentGuess: string
    wordLength: number
    maxGuesses: number
    targetWord: string
    theme: string
    invalidWord: boolean | null
}

export function GameBoard({
                              guesses,
                              currentGuess,
                              wordLength,
                              maxGuesses,
                              targetWord,
                              theme,
                              invalidWord,
                          }: GameBoardProps) {
    const [shakeRow, setShakeRow] = useState<number | null>(null)

    useEffect(() => {
        if (!invalidWord) return

        const rowIndex = guesses.length
        queueMicrotask(() => {
            setShakeRow(rowIndex)
        })
        const timer = setTimeout(() => setShakeRow(null), 400)
        return () => clearTimeout(timer)

    }, [invalidWord, guesses.length])

    return (
        <div className="grid gap-2 sm:gap-3">
            {Array.from({length: maxGuesses}).map((_, rowIndex) => {
                const guess = guesses[rowIndex] ?? ""
                const isCurrentRow = rowIndex === guesses.length

                return (
                    <div key={rowIndex}   className={`flex gap-2 sm:gap-3 justify-center ${
                        shakeRow === rowIndex ? "animate-shake" : ""
                    }`}>
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
