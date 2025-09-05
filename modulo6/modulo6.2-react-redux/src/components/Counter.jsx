import useCounter from "../hooks/useCounter";

const Counter = () => {
  const { count, decrement, increment } = useCounter();

  return (
    <div>
      <p>Contador: {count}</p>
      <button onClick={increment}>Incrementar</button>
      <button onClick={decrement}>Decrementar</button>
    </div>
  );
};

export default Counter;
