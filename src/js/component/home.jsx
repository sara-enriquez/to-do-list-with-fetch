import React, { useEffect, useState } from "react";

const URL = "https://assets.breatheco.de/apis/fake/todos/user/sara-enriquez";

const Home = () => {
  const [state, setState] = useState([]);
  const [load, setLoad] = useState(false);
  const [newTask, setNewTask] = useState("");


  const getData = async () =>{
	try {
		const response = await fetch(URL, { method: "GET" });
		const data = await response.json();
		setState(data);
		console.log(data);
		setLoad(true);
	  } catch (err) {
		console.log("err");
	  }
  }
  useEffect(() => {
  getData()
  }, []);


  const addNewTask = async () => {
  try {
	const data =[...state, {label: newTask, done: false}]
	const response = await fetch(URL, { method: "PUT", body: JSON.stringify(data), headers:{"Content-Type": "application/json"}});
	console.log(response);
	getData();
} catch (err) {
	console.log("err");
  }
}

  const inputValue = (e) => {
     setNewTask(e.target.value)
  }

  console.log(load);
  return (
	<div>
		<input onChange={inputValue} type="text" placeholder="Add New Task"></input>
		<button onClick={addNewTask}>Add New Task</button>
		{load ? state.map((task)=>{
			return <h1>{task.label}</h1>
		}):<h1>loading</h1>}
	</div>
  );
};

export default Home;
