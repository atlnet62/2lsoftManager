import {useCallback, useState} from "react";

function useSizingString() {
    const [state, setState] = useState(false);
    const sizing = useCallback((word, min) => {

        if (word.length < min) {
            setState(false);
        } else {
            setState(true);
        }
    });
    return [state, sizing];
}

export default useSizingString;
