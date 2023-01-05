import React, {useState, useEffect} from "react"

export default function AlertBox(props) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        console.log("count changed")
    }, [count])

    return (
        <div>Count is {count}</div>
    )
}