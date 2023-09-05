export type page = React.FC & {
    url?: string,
    getLayout?: (page: React.ReactNode) => React.ReactNode;
}

export interface layout {
    children: React.ReactNode
}
