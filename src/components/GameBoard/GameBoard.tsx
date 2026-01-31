import { Tile } from "./Tile"

export function GameBoard() {
    const rows = 6
    const cols = 5

    return (
        <div className="grid gap-2">
            {Array.from({ length: rows }).map((_, rowIndex) => (
                <div key={rowIndex} className="flex gap-2 justify-center">
                    {Array.from({ length: cols }).map((_, colIndex) => (
                        <Tile key={colIndex} />
                    ))}
                </div>
            ))}
        </div>
    )
}
