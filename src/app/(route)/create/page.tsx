import { FC } from 'react'

interface OwnProps {
    something: string
}

const Create: FC<OwnProps> = () => {
    return (
        <div>
            <h1>create TEST Page</h1>
        </div>
    )
}

export default Create
