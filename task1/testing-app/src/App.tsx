import "./App.css";
import {TodoList} from "./components/TodoList";

function App() {
  return (
    <div className="appContainer">
      {/*Главный компонент приложения */}
      <TodoList />
    </div>
  )
}

export default App;