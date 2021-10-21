function formatNumber(val: number) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "SGD",
    }).format(val);
}

interface CurrencyProps {
    amount: number;
    type?: 'received' | 'transfer'
    noCurrencySign?: boolean
}

export default function Currency({ amount, type }: CurrencyProps): JSX.Element {
    let typeClass = 'font-bold'
    if (type === 'received') typeClass += ' text-green-500'
    if (type === 'transfer') typeClass += ' text-gray-400'
    return <span className={typeClass}>{formatNumber(amount)}</span>;
}
