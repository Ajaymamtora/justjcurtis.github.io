import { useEffect, useRef, } from "react"
import { LOADING_MESSAGES, LOADING_SECONDS } from "../../data/constants"
import { getRandomInt } from "../../utils/helpers"
import { motion as m } from 'framer-motion'
import { LoadingBG } from "../loadingBG"
import { BowlFillLoader } from "../bowlFillLoader"

const LoadingPage = ({ done }) => {
    const loadingText = useRef(LOADING_MESSAGES[getRandomInt(LOADING_MESSAGES.length - 1)])
    const timeoutRef = useRef()

    // mount vs render? mount = first time its rendered. useEffect only fires on the mount (first render) - or dep array changes
    // common to use empty deps 
    useEffect(() => { // useffect first arg func cant be async - normally you'd have useState(...) - fetch whenever -> set in state and then
        // tie as a dependency here in a useEffect. -- Common pattern for initialising a component with data
        
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        timeoutRef.current = setTimeout(() => {
            done(true)
        }, ((LOADING_SECONDS * 1000) + 800))

        // tidy up here, wont run on the first mount
        //return () => {
        //clearTimeout(timeoutRef.current)
        // document.removeEv....
        //}
    }, [done]) // eslint-disable-line react-hooks/exhaustive-deps - maybe you only want to fire on the mount and not when deps recompute

    return (
        <>
            <LoadingBG />
            <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} exit={{ opacity: 0 }} className="hero flex-1 bg-transparent fixed top-0 h-screen w-screen">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <div className="mx-auto w-fit">
                            <BowlFillLoader seconds={LOADING_SECONDS} />
                        </div>
                        <h2 className="text-xl text-accent bg-neutral-focus bg-opacity-60 p-4 mt-10 mx-5cg rounded-md">{loadingText.current}</h2>
                    </div>
                </div>
            </m.div >
        </>
    )
}

export { LoadingPage }