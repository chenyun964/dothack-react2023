import React from "react";

export default class ListRender extends React.Component {
  state = {
    numbers: [1, 2, 3, 4, 5],
    show: false,
  };

  render() {
    return (
      <div>
        <label>Numbers:</label>
        {this.state.show ? (
          <ul>
            {this.state.numbers.map((number, key) => {
              return <li key={key}>{number}</li>;
            })}
          </ul>
        ) : (
          <div>Don't show</div>
        )}
      </div>
    );
  }
}
