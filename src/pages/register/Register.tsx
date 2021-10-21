import { memo, useContext, useMemo, useState } from "react";
import { navigate, RouteComponentProps } from "@reach/router";

import AuthWrapper from "components/AuthWrapper";
import Button from "components/Button";
import Input from "components/Input";
import Fetch from "api/fetch";

import login from "locales/login.json";
import registerLocale from "locales/register.json";
import { AppContext } from "App";
const locales = {
    ...login,
    ...registerLocale,
};

const initialRegisterState = {
    username: "",
    password: "",
    confirmpassword: "",
    isLoading: false,
}

function Register(props: RouteComponentProps): JSX.Element {
    const [state, setstate] = useState(initialRegisterState);
    const { alert, resetAlert }: any = useContext(AppContext)

    const handleChange = (
        field: string,
        val: React.ChangeEvent<HTMLInputElement>
    ): void => {
        resetAlert()
        setstate((prevState) => ({
            ...prevState,
            [field]: val.target.value,
        }));
    }

    const isValid = useMemo(() => {
        return Boolean(
            state.username &&
            state.password &&
            state.confirmpassword &&
            state.password === state.confirmpassword
        );
    }, [state.username, state.password, state.confirmpassword]);

    const isPasswordMatch: boolean = useMemo(() => {
        return Boolean(state.password === state.confirmpassword);
    }, [state.password, state.confirmpassword]);

    const handleRegister = () => {
        setstate((prevState) => ({
            ...prevState,
            isLoading: true,
        }));

        Fetch.post("register", {
            username: state.username,
            password: state.password,
        }).then((res) => {
            if (res.status === "success") {
                navigate(-1);
                alert({
                    type: 'sucess',
                    message: 'You are now registered! Login to continue.'
                })
            } else {
                alert({
                    type: 'error',
                    message: res.error,
                    open: true
                })
                setstate((prev) => ({
                    ...prev,
                    isLoading: false
                }));
            }
        })
    };

    return (
        <AuthWrapper type="register">
            <>
                <Input
                    placeholder={locales.username}
                    value={state.username}
                    onChange={(e) => handleChange(locales.username.toLowerCase(), e)}
                />
                <Input
                    type="password"
                    placeholder={locales.password}
                    value={state.password}
                    onChange={(e) => handleChange(locales.password.toLowerCase(), e)}
                />
                <Input
                    type="password"
                    placeholder={locales.confirmPassword}
                    value={state.confirmpassword}
                    onChange={(e) =>
                        handleChange(
                            locales.confirmPassword.toLowerCase().replaceAll(" ", ""),
                            e
                        )
                    }
                    error={Boolean(!isPasswordMatch && state.confirmpassword)}
                    errorMessage="Confirm password does not match"
                />
                <Button disabled={!isValid || state.isLoading} onClick={handleRegister}>
                    {locales.register}
                </Button>
            </>
        </AuthWrapper>
    );
}

export default memo(Register);
