export interface FormItemProps {
    field?: string
    value: any
    onChange: (e: {
        target: {
            value: any,
            [key: string]: any
        },
        [key: string]: any
    }) => void
    label?: ReactNode
    placeholder?: string
    errorMessage?: string | null
}
