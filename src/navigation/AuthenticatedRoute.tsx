import { Redirect, RouteComponentProps } from "@reach/router";

interface AuthenticatedRouteProps extends RouteComponentProps {
    component: React.LazyExoticComponent<(props: RouteComponentProps<{}>) => JSX.Element>;
}

export default function AuthenticatedRoute({
    path,
    component: Component,
}: AuthenticatedRouteProps): any {
    const token = localStorage.getItem("token");

    if (!token) {
        return <Redirect from={path} to="/login" noThrow />
    }
    return <Component path={path} />;
}
