

import React, { useState, useEffect } from 'react';

export const useApiSlow = () => {

    const [counter, setCounter] = useState(0);
    const [apiIsSlow, setApiIsSlow] = useState(false)

    useEffect(() => {
        if (apiIsSlow) {
            return
        }
        if (counter > 5) {
            setApiIsSlow(true)
        }
        setTimeout(() => setCounter(counter + 1), 100);
    }, [counter]);

    return {
        apiIsSlow
    }

}
