import React, { useEffect, useState } from "react";

const URL = "https://assets.breatheco.de/apis/fake/todos/user/sara-enriquez";

const Home = () => {
  const [taskList, setTaskList] = useState([]);
  const [load, setLoad] = useState(false);
  const [newTask, setNewTask] = useState("");

  const getData = async () => {
    try {
      const response = await fetch(URL, { method: "GET" });
      const data = await response.json();
      setTaskList(data);
      setLoad(true);
    } catch (err) {
      console.log("err");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const addNewTask = async () => {
    try {
      const data = [...taskList, { label: newTask, done: false }];
      setLoad(false);
      await fetch(URL, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      setLoad(true);
      getData();
      inputTask.value = "";
    } catch (err) {
      console.log("err");
    }
  };

  const inputValue = (e) => {
    setNewTask(e.target.value);
  };

  const deleteTask = async (i) => {
    let newTaskList = [...taskList];
    newTaskList.splice(i, 1);
    setLoad(false);
    await fetch(URL, {
      method: "PUT",
      body: JSON.stringify(newTaskList),
      headers: { "Content-Type": "application/json" },
    });
    setTaskList(newTaskList);
    setLoad(true);
    getData();
  };

  const doneTask = async (i) => {
    let newTaskList = [...taskList];
    newTaskList[i].done = !newTaskList[i].done;
    setLoad(false);
    await fetch(URL, {
      method: "PUT",
      body: JSON.stringify(newTaskList),
      headers: { "Content-Type": "application/json" },
    });
    setLoad(true);
    getData();
  };

  return (
    <div className="content-home container-fluid">
      <h1 className="title">Mis tareas pendientes</h1>
      <div className="content-form input-group">
        <input
          onChange={inputValue}
          type="text"
          placeholder="Escribir nueva tarea"
          id="inputTask"
          className="input-task form-control"
        ></input>
        <button className="btn btn-outline" onClick={addNewTask}>
          Añadir
        </button>
      </div>
      <ul className={taskList.length >= 2 ? "list" : "list-with-no-task"}>
        {load ? (
          taskList.map((task, i) => {
            return i == 0 ? null : (
              <li className={task.done ? "li-done" : "li-undone"}>
                {task.label}
                <i
                  onClick={() => deleteTask(i)}
                  className="fa-regular fa-trash-can"
                ></i>
                <i
                  onClick={() => doneTask(i)}
                  className={
                    task.done
                      ? "fa-solid fa-circle-check"
                      : "fa-regular fa-circle-check"
                  }
                ></i>
              </li>
            );
          })
        ) : (
          <li className="loading">
            Cargando...
            <div
              class="spinner-border spinner-border-sm text-warning"
              role="status"
            >
              <span class="visually-hidden">Loading...</span>
            </div>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Home;
