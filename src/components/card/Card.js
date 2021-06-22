import React from 'react'
import {useEffect} from 'react'

const Card = (props) => {

    useEffect(() => {
        const timeoutID = setTimeout(() => {
            props.onSelect('Time is over!')
        }, 5000);

        return () => {
            clearTimeout(timeoutID)
        }
    }, []);

    const options = ['JS', 'React', 'Angular', 'Vue', 'Node'];

    const content = options.map(option => 
        <button
            key = {option}
            data-testid = {option}
            onClick = {()=> props.onSelect(option)}
        >
            {option}
        </button>
        )

    return (
        <div>
            {content}
        </div>
    )
}

export default Card
