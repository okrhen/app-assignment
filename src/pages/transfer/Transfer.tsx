import { navigate, RouteComponentProps } from "@reach/router";
import Fetch from "api/fetch";
import { AppContext } from "App";
import Button from "components/Button";
import ArrowLeft from "components/Icons/ArrowLeft";
import Input from "components/Input";
import Select from "components/Select";
import Textarea from "components/Textarea";
import useRequest from "hooks/useRequest";

import locales from "locales/transfer.json";
import { useContext, useEffect, useMemo, useState } from "react";
import useSelector from "store/useSelector";

const initState = {
    amount: "",
    payees: {},
    description: "",
    isLoading: false,
};

export default function Transfer(props: RouteComponentProps): JSX.Element {
    const [state, setstate] = useState<any>(initState);
    const { dispatch, alert, resetAlert }: any = useContext(AppContext);
    const payees = useSelector((state: any) => state?.payees);
    const { refetchBalanceTrans, getPayees } = useRequest()


    useEffect(() => {
        if (!payees?.length) {
            getPayees()
        }
    }, [dispatch, getPayees, payees?.length]);

    const handleClick = () => navigate(-1);

    const handleSelect = (item: any) => {
        setstate((prev: any) => ({
            ...prev,
            payees: item,
        }));
    };

    const isValid = useMemo(() => {
        return Boolean(state.amount && Object.keys(state.payees)?.length > 0);
    }, [state.amount, state.payees]);

    const handleChange = (
        field: string,
        val: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ): void => {
        resetAlert();
        setstate((prevState: any) => ({
            ...prevState,
            [field]: val.target.value,
        }));
    }

    const handleTransfer = () => {
        setstate((prev: any) => ({
            ...prev,
            isLoading: true,
        }));

        const formData = {
            receipientAccountNo: state?.payees?.accountNo,
            amount: Number(parseFloat(state.amount).toFixed(2)),
            description: state.description,
        };

        Fetch.post("transfer", formData).then((res) => {
            if (res.status === "success") {
                setstate(initState);
                refetchBalanceTrans()
                alert({
                    type: 'success',
                    message: res.status,
                    open: true
                })
            } else {
                alert({
                    type: 'error',
                    message: res.error,
                    open: true
                })
                setstate((prev: any) => ({
                    ...prev,
                    isLoading: false,
                }));
            }
        });
    };

    return (
        <div className="py-4 px-6 h-full bg-white">
            <div className="py-4">
                <span onClick={handleClick} role="button" tabIndex={0}>
                    <ArrowLeft />
                </span>
                <span className="text-2xl block py-4">{locales.transfer}</span>
            </div>
            <div>
                <Select
                    placeholder={locales.payee}
                    options={payees}
                    onSelect={handleSelect}
                    selected={state.payees}
                />
                <Input
                    type="number"
                    placeholder={locales.amount}
                    onChange={(e) => handleChange(locales.amount.toLowerCase(), e)}
                    value={state.amount}
                />
                <Textarea
                    placeholder={`${locales.description} ( ${locales.optional} )`}
                    spacing="md"
                    onChange={(e) => handleChange(locales.description.toLowerCase(), e)}
                    value={state.description}
                />
                <Button disabled={!isValid || state.isLoading} onClick={handleTransfer}>
                    {locales.transfer}
                </Button>
            </div>

        </div>
    );
}
