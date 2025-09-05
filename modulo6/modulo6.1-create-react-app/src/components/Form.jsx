// Importa el hook useState de React para manejar el estado del componente
import { useState } from "react";

/**
 * Componente Formulario que permite al usuario ingresar texto y enviarlo.
 * Muestra el valor enviado después de la confirmación.
 */
const Form = () => {
  // Estado para almacenar el valor actual del input
  const [inputValue, setInputValue] = useState("");
  // Estado para saber si el formulario fue enviado
  const [isSubmitted, setIsSubmitted] = useState(false);
  // Estado para guardar el valor enviado
  const [submittedValue, setSubmittedValue] = useState("");

  /**
   * Maneja el cambio en el input y actualiza el estado con el nuevo valor
   * @param {object} e - Evento de cambio del input
   */
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  /**
   * Maneja el envío del formulario
   * - Previene el comportamiento por defecto
   * - Guarda el valor enviado
   * - Muestra una alerta y limpia el input
   * @param {object} e - Evento de envío del formulario
   */
  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que la página se recargue
    setSubmittedValue(inputValue); // Guarda el valor enviado
    setIsSubmitted(true); // Marca que el formulario fue enviado
    console.log(`Formulario enviado con el valor: ${inputValue}`); // Muestra en consola
    alert(`Formulario enviado con el valor: ${inputValue}`); // Muestra alerta al usuario
    setInputValue(""); // Limpia el campo de texto
  };

  // Renderiza el formulario y muestra el valor enviado si corresponde
  return (
    <form onSubmit={handleSubmit}>
      {/* Campo de texto controlado por el estado inputValue */}
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Escribe algo..."
      />
      {/* Botón para enviar el formulario */}
      <button type="submit">Enviar</button>
      {/* Muestra el valor enviado si el formulario fue enviado */}
      {isSubmitted && <div id="out">{submittedValue}</div>}
    </form>
  );
};

// Exporta el componente para su uso en otras partes de la aplicación
export default Form;
