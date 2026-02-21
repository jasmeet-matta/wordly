import {useEffect, useRef, useState} from "react"
import {WifiIcon, ExclamationTriangleIcon} from "@heroicons/react/24/solid"

type Props = {
    isOnline: boolean
}

export default function NetworkStatusBar({isOnline}: Props) {
    const [showSnackbar, setShowSnackbar] = useState(false)
    const prevOnline = useRef(isOnline)

    useEffect(() => {
        if (prevOnline.current === isOnline) return

        prevOnline.current = isOnline

        setShowSnackbar(true)

        if (!isOnline && "vibrate" in navigator) {
            navigator.vibrate([100, 50, 100])
        }

        if (isOnline) {
            const timer = setTimeout(() => {
                setShowSnackbar(false)
            }, 2000)

            return () => clearTimeout(timer)
        }
    }, [isOnline])

    return (
        <div
            className={`fixed bottom-0 left-0 w-full
        px-6 py-2
        flex items-center justify-center gap-2
        text-xs font-medium
        transition-transform duration-400 ease-in-out
        ${isOnline
                ? "bg-green-600/90 text-white"
                : "bg-red-600/90 text-white"}
        ${showSnackbar
                ? "translate-y-0 opacity-100"
                : "translate-y-full opacity-0 pointer-events-none"}
    `}
        >
            {isOnline ? (
                <WifiIcon className="w-4 h-4" />
            ) : (
                <ExclamationTriangleIcon className="w-4 h-4" />
            )}
            <span>
        {isOnline ? "Back online" : "You're offline"}
    </span>
        </div>
    )
}
