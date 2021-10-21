import Input from "components/Input";
import { memo, useState } from "react";

interface SelectPropsValue {
    id: string;
    name: string;
    accountNo?: string;
}

interface SelectProps {
    options: Array<SelectPropsValue>;
    placeholder: string;
    selected?: SelectPropsValue | undefined;
    onSelect(item: SelectPropsValue): void;
}

function Select(props: SelectProps) {
    const [open, setOpen] = useState<boolean>(false);

    const handleOpen = () => setOpen((prev) => !prev);

    const handleCancel = (e: any) => e.stopPropagation();
    const handleSelect = (item: any) => {
        handleOpen();
        return props.onSelect(item);
    };

    return (
        <>
            <div role="button" onClick={handleOpen} tabIndex={0}>
                <Input
                    placeholder={props.placeholder}
                    value={props?.selected?.name || ""}
                    disabled
                />
            </div>
            {open && (
                <div
                    className="fixed z-index inset-0 z-20 bg-black bg-opacity-40 flex items-end"
                    role="button"
                    onClick={handleOpen}
                >
                    <ul
                        className="bg-white w-full h-72 transition-all overflow-y-auto shadow-md z-40"
                        role="button"
                        onClick={handleCancel}
                    >
                        {props.options.map((item) => (
                            <li
                                className="border-b border-gray-300 flex flex-col p-4"
                                key={item?.id}
                                onClick={() => handleSelect(item)}
                            >
                                <span className="text-lg font-medium opacity-90">
                                    {item.name}
                                </span>
                                <span className="opacity-60">{item?.accountNo}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
}

export default memo(Select);
