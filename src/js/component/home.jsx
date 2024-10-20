import React, { useState, useEffect } from "react";

const Home = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    checkUser()
  }, []);

  function checkUser(){
    fetch("https://playground.4geeks.com/todo/users?offset=0&limit=100")
    .then((resp) => resp.json())
    .then((data) => {
      const foundUser = data.users.find((item => item.name === "MatiRosas31"));
      if (foundUser) {
        console.log("Usuario encontrado: ", foundUser);
        getTodos();
      } else {
        console.log("Usuario no encontrado: Creando usario... ");
        let newUser = {
          name: "MatiRosas31"
        };
        fetch("https://playground.4geeks.com/todo/users/MatiRosas31", {
          method: "POST",
          body: JSON.stringify(newUser),
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((resp) => {
          console.log(resp.ok);
          console.log(resp.status);
          return resp.json();
        })
        .then((user) => {
          console.log("Usuario creado: ", user);
          getTodos();
        })
        .catch((error) => console.error(error));
      }
    })
  }

  function getTodos() {
    fetch("https://playground.4geeks.com/todo/users/MatiRosas31")
      .then((resp) => resp.json())
      .then((data) => setTodos(data.todos))
      .catch((error) => console.error(error));
  }

  function addTodo(todoLabel) {
    if (todoLabel !== "") {
      let newTask = {
        label: todoLabel,
        is_done: false,
      };
      fetch("https://playground.4geeks.com/todo/todos/MatiRosas31", {
        method: "POST",
        body: JSON.stringify(newTask),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then(() => {
          setTodos((prevTodos) => [...prevTodos, newTask]); //copia del array pero se agrega la nueva task/to-do
          setTodo("");
        })
        .catch((error) => console.error(error));
    }
  }

  function removeTodo(todoId) {
    fetch(`https://playground.4geeks.com/todo/todos/${todoId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        if (resp.status === 204) {
          setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId));//La función filter se usa para crear un nuevo array que contiene solo los elementos cuyo id no coincide con todoId (es decir, la tarea a eliminar).
        }
      })
      .catch((error) => console.error(error));
  }

  function changeCheckboxStatus(e, todoId) {
    const isChecked = e.target.checked;

    const updatedTodos = todos.map((todo) => {
		if (todo.id === todoId) {
		  return { ...todo, is_done: isChecked }; // Si coincide el id, actualiza la tarea
		} else {
		  return todo; // Si no coincide, devuelve la tarea original sin cambios
		}
	  });
	  
	  setTodos(updatedTodos); // Actualiza el estado con el array modificado

    fetch(`https://playground.4geeks.com/todo/todos/${todoId}`, {
      method: "PUT",
      body: JSON.stringify({ is_done: isChecked }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log("Updated response:", data);
      })
      .catch((error) => console.error(error));
  }

  const handleKeyDown = (e, todo) => {
    if (e.key === "Enter") {
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
                  <input
                    className="form-control"
                    placeholder="What needs to be done?"
                    value={todo}
                    onChange={(e) => setTodo(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, todo)}
                  />
                </li>
                {todos.map((item, index) => (
                  <li
                    key={index}
                    className="list-group-item d-flex justify-content-between align-items-start"
                  >
                    <div className="d-flex align-items-center">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={item.is_done}
                          onChange={(e) => changeCheckboxStatus(e, item.id)}
                        />
                      </div>
                      <span className="ms-2">{item.label}</span>
                    </div>
                    <button
                      onClick={() => removeTodo(item.id)}
                      className="boton boton-danger me-2"
                    >
                      X
                    </button>
                  </li>
                ))}
              </ul>
              <div className="row text-start">
                <span className="ms-2 text-secondary fw-semibold">
                  {todos.length < 1
                    ? "No hay tareas, añade una tarea"
                    : todos.length + " items left"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;