import { useState } from "react";

const Form = () => {
  const [inputValue, setInputValue] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedValue, setSubmittedValue] = useState("");

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedValue(inputValue);
    setIsSubmitted(true);
    console.log(`Formulario enviado con el valor: ${inputValue}`);
    alert(`Formulario enviado con el valor: ${inputValue}`);
    setInputValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Escribe algo..."
      />
      <button type="submit">Enviar</button>
      {isSubmitted && <div id="out">{submittedValue}</div>}
    </form>
  );
};

export default Form;
