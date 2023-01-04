import React from "react";

export default class TaskList extends React.Component {
  state = {
    tasks: [
      {
        id: 1,
        description: "Walk the dog",
        done: false,
      },
      {
        id: 2,
        description: "Water the plants",
        done: false,
      },
      {
        id: 3,
        description: "Pay the bills",
        done: false,
      },
    ],
    newTaskName: "",
    taskBeingEdited: 0,
    modifiedTaskName: "",
  };

  componentDidMount() {
    let tasks = localStorage.getItem("todotask");
    if (tasks === null) {
      tasks = "[]";
    }
    this.setState({
      tasks: JSON.parse(tasks),
    });
  }

  updateFormField = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  addTask = (e) => {
    // 1. create a new task object
    let newTask = {
      id: parseInt(Math.random() * 10000 + 9999),
      description: this.state.newTaskName,
      done: false,
    };

    // 2. add the task to the back of the task list
    let currentValues = this.state.tasks;

    // 2.1 clone out all the tasks so far, and add the new task at the back
    let modifiedValues = [...currentValues, newTask];

    // 2.2 update the state
    localStorage.setItem("todotask", JSON.stringify(modifiedValues));
    this.setState({
      tasks: modifiedValues,
      newTaskName: "",
    });
  };

  checkTask = (task_id) => {
    // 1. find the task that is being modified. For this, we use the filter function
    let currentTask = this.state.tasks.filter((t) => t.id === task_id)[0];

    // 2. Clone the task
    let modifiedTask = { ...currentTask };

    // 3. Modify the task; if `done` was false, invert to true etc.
    modifiedTask.done = !currentTask.done;

    // 4. Clone the tasks array using map; return each task
    // as it is if that task is not the one we are modifying. if
    // it is, then return the modified task instead.
    let modifiedTasksList = this.state.tasks.map((t) => {
      if (t.id !== task_id) {
        return t;
      } else {
        return modifiedTask;
      }
    });

    localStorage.setItem("todotask", JSON.stringify(modifiedTasksList));
    this.setState({
      tasks: modifiedTasksList,
    });
  };

  deleteTask = (task_id) => {
    // 1. find the index of the task
    let task_index = this.state.tasks.findIndex((t) => t.id === task_id);
    console.log(task_id);
    console.log(task_index);

    // 2. make a copy of the array, but skip over the task that we want to delete
    let modifiedTasks = [
      ...this.state.tasks.slice(0, task_index),
      ...this.state.tasks.slice(task_index + 1),
    ];

    localStorage.setItem("todotask", JSON.stringify(modifiedTasks));
    this.setState({
      tasks: modifiedTasks,
    });
  };

  updateTask = (task_id) => {
    // 1. find the task that is being modified. For this, we use the filter function
    let currentTask = this.state.tasks.filter((t) => t.id === task_id)[0];

    // 2. Clone the task
    let modifiedTask = { ...currentTask };

    // 3. Modify the task description
    modifiedTask.description = this.state.modifiedTaskName;

    // 4. Clone the tasks array using map; return each task
    // as it is if that task is not the one we are modifying. if
    // it is, then return the modified task instead.
    let modifiedTasksList = this.state.tasks.map((t) => {
      if (t.id !== task_id) {
        return t;
      } else {
        return modifiedTask;
      }
    });

    localStorage.setItem("todotask", JSON.stringify(modifiedTasksList));
    this.setState({
      tasks: modifiedTasksList,
    });
  };

  displayTask = (t) => {
    return (
      <div
        key={t.id}
        className="card py-2 px-4 gap-2 d-flex flex-row align-items-center"
      >
        <input
          type="checkbox"
          value={t.description === true}
          onChange={() => {
            this.checkTask(t.id);
          }}
        />
        <div className="flex-grow-1">{t.description}</div>
        <button
          className="btn btn-primary"
          onClick={async () => {
            this.setState({
              taskBeingEdited: t.id,
              modifiedTaskName: t.description,
            });
          }}
        >
          Edit
        </button>
        <button
          className="btn btn-danger"
          onClick={() => this.deleteTask(t.id)}
        >
          Delete
        </button>
      </div>
    );
  };

  displayEditTask = (t) => {
    return (
      <div className="card py-2 px-4 gap-2 d-flex flex-row align-items-center">
        <input
          className="form-control"
          type="text"
          name="modifiedTaskName"
          value={this.state.modifiedTaskName}
          placeholder="Enter new description"
          onChange={this.updateFormField}
        />

        <button
          className="btn btn-success"
          onClick={() => {
            this.updateTask(t.id);
            this.setState({
              taskBeingEdited: 0,
            });
          }}
        >
          Update
        </button>
      </div>
    );
  };

  render() {
    return (
      <div className="container text-center">
        <h1>Todo List</h1>
        <div className="card p-4 mb-4">
          <h5 className="card-title">Create new Task</h5>
          <div className="d-flex gap-3">
            <label>Task Description</label>
            <input
              className="form-control"
              type="text"
              name="newTaskName"
              value={this.state.newTaskName}
              onChange={this.updateFormField}
            />
            <button className="btn btn-success" onClick={this.addTask}>
              Add
            </button>
          </div>
        </div>
        <h5>My Task List</h5>
        <div className="d-flex flex-column gap-3">
          {this.state.tasks.map((t) =>
            this.state.taskBeingEdited !== t.id
              ? this.displayTask(t)
              : this.displayEditTask(t)
          )}
        </div>
      </div>
    );
  }
}
