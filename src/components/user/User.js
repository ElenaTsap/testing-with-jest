import { useState, useEffect} from 'react'

const User = (props) => {
    const [user, setUser] = useState(null);

    //fetchUserData

    const fetchUserData = async (id) => {
        const response = await fetch ('/' + id);
        setUser(await response.json());
        //we are using 2 times await because json is also an asynchronious issue
    }

    useEffect(() => {
        fetchUserData(props.id)
    }, [props.id])

    if (!user) {
        return 'loading...'
        //after this return JS does not continue
    }

    return (
        <div>
            <h3>{user.name}</h3>
            <h4>{user.age}</h4>
            <h4>{user.address}</h4>
        </div>
    )
}

export default User
