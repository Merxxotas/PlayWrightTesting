import { useState } from "react";

const useCounter = (intialValue = 0) => {
  const [count, setCount] = useState(intialValue);

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => prev - 1);

  return { count, increment, decrement };
};

export default useCounter;
