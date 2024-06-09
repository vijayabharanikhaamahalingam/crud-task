import { useLoaderData } from "react-router-dom";
import TodoItem from "../components/TodoItem";
import { useState } from "react";
import axios from "axios";


export const loader = async () => {

    const todos = await axios.get(`https://665eb3431e9017dc16f0f97b.mockapi.io/todos`);


    return {todos: todos.data };
}

const Todos = () => {

    const { todos: initialTodos } = useLoaderData();
    const [todos, setTodos] = useState(initialTodos);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [completed, setCompleted] = useState(false);

    const handleUpdateTodo = (updatedTodo) => {
        setTodos(todos.map(todo => (todo.id === updatedTodo.id ? updatedTodo : todo)));
    }

    const handleCreateTodo = async (e) => {
        e.preventDefault();

    
        const newTodo = {
            title,
            description,
            completed
        }

        // api call to create a new todo
        const response = await axios.post(`https://665eb3431e9017dc16f0f97b.mockapi.io/todos`, newTodo);

        if (response) {
            setTitle('');
            setDescription('');
            setCompleted(false);

            // update the state
            response.data && setTodos([...todos, response.data]);

            alert('Todo created successfully!');
        }
    }

    const handleDeleteTodo = async (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    }   

  return (
      <div>
        <h1>Todo List</h1>
        {
            todos.map(todo => (
                <TodoItem 
                    todo={todo}
                    key={todo.id}
                    onUpdateTodo={handleUpdateTodo}
                    onDeleteTodo={handleDeleteTodo}
                />
            ))
          }
          
          <form onSubmit={handleCreateTodo}>
              <input className="ms-1"
                  type="text"
                  placeholder="Todo title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
              />
              
              <input className="ms-3"
                    type="text"
                  placeholder="Todo description..."
                  value={description}
                    onChange={(e) => setDescription(e.target.value)}
              />

              <select className="ms-3"
                    value={completed}
                    onChange={(e) => setCompleted(e.target.value)}
              >
                  <option 
                    value={false}
                  >Not Completed</option>
                  <option
                    value={true}
                  >Completed</option>
              </select>

                <button type="submit" className="ms-3">Add Todo</button>
          </form>
    </div>
  )
}

export default Todos;