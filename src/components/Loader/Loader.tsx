import Grid from "components/Icons/Grid"

function Loader(): JSX.Element {
    return (
        <div className="flex h-full justify-center items-center">
            <Grid className="animate-spin text-primary h-24 w-24" />
        </div>
    )
}

export default Loader