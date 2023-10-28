import {useState} from 'react';

/**
 * Compare 2 strings
 * @param {string} field1 
 * @param {string} field2
 * @returns {array}
 * 
 */

function useMatch() {

    const [state, setState] = useState(false);

    const match = (field1, field2) => {
        if (field1 !== field2) {
            setState(false);
        } else {
            setState(true);
        }
    }
    return [state, match];
}

export default useMatch;