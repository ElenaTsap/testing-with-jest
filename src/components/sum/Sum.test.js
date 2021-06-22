import { render, unmountComponentAtNode } from "react-dom";
import { act } from 'react-dom/test-utils';
import { Sum } from './Sum'
import {screen} from '@testing-library/react'

//*this part is about isolation
let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it('renders with 2 numbers as inputs', () => {
    act(()=> {
        render(<Sum a={3} b={4}/>, container); 
    });
    //expect(container.textContent).toBe(`3 + 4 = 7`)
    //since we have numbers we can also write it with toEqual() like below
    //expect(container.textContent).toEqual(`7`)
    //when using toMatch any presence of the number will count as valid
    //expect(container.textContent).toMatch(`3`) //the query is - is there any 5?
    //to get by test id we cannot use the container we have to import and use screen - this is a standard method
    expect(screen.getByTestId('calc').textContent).toEqual('7')
})

//if you put another it you create another mpdule and create another test

it('renders without 2 numbers as inputs', () => {
    act(()=> {
        render(<Sum />, container); 
    });
    expect(container.textContent).toBe(`Please give two numbers to sum`);

    act(()=> {
        render(<Sum a={3}/>, container); 
    });
    expect(container.textContent).toBe(`Please give two numbers to sum`);

    act(()=> {
        render(<Sum a={3} b={4} c={34}/>, container); 
    });
    expect(container.textContent).toBe(`3 + 4 = 7`)
})