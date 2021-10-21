interface AppWrapperProps {
    children: React.ReactNode | React.ComponentType
}

export default function AppWrapper(props: AppWrapperProps) {
    return (
        <div className="container mx-auto h-screen box-border" >
            {props.children}
        </div>
    )
}
