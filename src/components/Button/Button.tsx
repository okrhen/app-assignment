
interface ButtonProps extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement> {
    rounded?: boolean
}

export default function Button({ rounded, ...props }: ButtonProps): JSX.Element {
    let initialClass =
        "h-14 w-full bg-primary text-white rounded-md disabled:opacity-50";

    if (rounded) {
        initialClass += ' rounded-full'
    }

    return (
        <button tabIndex={0} type="button" {...props} className={initialClass}>
            {props.children}
        </button>
    );
}
