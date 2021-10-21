import { memo, useEffect, useState } from "react";
import { createPortal } from "react-dom";

function Portal({ children }: any) {
    const modal = document.getElementById("modal");
    const el = document.createElement("div");

    useEffect(() => {
        modal?.appendChild(el);
        return () => {
            modal?.removeChild(el);
        };
    }, [el, modal]);

    return createPortal(children, el);
}

interface AlertProps {
    type: "success" | "error";
    message?: "";
    show?: boolean;
}

function Alert(props: AlertProps) {
    const [open, setOpen] = useState(false);
    useEffect(() => {
        let timeout: NodeJS.Timeout;
        if (!open && props.show) {
            setOpen(true);

            if (props.type === "success") {
                timeout = setTimeout(() => {
                    setOpen(false);
                }, 5000);
            }
        }

        return () => {
            clearTimeout(timeout);
            setOpen(false);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.show]);

    const commonClasses = "w-full bottom-0 fixed p-4 text-white capitalize";

    const success = (
        <div className={`${commonClasses} bg-green-300`}>
            {props?.message || "Success"}
        </div>
    );

    const handleClose = () => setOpen(false);
    const error = (
        <div
            className={`${commonClasses} bg-red-600`}
            role="button"
            onClick={handleClose}
        >
            {props?.message || "Error"}
        </div>
    );


    let messageBox = <div />;

    switch (props.type) {
        case "success":
            messageBox = success;
            break;
        case "error":
            messageBox = error;
            break;
    }

    return <Portal>{open && messageBox}</Portal>;
}

export default memo(Alert);
