import { useCallback, useEffect, useRef, useState } from "react"
import { getRandomInt } from "../utils/helpers"

const TWINKLE_RATE = 0.001

const StarryNight = ({ children }) => {
    const maxDimension = Math.max(window.screen.width, window.screen.height)
    const randomXY = () => {
        return { x: getRandomInt(maxDimension), y: getRandomInt(maxDimension * 2) }
    }
    const starCount = useRef(Math.floor((maxDimension * maxDimension * 1.5) / 15000))
    const [stars, setStars] = useState(new Array(starCount.current).fill(0).map(() => ({ ...randomXY(), size: getRandomInt(2, 0.5), opacity: 1 })))
    const twinkling = useRef({}) // not a dep in useCallback - not normal 

    const draw = useCallback(() => { // tells react that we dont need to redefine this between renders- 
        setStars((currentStars) => { // can use a setter by passing func where the param to the callb ack is the current value, returned value is the new state
            // can be a safety reason to use this callback - when handling multiple successive setState - stable calculation of an update in state - and maybe 

            // cant setState in a useEffect
            if (!currentStars) return
            const nextStars = []
            for (let i = 0; i < currentStars.length; i++) {
                const s = currentStars[i]
                const isOffscreen = s.x > window.innerWidth ||
                    s.y > window.innerHeight + window.scrollY * 0.1 ||
                    s.y < window.scrollY * 0.1
                if (isOffscreen) {
                    nextStars.push(s)
                    continue
                }
                if (twinkling.current[i] !== undefined) {
                    twinkling.current[i]--
                    if (twinkling.current[i] === 0) {
                        twinkling.current[i] = undefined
                        s.opacity = 1
                    }
                } else {
                    if (Math.random() >= TWINKLE_RATE) {
                        nextStars.push(s)
                        continue
                    }
                    twinkling.current[i] = getRandomInt(20, 40)
                    s.opacity = 0
                }
                nextStars.push(s)
            }
            return nextStars
        })
    }, [])

    useEffect(() => {
        setTimeout(draw, 10)
    }, [stars, draw])
    return (
        <>
            <div className="bg-transparent text-white py-8 z-50 sticky top-0 mx-auto left-0 right-0 overflow-hidden">
                {stars && stars.map((s, i) => {
                    const isOffscreen = s.x > window.innerWidth ||
                        s.y > window.innerHeight + window.scrollY * 0.1 ||
                        s.y < window.scrollY * 0.1
                    return isOffscreen ? null : (
                        <div key={i} id={`star-${i}`} style={
                            {
                                opacity: s.opacity,
                                top: `${s.y + (-window.scrollY * 0.1)}px`,
                                left: `${s.x}px`,
                                backgroundXolor: `white`,
                                width: `${s.size}px`,
                                height: `${s.size}px`,
                            }
                        } className={`starticle fixed bg-white transition-opacity duration-300`} />
                    )
                })}
                {children}
            </div>
        </>
    );
}

export { StarryNight }
