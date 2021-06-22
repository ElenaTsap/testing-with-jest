import { getDefaultNormalizer } from "@testing-library/react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from 'react-dom/test-utils';
import Card from './Card'

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
    jest.useFakeTimers();
});

afterEach(() => {
  // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
    jest.useFakeTimers();
});

it('should call onSelect with the timeout msg', () => {
    const onSelect = jest.fn();
    //rendering the cards is mandotory in order for the useEffect to run
    act(() => {
        render(<Card onSelect = {onSelect}/>, container)
    })

    //nothing should happen after one second
    act(()=> {
        jest.advanceTimersByTime(1000);
    });
    expect(onSelect).not.toHaveBeenCalled();

    //Time is over should be logged after 5 secs of no click
    act(()=> {
        jest.advanceTimersByTime(5000);
    });
    expect(onSelect).toHaveBeenCalledWith('Time is over!');
});

//second module
it('should cleanup on being removed', () => {
    const onSelect = jest.fn();

    act(() => {
        render(<Card onSelect = {onSelect}/>, container)
    })

    act(()=> {
        jest.advanceTimersByTime(1000);
    });
    expect(onSelect).not.toHaveBeenCalled();

    act(()=> {
        render(null, container)
    });

    act(()=> {
        jest.advanceTimersByTime(5000);
    });
    expect(onSelect).not.toHaveBeenCalled();
});

it('should call onSelect with the choice', () => {
    const onSelect = jest.fn();

    act(() => {
        render(<Card onSelect = {onSelect}/>, container)
    });

    const angularBtn = container.querySelector('[data-testid = "Angular"]');

    act(() =>  {
        angularBtn.dispatchEvent(new MouseEvent('click', {bubbles: true}));
    });
    expect(onSelect).toHaveBeenCalledWith('Angular')
});

