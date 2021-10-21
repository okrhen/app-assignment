import { AppContext } from "App"
import { useContext } from "react"

export default function useSelector(callback: any) {

    const {state}: any = useContext(AppContext)

    return callback(state);
}