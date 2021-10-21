import { navigate, RouteComponentProps } from "@reach/router";
import Loader from "components/Loader";
import { useEffect } from "react";

export default function SplashScreen(props: RouteComponentProps) {

    const token = localStorage.getItem('token');

    useEffect(() => {
        let timeout = setTimeout(() => {
            const path = Boolean(token) ? '/home' : '/login'
            navigate(path)
        }, 400)

        return () => clearTimeout(timeout)
    }, [token])

    return (
        <Loader />
    )
}