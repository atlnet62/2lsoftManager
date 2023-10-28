import { useId } from "react";

/*
 *
 * @param {string} type
 * @param {string} placeholder
 * @param {string} value
 * @param {(s: string) => void} onChange
 * @param {string} isDisabled
 * @param {string} children
 *
 */

function Input({ type = "text", placeholder = "", value, onChange, isDisabled = null, children = null, isRequired=false }) {
    const id = useId();

    return (
        <>
            <input type={type} id={id} className="input" value={value} placeholder={placeholder} onChange={onChange} disabled={isDisabled} required={isRequired}/>
            {children && value && <p>{children}</p>}
        </>
    );
}

export default Input;
