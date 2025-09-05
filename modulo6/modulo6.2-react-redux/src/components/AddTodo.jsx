import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../features/todoSlice";

/**
 * Componente AddTodo
 *
 * Permite al usuario agregar una nueva tarea ("todo") a la lista.
 * Utiliza el estado local para manejar el valor del input y Redux para despachar la acción de agregar.
 *
 * @component
 *
 * @returns {JSX.Element} Formulario para añadir un nuevo todo.
 *
 * @example
 * <AddTodo />
 *
 * @function
 * @name AddTodo
 *
 * @description
 * - El input almacena el texto de la nueva tarea.
 * - Al enviar el formulario, si el texto no está vacío, se despacha la acción `addTodo` y se limpia el input.
 *
 * @see useState - Hook de React para manejar el estado local del input.
 * @see useDispatch - Hook de React-Redux para despachar acciones.
 *
 * @event handleSubmit
 * @param {React.FormEvent<HTMLFormElement>} e - Evento de envío del formulario.
 * @description Previene el comportamiento por defecto y despacha la acción si el input no está vacío.
 */
const AddTodo = () => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      dispatch(addTodo(input));
      setInput("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Añadir un todo"
      />
      <button type="submit">Añadir</button>
    </form>
  );
};

export default AddTodo;
