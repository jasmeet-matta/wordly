export type TileStatus = "correct" | "present" | "absent"

export const getRowStatuses = (
    guess: string,
    target: string
): TileStatus[] => {
    const result: TileStatus[] = Array(guess.length).fill("absent")
    const remaining: Record<string, number> = {}

    target.split("").forEach((char, i) => {
        if (target[i] !== guess[i]) {
            remaining[char] = (remaining[char] || 0) + 1
        }
    })

    guess.split("").forEach((char, i) => {
        if (char === target[i]) {
            result[i] = "correct"
        }
    })

    guess.split("").forEach((char, i) => {
        if (
            result[i] === "absent" &&
            remaining[char] > 0
        ) {
            result[i] = "present"
            remaining[char]--
        }
    })

    return result
}
