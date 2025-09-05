import { useSelector } from "react-redux";
import TodoItem from "./TodoItem";

/**
 * Componente TodoList.
 *
 * Renderiza una lista de tareas obtenidas del estado global de Redux.
 * Utiliza el selector `useSelector` para acceder al estado `todos`.
 * Por cada tarea en la lista, renderiza un componente `TodoItem`.
 *
 * @returns {JSX.Element} Una lista desordenada (<ul>) de componentes TodoItem.
 */
const TodoList = () => {
  const todos = useSelector((state) => state.todos);

  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem key={todo.id} {...todo} />
      ))}
    </ul>
  );
};

export default TodoList;
