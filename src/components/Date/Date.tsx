import { format, parseISO } from 'date-fns'

interface DateProps {
    value: any
}

export default function Date(props: DateProps) {

    if (!props.value) {
        return null
    }

    return (
        // @ts-no-check
        <div>{format(parseISO(props.value), 'd MMM yyyy')}</div>
    )
}