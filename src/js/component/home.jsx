import React, {useState} from "react";


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
			<h1 className="mytitle text-black-50">todos</h1>
			<div className="card shadow pb-2 pe-2 rounded"> 
			<div className="card pb-2 pe-1">
			<div className="card pb-1 me-1">
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
						<button className="boton boton-danger me-2" onClick={()=> removeTodo(index)}>X</button>
						</li>
					))}
				</ul>
				<div className="row text-start">
				<span className="ms-1 text-secondary">{arrtodos.length < 1 ? "No hay tareas, añadir tareas" : arrtodos.length + " items" +  " left"}</span>
				</div>
			</div>
			</div>				
			</div>
			
			
		</div>
		</>
	);
};

export default Home;
