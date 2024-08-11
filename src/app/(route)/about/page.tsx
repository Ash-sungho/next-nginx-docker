import { FC } from 'react'

interface OwnProps {
    something: string
}

const About: FC<OwnProps> = () => {
    return (
        <div>
            <h1> About TEST Page</h1>
        </div>
    )
}

export default About
