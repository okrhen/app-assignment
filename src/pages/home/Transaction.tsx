import { AppContext } from "App";
import Currency from "components/Currency";
import { memo, useContext, useEffect } from "react";
import useSelector from "store/useSelector";
import useRequest from "hooks/useRequest";

// Transaction Page
function Transaction(): JSX.Element {
    const { dispatch, state }: any = useContext(AppContext);
    const transactionDates = state?.transaction?.transactionDates;
    const { getTransactions } = useRequest();

    useEffect(() => {
        if (!transactionDates) {
            getTransactions();
        }
    }, [dispatch, getTransactions, transactionDates]);

    return (
        <div className="w-full pt-4 h-full min-h-30">
            {transactionDates &&
                transactionDates.map((item: string) => (
                    <TransactionCard date={item} key={item} />
                ))}
        </div>
    );
}

function TransactionCard({ date }: { date: string }): JSX.Element {
    const transactionIds = useSelector((state: any) => {
        return state.transaction.transactionDateIds[date];
    });

    return (
        <div className="w-full rounded-md shadow-md p-4 mb-8 border border-gray-100">
            <span className="opacity-70 text-xl font-bold">{date}</span>
            {transactionIds.map((item: string) => (
                <TranscationItem id={item} key={item} />
            ))}
        </div>
    );
}

function TranscationItem({ id }: { id: string }) {
    const details = useSelector((state: any) => {
        return state.transaction.details[id];
    });

    const tsDetail =
        details.transactionType === "received"
            ? details.sender
            : details.receipient;

    return (
        <div className="py-2 grid grid-flow-col justify-between items-center">
            <div>
                <span className="block text-lg">{tsDetail?.accountHolder}</span>
                <span className="block text-xs opacity-40">{tsDetail?.accountNo}</span>
            </div>
            <span>
                <Currency amount={details.amount} type={details.transactionType} />
            </span>
        </div>
    );
}

export default memo(Transaction);
