import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import { useState, useEffect } from "react";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./components/About";

function App() {
  // States
  const [formDisplayed, setFormDisplayed] = useState(false);
  const [tasks, setTasks] = useState([]);

  // useEffect

  useEffect(() => {
    const loadTasksFromServer = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };
    loadTasksFromServer();
  }, []);

  // Functions
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks");
    const data = await res.json();
    return data;
  };

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();
    return data;
  };

  const deleteTask = async (id) => {
    //Delete from server
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE",
    });

    //delete from ui directly (to avoid reload data from server which take longer time)
    setTasks(tasks.filter((task) => task.id != id));
  };

  const toggleReminder = async (id) => {
    const updatedTask = tasks.find((obj) => obj.id === id);
    console.log("updatedTask is : ", updatedTask);

    updatedTask.reminder = !updatedTask.reminder;

    console.log("updatedTask NEW  is :  ", updatedTask);

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    });

    const data = await res.json();

    // update ui
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    );
  };

  const handleOnAdd = async (newTask) => {
    // add to server
    const res = await fetch(`http://localhost:5000/tasks`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newTask),
    });

    // To update data to ui we can use 1 of the 2 methods below:

    // Method 1:  wait for data response from the server and then update state to reflect on ui
    const data = await res.json(); // convert data to object
    setTasks([...tasks, data]);

    // Method 2: add to ui directly without waiting for data response from the server back
    // const temp = [...tasks];
    // temp.push(newTask);
    // setTasks(temp);
  };

  const toggleForm = () => {
    console.log("toggleForm");
    setFormDisplayed(!formDisplayed);
  };

  return (
    <BrowserRouter>
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header
                  title={"Task Tracker"}
                  toggleForm={toggleForm}
                  formDisplayed={formDisplayed}
                />
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
                      color: "violet",
                    }}
                  >
                    {" "}
                    No task to show !{" "}
                  </h3>
                )}
              </>
            }
          />
          <Route path="/about" element={<About />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
