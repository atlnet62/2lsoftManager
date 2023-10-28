import { useEffect } from "react";

export default function Title({ id }) {
    const dynamicTitle = () => {
        let finalTitle = "2LSOFT MANAGER";
        if (id) {
            finalTitle += ` : ${id.toUpperCase()}`;
        }
        return finalTitle;
    };

    useEffect(() => {
        document.title = dynamicTitle();
    }, [dynamicTitle]);

}
