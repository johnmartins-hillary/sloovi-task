import "./App.css";
import CreateTask from "./components/CreateTask";
import AllTasks from "./components/AllTasks";

function App() {
  return (
    <div className="App">
    <div className="app-logo">TASKY</div>
      <CreateTask />
      <AllTasks />
    </div>
  );
}

export default App;
