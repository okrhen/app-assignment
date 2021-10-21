
interface TextareaProps extends React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
> {
    spacing?: 'sm' | 'md' | 'lg'
}

export default function Textarea(
    { spacing, ...props }: TextareaProps
): JSX.Element {

    let margin = 'sm';
    if (spacing === 'sm') {
        margin = 'mb-4'
    } else if (spacing === 'md') {
        margin = 'mb-8'
    } else if (spacing === 'lg') {
        margin = 'mb-12'
    }

    return (
        <div className={margin}>
            <textarea {...props} className="w-full h-32 p-4 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" />
        </div>
    );
}
