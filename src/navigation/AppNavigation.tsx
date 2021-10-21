import * as React from "react";
import { Router } from "@reach/router";

import AppWrapper from "components/AppWrapper";
import Loader from "components/Loader";
import AuthenticatedRoute from "./AuthenticatedRoute";

// define all your pages here
const Login = React.lazy(() => import("pages/login"));
const Register = React.lazy(() => import("pages/register"));
const Home = React.lazy(() => import("pages/home"));
const Transfer = React.lazy(() => import("pages/transfer"));
const SplashScreen = React.lazy(() => import("pages/splash-screen"));

export default function AppNavigation(): JSX.Element {
    return (
        <AppWrapper>
            <React.Suspense fallback={<Loader />}>
                <Router component={RouterWrapper} primary={false}>
                    <SplashScreen path="/" />
                    <Login path="/login" />
                    <Register path="/register" />
                    <AuthenticatedRoute path="/home" component={Home} />
                    <AuthenticatedRoute path="/transfer" component={Transfer} />
                </Router>
            </React.Suspense>
        </AppWrapper>
    );
}

function RouterWrapper({ children }: any): JSX.Element {
    return <div className="h-full w-full">{children}</div>;
}
