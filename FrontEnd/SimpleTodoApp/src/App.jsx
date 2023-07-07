import React, { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import astronautImage from "./assets/images/an-astronaut-chilling-in-outer-space-with-food-and-beverage-colored-illustration-of-the-imaginative-nuance-in-cartoon-for-poster-promotion-and-many-more-free-vector.jpg";
import "./App.css";

async function fetchTodos() {
  try {
    const response = await fetch("http://localhost:3000/todos", {
      method: "GET",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

function App() {
  const [todo, setTodo] = React.useState([]);

  React.useEffect(() => {
    fetchTodos().then((data) => {
      setTodo(data);
    });
  }, []);

  const deleteTodo = async (id) => {
    await fetch("http://localhost:3000/todos/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    var data = await fetchTodos();
    setTodo(data);
  };
  return (
    <>
      <h1>"Todo Application"</h1>
      <div>
        <div
          style={{
            width: "830px",
            backgroundColor: "white",
            height: "400px",
            overflow: "auto",
            border: "2px",
            borderRadius: "10px",
            boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
          }}
        >
          {todo.length === 0 ? (
            <>
              <img
                src={astronautImage}
                alt="Astronaut"
                style={{ marginTop: "60px" }}
              />
              <h2 style={{ fontFamily: "Amita", alignContent: "center" }}>
                Go Watch a Movie nothing TODO!!.
              </h2>
            </>
          ) : (
            todo.map((val) => (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "180px 535px 115px",
                  gridColumnGap: "10px",
                  borderRadius: "10px",
                  marginTop: "15px",
                }}
              >
                <span
                  style={{
                    marginLeft: "10px",
                    backgroundColor: "#FFEBCD",
                    borderRadius: "3px",
                    fontSize: "18px",
                  }}
                >
                  {val.title}
                </span>
                <span
                  style={{
                    backgroundColor: "#FFEBCD",
                    borderRadius: "3px",
                    fontSize: "18px",
                  }}
                >
                  {val.description}
                </span>
                <button
                  style={{ backgroundColor: "#F08080", marginRight: "30px" }}
                  onClick={() => deleteTodo(val.id)}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
        <AddTodo todo={todo} setTodo={setTodo}></AddTodo>
      </div>
    </>
  );
}

function AddTodo(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const getTitle = (e) => {
    setTitle(e.target.value);
  };

  const getDescription = (e) => {
    setDescription(e.target.value);
  };

  const postTodo = async () => {
    if (title == "" || description == "") {
      alert("title or description is empty");
      return;
    }
    await fetch("http://localhost:3000/todos", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        description: description,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setTitle("");
    setDescription("");
    const data = await fetchTodos();
    props.setTodo(data);
  };

  return (
    <div>
      <input
        onChange={getTitle}
        type="text"
        placeholder="title"
        value={title}
        style={{
          fontSize: "16px",
          width: "170px",
          height: "37px",
          border: "1px",
          borderRadius: "8px",
        }}
      ></input>
      <input
        onChange={getDescription}
        type="text"
        placeholder="description"
        value={description}
        style={{
          fontSize: "16px",
          width: "520px",
          height: "37px",
          border: "1px",
          marginLeft: "6px",
          borderRadius: "8px",
        }}
      ></input>
      <button
        style={{ marginTop: "10px", marginLeft: "6px" }}
        onClick={postTodo}
      >
        Add Todo
      </button>
    </div>
  );
}

export default App;
