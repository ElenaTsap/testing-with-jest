import { act } from 'react-dom/test-utils';
import { render, unmountComponentAtNode } from "react-dom";
import User from'./User'

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

it('renders user data', async () => {
    const fakeUser = {
        name: 'Bill Gates',
        age: '65',
        address: '1835 73rd Ave NE, Medina, WA'
    };
    
    //global is the global scope of node.js
    //fetch is the method name that will be replaced with the mockImplementation function
    //our issue here is that we do not have a back end so we have to just create a mock Implementation of the fetch not of the whole parent function
    //spyOn can be used on any function or class on the global scope - it spies on an object - the global or any other and tries to find the method with the name
    jest.spyOn(global, 'fetch').mockImplementation((id) => {
        if (id === '/undefined') {
            return console.throw('There is no id');
        }
        return Promise.resolve({
            json: () => Promise.resolve(fakeUser)
        });
    });

    await act( async () => {
        //even if we do not put id it will pass the test since we have not covered the option when id is undefined
        render(<User id="any"/>, container)
    });

    expect(container.querySelector('h3').textContent).toBe(fakeUser.name);
    expect(container.querySelector('h4:first-of-type').textContent).toBe(fakeUser.age);
    expect(container.querySelector('h4:last-of-type').textContent).toBe(fakeUser.address);

    //restoring the global data back to normal
    //mockRestore, spyOn and mock implementation comes from jest
    global.fetch.mockRestore();
})

