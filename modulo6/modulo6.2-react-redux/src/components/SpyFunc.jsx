const SpyFunc = () => {
  const handleClick = () => {
    alert("Botón clickeado");
    console.log("Botón fue clickeado");
    if (window.__spy) {
      window.__spy();
    }
  };
  return <button onClick={handleClick}>Clickeame</button>;
};

export default SpyFunc;
