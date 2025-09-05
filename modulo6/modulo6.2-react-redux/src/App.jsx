import "./App.css";
import AddTodo from "./components/AddTodo";
import Counter from "./components/Counter";
import SpyFunc from "./components/SpyFunc";
import TodoList from "./components/TodoList";
import ToggleTheme from "./components/ToggleTheme";
import { ThemeProvider } from "./context/Theme";

function App() {
  return (
    <ThemeProvider>
      <div>
        <ToggleTheme />
        <h1>TODO APP</h1>
        <AddTodo />
        <TodoList />
        <Counter />
        <SpyFunc />
      </div>
    </ThemeProvider>
  );
}

export default App;
