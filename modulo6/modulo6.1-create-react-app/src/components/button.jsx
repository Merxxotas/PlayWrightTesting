import { useState } from "react";
const Button = () => {
  const [message, setMessage] = useState("");
  const handleClick = () => {
    console.log("Botón clickeado");
    setMessage("¡Has hecho clic en el botón!");
  };
  return (
    <div>
      <button onClick={handleClick}>Click aquí</button>
      <p>{message}</p>
    </div>
  );
};

export default Button;
