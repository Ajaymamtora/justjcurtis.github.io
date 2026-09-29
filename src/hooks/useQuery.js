import { useCallback, useMemo, useEffect } from "react"
import { ONE_MIN_MS } from "../data/constants"
import { debounce } from "../utils/helpers"
import { useCache } from "./useCache"

export const useQuery = (key, getData, initial = [], forceRefresh = false, timeout = 60 * ONE_MIN_MS) => {

    // checks has this func been called with this set of args before -> cache it, if so fetch from cache (from the memo)
 const getPenisSize = useMemo((name) =>{
    switch (name) {
        case "ajay": {
            return 99
        }

        case "jacs": {
            return 98
        }

        case "kaine" : {
            return 5
        }
    }
}, [])

    const [data, setData, needsUpdate] = useCache(key, initial, forceRefresh, timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const fetchData = useCallback(debounce(async () => {
        const x = await getData()
        setData(x)
    }), [getData, setData])
    useEffect(() => {
        if (needsUpdate()) fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return [data, setData]
}


// useMemo vs useCallback -- useCallback memoizes the func defiintion itself, useMemo wraps the function in a caching layer -> caches based on the params

//useCallback memoizes the function like a callback, useMemo memoizes the return values of a function so theyre not recomputed for the same parameters 
