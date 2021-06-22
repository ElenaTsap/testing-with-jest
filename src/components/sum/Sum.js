import React from 'react'

export const Sum = ({a,b}) => {
    let msg = 'Please give 2 numbers';
    let calc;

    if (a && b) {
        msg = `${a} + ${b} = `
        calc = a + b;
    } else {
        msg = `Please give two numbers to sum`
    }

    return (
        <div>
            {msg}
            <span data-testid = "calc">{calc}</span>
        </div>
    )
}


