import logo from "./logo.svg";
import "./App.css";
import AlertBox from "./AlertBox";
import Counter from "./Counter";
import ToDoForm from "./ToDoForm";
import TaskList from "./TaskList";

function App() {
  return (
    <div className="App">
      <TaskList />
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <ToDoForm />
        <Counter />
        <AlertBox message="hi" />
        <AlertBox message="bye" />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
