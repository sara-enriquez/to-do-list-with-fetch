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
      console.log("este es el getData ", data);
      setLoad(true);
    } catch (err) {
      console.log("err");
    }
  };

  useEffect(() => {
    getData();
    console.log("este es el useEffect del principio", getData());
  }, []);

  const addNewTask = async () => {
    try {
      const data = [...taskList, { label: newTask, done: false }];
      const response = await fetch(URL, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      console.log("este es el response de addNewTask ", response);
      console.log("este es el data de addNewTask ", data);
      getData();
      input.value = "";
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
    console.log("este es el newTaskList de deleteTask ", newTaskList);
    const response = await fetch(URL, {
      method: "PUT",
      body: JSON.stringify(newTaskList),
      headers: { "Content-Type": "application/json" },
    });
    getData();
    console.log("esta es la response de deleteTask ", response);
  };

  const doneTask = async (i) => {
    let newTaskList = [...taskList];
    newTaskList[i].done = !newTaskList[i].done;
    console.log("este es el newTaskList de doneTask ", newTaskList);
    const response = await fetch(URL, {
      method: "PUT",
      body: JSON.stringify(newTaskList),
      headers: { "Content-Type": "application/json" },
    });
    getData();
    console.log("esta es la response de doneTask ", response);
  };

  return (
    <div className="content-home container-fluid">
      <h1 className="title col-sm-md-lg">Lista de Tareas Pendientes :</h1>
      <div className="content-form input-group col-sm-md-lg">
        <input
          onChange={inputValue}
          type="text"
          placeholder="Escribir nueva tarea"
          id="input"
          className="input-task form-control col-sm-md-lg"
        ></input>
        <button className="btn btn-outline-secondary col-sm-md-lg" onClick={addNewTask}>
          Añadir
        </button>
      </div>
      <ul className="list col-sm-md-lg">
        {load ? (
          taskList.map((task, i) => {
            return (
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
          <h1 className="loading">
            Loading <i class="fa-solid fa-spinner"></i>
          </h1>
        )}
      </ul>
    </div>
  );
};

export default Home;
