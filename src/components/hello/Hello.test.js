import { render, unmountComponentAtNode } from "react-dom";
import { act } from 'react-dom/test-utils';
import { Hello } from './Hello'

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

it('renders with or without name', () => {
    act(()=> {
        render(<Hello/>, container); //we use this container to isolate 
    });
    expect(container.textContent).toBe(`Hello stranger`)

    act(()=> {
        render(<Hello name='Elena'/>, container); //we use this container to isolate 
    });
    //toBe function looks for the exact match. even if a space is missing is catches it as an error
    //there are different types of matchers
    expect(container.textContent).toBe(`Hello Elena`)
})