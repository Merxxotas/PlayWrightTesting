import { useTheme } from "../context/Theme";

/**
 * Componente ToggleTheme
 *
 * Permite al usuario alternar entre los temas "light" y "dark".
 * Utiliza el contexto `useTheme` para obtener el tema actual y la función para cambiarlo.
 *
 * @returns {JSX.Element} Un contenedor que muestra el tema actual y un botón para cambiarlo.
 *
 * @const {string} theme - Tema actual, puede ser "light" o "dark".
 * @const {function} toggleTheme - Función que alterna el tema entre "light" y "dark".
 *
 * El estilo del contenedor cambia dinámicamente según el tema seleccionado.
 * El botón ejecuta la función `toggleTheme` al hacer clic.
 */
const ToggleTheme = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      style={{
        background: theme === "light" ? "white" : "black",
        color: theme === "light" ? "black" : "white",
      }}
    >
      <p>Tema Actual: {theme}</p>
      <button onClick={toggleTheme}>Cambiar Tema</button>
    </div>
  );
};

export default ToggleTheme;
