import { useId } from "react";
import Style from "./style.module.css";


function Checkbox({checked, onCheck, children}) {

    const id = useId();

    return (
        <div id={Style.checkbox}>
            <input type="checkbox" className="checkbox" id={id} checked={checked} onChange={onCheck}/>
            <label htmlFor={id}>{children}</label>
        </div>
    );
}

export default Checkbox;
