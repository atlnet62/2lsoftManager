import {useCallback, useState} from "react";

/**
 * Switch false and true
 * @param {boolean} initial
 * @returns {array} 
 */

function useToggle(initial) {
    const [state, setState] = useState(initial);
    const toggle = useCallback(() => setState((v) => !v),[]);
    return [state, toggle];
}

export default useToggle;
