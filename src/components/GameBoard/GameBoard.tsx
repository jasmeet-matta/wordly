import {Tile} from "./Tile"

type GameBoardProps = {
    guesses: string[]
    currentGuess: string
    wordLength: number
    maxGuesses: number
}
const TARGET_WORD = "REACT";

const getTileStatus = (
    letter: string,
    index: number
) => {
    if (!letter) return "empty"

    if (TARGET_WORD[index] === letter) return "correct"

    if (TARGET_WORD.includes(letter)) return "present"

    return "absent"
}


export function GameBoard({
                              guesses,
                              currentGuess,
                              wordLength,
                              maxGuesses,
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

                            return <Tile
                                key={colIndex}
                                value={letter}
                                status={
                                    isSubmittedRow
                                        ? getTileStatus(letter, colIndex)
                                        : "empty"
                                }
                            />

                        })}
                    </div>
                )
            })}
        </div>
    )
}
