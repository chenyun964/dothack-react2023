import React from "react";

export default class Counter extends React.Component {
    state = {
        number: 0
    }

    change = () => {
        this.setState({
            number: this.state.number + 1
        })
    }

    render(){
        return (
            <div>
                <div className="count-text">{this.state.number}</div>
                <button style={{color: "red"}} onClick={this.change}>Add 1</button>
            </div>
        )
    }
}