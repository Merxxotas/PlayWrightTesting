import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

/**
 * Proveedor de contexto para el tema de la aplicación.
 * Permite alternar entre los temas "light" y "dark".
 *
 * @param {Object} props - Propiedades del componente.
 * @param {React.ReactNode} props.children - Elementos hijos que recibirán el contexto.
 *
 * @returns {JSX.Element} Componente ThemeContext.Provider con el valor del tema y la función para alternarlo.
 */

/**
 * Estado que almacena el tema actual de la aplicación.
 * @type {string}
 */

/**
 * Función que alterna el tema entre "light" y "dark".
 * @function
 */
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
