import "./App.css";
import Button from "./components/button";
import DataFetching from "./components/DataFetching";
import Form from "./components/Form";
import Modal from "./components/Modal";
function App() {
  return (
    <div className="App">
      <h1>Hola Mundo</h1>
      <Button />
      <Form />
      <Modal />
      <DataFetching />
    </div>
  );
}

export default App;
