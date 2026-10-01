import { useState } from "react";
import TaskList from "./features/tasks/TaskList.js";
import CreateTaskForm from "./features/tasks/CreateTaskForm.js";

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  function handleRefresh(): void {
    setRefreshKey((key) => key + 1);
  }

  return (
    <div className="app">
      <h1 className="app-title">Task Manager</h1>
      <CreateTaskForm onCreated={handleRefresh} />
      <TaskList refreshKey={refreshKey} onChanged={handleRefresh} />
    </div>
  );
}

export default App;