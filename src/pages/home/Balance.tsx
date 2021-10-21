
// Balance Page

import Currency from "components/Currency";
import { useEffect, memo, useContext } from "react";
import { AppContext } from "App";
import useSelector from "store/useSelector";
import useRequest from "hooks/useRequest";

import balanceLocale from 'locales/home.json'
const locales = balanceLocale.balance


function Balance(): JSX.Element {
    const { dispatch }: any = useContext(AppContext)
    const balanceState = useSelector((state: any) => state?.balance)
    const userState = useSelector((state: any) => state?.user)
    const { getBalance } = useRequest();

    useEffect(() => {
        if (!balanceState) {
            getBalance()
        }
    }, [balanceState, dispatch, getBalance]);

    return (
        <div className="w-full p-4 shadow-2xl rounded-md text-white bg-primary min-h-12">
            <div className="grid grid-flow-col justify-start gap-4 items-center w-full">
                <div className="rounded-full h-12 w-12 bg-black opacity-40" />
                <div>
                    <span className="block" data-testid="username">{userState?.username}</span>
                </div>
            </div>
            <hr className="my-2 opacity-30" />
            <div>
                <div className="pt-2 pb-4">
                    <span className="text-md opacity-80">
                        {" "}
                        {balanceState?.accountNo?.slice(0, 4).padEnd(13, "*")}
                    </span>
                    <span className="text-xs block opacity-40" data-testid="accountNo">{locales.AccountNo}</span>
                </div>
                <div>
                    <span className="text-3xl opacity-80 font-black">
                        <Currency amount={balanceState?.balance || 0} />
                    </span>
                    <span className="text-sm block opacity-40">{locales.CurrentBalance}</span>
                </div>
            </div>
        </div>
    );
}

export default memo(Balance)