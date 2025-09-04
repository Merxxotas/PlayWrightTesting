import { useEffect, useState } from "react";

const DataFetching = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos/1")
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);
  return (
    <div>
      <h2>{data ? data.title : "Cargando..."}</h2>
    </div>
  );
};

export default DataFetching;
