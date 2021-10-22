interface AppWrapperProps {
    children: React.ReactNode | React.ComponentType
}

export default function AppWrapper(props: AppWrapperProps) {
    return (
        <div className="container md:container md:w-2/5 lg:container lg:w-1/4 mx-auto h-screen box-border" >
            {props.children}
        </div>
    )
}
