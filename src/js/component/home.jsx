import React, {useState, useEffect} from "react";


//create your first component
const Home = () => {
const [todo,setTodo] = useState("")
const [todos, setTodos] = useState([])
const [donestate, setDonestate] = useState(false)

function getTodos () {
	fetch("https://playground.4geeks.com/todo/users/MatiRosas31")
	.then((resp)=>{
		console.log("Archivo como json: ",resp.status)
		return resp.json()
	})
	.then((data)=>{
		console.log("Archivo como objeto de JS: ", data)
		setTodos(data.todos)
	})
	.catch((error) => {return error})
}

useEffect(()=>{
	getTodos()
},[]);

function addTodo (todoLabel) {
	if (todoLabel !== "") {
		let newTask = {
			label: todoLabel,
			is_done: false
		}
		fetch ("https://playground.4geeks.com/todo/todos/MatiRosas31", {
			method: "POST",
			body: JSON.stringify(newTask),
			headers: {
				"Content-Type": "application/json"
			}
		})
		.then(resp => {
			console.log(resp.ok); 
			console.log(resp.status); 
			console.log(resp.text()); 
			return resp.json(); 
		})
		.then(data => {
			console.log(data);
	
		})
		.catch(error => {
			console.error(error);
	
		});
	}
}
function removeTodo(index) {
	todos.map((value)=> {
		if (value.id === index) {
			fetch(`https://playground.4geeks.com/todo/todos/${index}`, {

				method: "DELETE",
		  
				body: JSON.stringify(todos),
		  
				headers: {
		  
				  "Content-Type": "application/json"
		  
				}
				
			  })
			  .then(resp => {
				if (resp.status === 204) {
					getTodos()
				}
				console.log(resp.ok); 
				console.log(resp.status); 
				console.log(resp.text()); 
			})
			.catch((error)=>{
				console.log(error)
			})
		}
	})
}

function changeCheckboxStatus (e, todoId) {
	const isChecked = e.target.checked;
	let updatedstatus = {
		is_done: isChecked
	};
todos.map((value)=> {
	if (value.id === todoId) {
		fetch(`https://playground.4geeks.com/todo/todos/${todoId}`, {
			method: "PUT",
			body: JSON.stringify(updatedstatus),
			headers: {
				"Content-Type": "application/json"
			}
			.then(resp => {
				if (resp.status === 204) {
					getTodos()
				}
			})
			.catch(error => {
				console.log(error);
			})
	
		})
	}
})
	
}

const handleKeyDown = (e, todo) => {
	if (e.key === 'Enter') { 
	  e.preventDefault();
	  addTodo(todo); 
	}
  };
  
	return (
		<>
		<div className="text-center container mt-5">
			<h1 className="mytitle text-black-50">todos</h1>
			<div className="card shadow pb-2 pe-2 rounded"> 
			<div className="card pb-2 pe-1">
			<div className="card pb-1 me-1">
				<ul className="list-group list-group-flush">
					<li className="list-group-item"> 
						<input className="form-control" placeholder="What needs to be done?" value={todo} onChange={(e) => setTodo(e.target.value)} onKeyDown={(e) => handleKeyDown(e, todo)} 
						/>
					</li>
					{todos.map((item,index) => (
						<li key={index} className="list-group-item d-flex justify-content-between align-items-start">
						<div className="d-flex align-items-center">
							<div className="form-check">
  								<input className="form-check-input" type="checkbox"  checked={item.is_done}  onChange={(e) => changeCheckboxStatus(e, item.id)} />
  									<label className="form-check-label" htmlFor="flexCheckDefault">
  									</label>
								</div>
								<span className="ms-2">{item.label}</span>
							</div>
						<button onClick={()=> removeTodo(item.id) }  className="boton boton-danger me-2" >X</button>
						</li>
					))}
				</ul>
				<div className="row text-start">
				<span className="ms-1 text-secondary">{todos.length < 1 ? "No hay tareas, añadir tareas" : todos.length + " items" +  " left"}</span>
				</div>
			</div>
			</div>				
			</div>
		</div>
		</>
	);
};

export default Home;
