import { useId } from "react";

export default function Textarea({ placeholder = "", cols, rows, value, onChange }) {
    const id = useId();

    return (
        <>
            <textarea id={id} cols={cols} rows={rows} placeholder={placeholder} value={value} onChange={onChange}></textarea>
        </>
    );
}
