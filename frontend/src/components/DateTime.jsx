import React, { useEffect } from "react"

export function DateTime({ date, setDate }) {
    useEffect(() => {
        let timer = setInterval(() => setDate(new Date()), 1000 * 60)
        return function cleanup() {
            clearInterval(timer)
        }
    }, [])

    return (
        <section className="flex flex-row gap-1.5 mt-2 mb-2 text-lg">
            <span>{date.toLocaleDateString("en-us", { weekday: "long", year: "numeric", month: "short", day: "numeric" })}</span>
            <span>
                {date.getHours()}:{date.getMinutes()}
            </span>
        </section>
    )
}
