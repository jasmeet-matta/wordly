type TileProps = {
    value?: string
}

export function Tile({value = ""}: TileProps) {
    return (
        <div className="
      w-12 h-12
      border-2 border-border
      flex items-center justify-center
      text-xl font-bold uppercase
    ">
            {value}
        </div>
    )
}
