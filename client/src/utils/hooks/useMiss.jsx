import {useCallback, useState} from "react";

/**
 * Switch false and true
 * @param {object} field
 * @returns {array} 
 */

function useEmpty() {
    const [state, setState] = useState();
    const empty = useCallback((field) => {

        const values = Object.values(field)
        console.log(field)

        values.map((value) => {
            const tab = [];
            if(value.length === 0) {
                setState(tab.push(false))
            } else {
                setState(tab.push(true))
            }
        })

        console.log(state)
    });

    return [state, empty];
}

export default useEmpty;
