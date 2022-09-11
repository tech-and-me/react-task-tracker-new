import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import { useState } from "react";
import AddTask from "./components/AddTask";

function App() {
  const [formDisplayed, setFormDisplayed] = useState(false);
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: "Doctor Appointment",
      day: "Feb 5th at 2:30pm",
      reminder: false,
    },
    {
      id: 2,
      text: "Flight checkin for mum&dad",
      day: "Sep 10th at 10:30pm",
      reminder: true,
    },
    {
      id: 3,
      text: "Pickup mum&dad from airport",
      day: "Sep 12th at 9:00pm",
      reminder: true,
    },
  ]);

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id != id));
  };

  const toggleReminder = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: !task.reminder } : task
      )
    );
  };

  const handleOnAdd = (newTask) => {
    const temp = [...tasks];
    temp.push(newTask);
    setTasks(temp);
  };

  const toggleForm = () => {
    console.log("toggleForm");
    setFormDisplayed(!formDisplayed);
  };

  return (
    <div className="container">
      <Header title={"Task Tracker"} toggleForm={toggleForm} formDisplayed={formDisplayed} />

      {formDisplayed && <AddTask handleOnAdd={handleOnAdd} />}

      {tasks?.length > 0 ? (
        <Tasks
          tasks={tasks}
          onDelete={deleteTask}
          toggleReminder={toggleReminder}
        />
      ) : (
        <h3
          style={{
            fontStyle: "italic",
            textAlign: "center",
            margin: "3rem",
            color: "blue",
          }}
        >
          {" "}
          No task to show !{" "}
        </h3>
      )}
    </div>
  );
}

export default App;
