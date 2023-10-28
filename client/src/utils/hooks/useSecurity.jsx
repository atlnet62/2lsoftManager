import {useState} from 'react'

function useSecurity() {

    const [state, setState] = useState(null)
    const  force = (password) => {
        const min = 10;
        const max = 13;
        const charsetRegex = /^(?=.*[0-9])(?=.*[!,;:./@#$%^&*])[a-zA-Z0-9!,;:./@#$%^&*]{8,}$/;
    
        if (!charsetRegex.test(password) || password.length < min) {
            setState("Low");
        } else if (password.length < max) {
            setState("Medium");
        } else {
            setState("High");
        }
    }
    return [state, force]
}

export default useSecurity;