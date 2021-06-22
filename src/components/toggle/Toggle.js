import { useState } from 'react'

const Toggle = (props) => {
    const [state, setState] = useState(false);

    const clickHandler = () =>  {
        setState(!state)
        // another way
        //setState(preState => !preState)
        
        props.onChange( !state );
        //still we have to send the opposite since line 6 will be executed afterwards
        
    }

    return (
        <button 
            onClick = {clickHandler}
            data-testid = "toggle"
            >
            {state ? 'Turn Off' : 'Turn On'}
        </button>
    )
}

export default Toggle
