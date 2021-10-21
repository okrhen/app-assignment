import { Link } from "@reach/router";
import ArrowLeft from "components/Icons/ArrowLeft";
import loginLocales from 'locales/login.json'
import registerLocales from 'locales/register.json'

interface LoginContainerProps {
    children: React.ReactNode;
    type?: 'register' | 'login'
}

export default function LoginContainer({ type = 'login', children }: LoginContainerProps) {

    const isLogin = type === 'login'

    return (
        <div className="h-full w-full bg-primary">
            <div className="w-full h-full flex flex-col items-end justify-end">
                {
                    !isLogin && (
                        <div className="w-full px-4 pb-4 flex flex-col">
                            <Link to='/'>
                                <ArrowLeft className="text-left text-white justify-between" />
                            </Link>
                            <span className="text-2xl text-white drop-shadow-md pt-4">{registerLocales.register}</span>
                        </div>
                    )
                }
                <div className="w-full px-4 pt-10 bg-white h-5/6 rounded-t-3xl grid shadow-md">
                    <div>
                        <span className="text-2xl block text-gray-800">
                            {isLogin ? loginLocales.welcome : registerLocales.welcome}
                        </span>
                        <span className="text-gray-500">
                            {isLogin ? loginLocales.welcomeSub : registerLocales.welcomeSub}
                        </span>
                    </div>
                    <div>
                        {children}
                    </div>
                    <div>
                        <span className="text-center block text-md">
                            {
                                isLogin ?
                                    'Don\'t have an account? '
                                    : 'Already have an account? '
                            }
                            <Link to={`/${isLogin ? 'register' : ''}`} className="text-red-700">{isLogin ? registerLocales.register : loginLocales.login}</Link>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
