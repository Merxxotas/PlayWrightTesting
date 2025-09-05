import { createSlice } from "@reduxjs/toolkit";

/**
 * Slice de Redux para gestionar la lista de tareas (todos).
 * @module todoSlice
 */

/**
 * Estado inicial de la lista de tareas.
 * @type {Array<Object>}
 */

/**
 * Agrega una nueva tarea a la lista.
 * @function
 * @param {Array<Object>} state - Estado actual de la lista de tareas.
 * @param {Object} action - Acción de Redux que contiene el texto de la tarea en el payload.
 */

/**
 * Cambia el estado de completado de una tarea específica.
 * @function
 * @param {Array<Object>} state - Estado actual de la lista de tareas.
 * @param {Object} action - Acción de Redux que contiene el id de la tarea en el payload.
 */

/**
 * Elimina una tarea de la lista según su id.
 * @function
 * @param {Array<Object>} state - Estado actual de la lista de tareas.
 * @param {Object} action - Acción de Redux que contiene el id de la tarea a eliminar en el payload.
 * @returns {Array<Object>} Nuevo estado de la lista de tareas sin la tarea eliminada.
 */
export const todoSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      state.push({ id: Date.now(), text: action.payload, completed: false });
    },
    toggleTodo: (state, action) => {
      const todo = state.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload);
    },
  },
});

export const { addTodo, toggleTodo, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;
