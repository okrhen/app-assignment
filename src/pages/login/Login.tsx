import { memo, useContext, useMemo, useState } from "react";
import { RouteComponentProps, navigate } from "@reach/router";

import { AppContext } from "App";
import Button from "components/Button";
import Input from "components/Input";
import AuthWrapper from "components/AuthWrapper";
import Fetch from "api/fetch";

import locales from "locales/login.json";

function Login(props: RouteComponentProps): JSX.Element {
    const { dispatch, alert, resetAlert }: any = useContext(AppContext);
    const [state, setstate] = useState({
        username: "",
        password: "",
        isLoading: false,
    });

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

    const handleLogin = () => {
        setstate((prevState) => ({
            ...prevState,
            isLoading: true,
        }));

        Fetch.post("login", {
            username: state.username,
            password: state.password,
        }).then((val) => {
            if (val?.status === "success") {
                localStorage.setItem("token", val.token);
                localStorage.setItem("user", JSON.stringify(val));
                dispatch({
                    type: "success_login",
                    user: val,
                });
                navigate("/home", { replace: true });
            } else {
                setstate((prevState) => ({
                    ...prevState,
                    isLoading: false,
                }));

                alert({
                    open: true,
                    type: 'error',
                    message: `${val.status}: ${val.error}`
                });
            }
        });
    };

    const isValid = useMemo(() => {
        return Boolean(state.username && state.password);
    }, [state.username, state.password]);

    return (
        <AuthWrapper>
            <>
                <Input
                    placeholder={locales.username}
                    value={state.username}
                    onChange={(e) => handleChange(locales.username.toLowerCase(), e)}
                />
                <Input
                    placeholder={locales.password}
                    value={state.password}
                    type="password"
                    onChange={(e) => handleChange(locales.password.toLowerCase(), e)}
                />
                <Button onClick={handleLogin} disabled={!isValid || state.isLoading}>
                    {state.isLoading ? locales.loggingIn : locales.login}
                </Button>
            </>
        </AuthWrapper>
    );
}

export default memo(Login);
