import React from "react";

export default class ToDoForm extends React.Component {
    state = {
        title: "test"
    }

    onChange = (e) => {
        this.setState({
            title: e.target.value
        })
    }

    render() {
        return (
            <div>
                <label>Title:</label>
                <input type="text" value={this.state.title} onChange={this.onChange}/>
            </div>
        )
    }
}