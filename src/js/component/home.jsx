import React, {useState} from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
const [todo,setTodo] = useState("")
const [arrtodos, setTodos] = useState(
	["Make the bed","Wash my hands", "Eat", "Walk the dog"]
)
const addTodo = (e) => {
    if (e.key === "Enter" && todo !== "") {
		//Se hace una copia del array arrtodos y se le agrega el nuevo item (todo)
      setTodos([...arrtodos, todo]);
	  //Para limpiar lo que haya escrito el user
      setTodo("");
    }
  };

  const removeTodo = (index) => {
	const todosCopy = [...arrtodos];
	todosCopy.splice(index, 1);
	setTodos(todosCopy)
  }
	return (
		<>
		<div className="text-center container mt-5">
			<h1 className="title">My ToDo List</h1>
			<div className="card">
				<ul className="list-group list-group-flush">
					<li className="list-group-item"> 
						<input className="form-control" placeholder="What needs to be done?" value={todo} 
						onChange={(e) => setTodo(e.target.value)}
						onKeyPress={addTodo}
						/>
					</li>
					{arrtodos.map((item,index) => (
						<li key={index} className="list-group-item d-flex justify-content-between align-items-center">
						{item}
						<button className="btn btn-danger me-2" onClick={()=> removeTodo(index)}>X</button>
						</li>
					))}
				</ul>
			</div>
			<span>{arrtodos.length} items left</span>
		</div>
		</>
	);
};

export default Home;
