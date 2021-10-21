import { navigate, RouteComponentProps } from "@reach/router";

import Button from "components/Button";
import Transaction from "./Transaction";
import Balance from "./Balance";
import Logout from "components/Icons/Logout";
import useLogout from "hooks/useLogout";

import locales from 'locales/home.json'

export default function Home(props: RouteComponentProps) {
    const handleTransfer = () => navigate("/transfer");
    const { logout } = useLogout()

    return (
        <>
            <div className="bg-gray-100 h-full grid grid-flow-rows overflow-y-auto">
                <div className="p-4 bg-white flex justify-between items-center sticky top-0 shadow-md z-20 h-20 ">
                    <span className="text-xl">{locales.AppName}</span>
                    <span role="button" tabIndex={0} onClick={logout}>
                        <Logout />
                    </span>
                </div>
                <section className="w-full pt-4 px-4">
                    <Balance />
                </section>
                <main className="px-4 pt-4 mt-4 mb-16 bg-white w-full h-full">
                    <span className="text-xl opacity-75 font-bold">{locales.Transactions}</span>
                    <Transaction />
                </main>
            </div>
            <div className="fixed inset-x-5 bottom-1.5 z-50">
                <Button rounded onClick={handleTransfer}>
                    {locales.MakeTransfer}
                </Button>
            </div>
        </>
    );
}
