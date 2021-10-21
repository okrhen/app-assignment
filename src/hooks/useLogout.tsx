import { navigate } from "@reach/router"
import { AppContext } from "App"
import { useContext } from "react"

export default function useLogout() {

    const { dispatch }: any = useContext(AppContext)

    function logout() {
        localStorage.removeItem('token')
        localStorage.removeItem('user')

        dispatch({
            type: 'clear'
        })

        navigate('/login', { replace: true })
    }

    return {
        logout
    }
}