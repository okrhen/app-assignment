interface InputProps extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement> {
    spacing?: 'sm' | 'md' | 'xl',
    error?: boolean
    errorMessage?: string
}


export default function Input(
    {
        spacing = 'sm',
        error,
        errorMessage,
        ...props
    }: InputProps
): JSX.Element {

    let margin = 'sm';
    if (spacing === 'sm') {
        margin = 'mb-4'
    } else if (spacing === 'md') {
        margin = 'mb-8'
    } else if (spacing === 'xl') {
        margin = 'mb-12'
    }

    let initialClass = 'w-full h-14 px-4 bg-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent'
    if (error) {
        initialClass += ' border-red-500 border-2'
    }

    return (
        <div className={margin}>
            <label>
                <input
                    {...props}
                    className={initialClass}
                />
            </label>
            {
                error && <span>{errorMessage}</span>
            }
        </div>
    );
}
