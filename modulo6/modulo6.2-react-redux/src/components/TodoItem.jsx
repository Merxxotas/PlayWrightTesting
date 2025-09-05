import { useDispatch } from "react-redux";
import { deleteTodo, toggleTodo } from "../features/todoSlice";

/**
 * Componente que representa un ítem de la lista de tareas (todo).
 *
 * @param {Object} props - Propiedades del componente.
 * @param {number|string} props.id - Identificador único de la tarea.
 * @param {string} props.text - Texto descriptivo de la tarea.
 * @param {boolean} props.completed - Indica si la tarea está completada.
 *
 * @returns {JSX.Element} Elemento de lista que muestra la tarea, con botones para completar/deshacer y eliminar.
 *
 * @description
 * - Muestra el texto de la tarea con un estilo tachado si está completada.
 * - Permite marcar la tarea como completada o deshacer la acción mediante un botón.
 * - Permite eliminar la tarea mediante otro botón.
 * - Utiliza el hook `useDispatch` de Redux para enviar acciones al store.
 */
const TodoItem = ({ id, text, completed }) => {
  const dispatch = useDispatch();

  return (
    <li style={{ textDecoration: completed ? "line-through" : "none" }}>
      {text}
      <button onClick={() => dispatch(toggleTodo(id))}>
        {completed ? "Undo" : "Completar (Tachar)"}
      </button>
      <button onClick={() => dispatch(deleteTodo(id))}>Borrar</button>
    </li>
  );
};

export default TodoItem;
