import { useEffect, useState } from "react";
import { fetchTasks } from "../../api/tasks.js";
import type { Task } from "../../types/task.types.js";

function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTasks()
      .then((data) => setTasks(data))
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : "Failed to load tasks.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p>Loading tasks...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (tasks.length === 0) {
    return <p>No tasks yet.</p>;
  }

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <strong>{task.title}</strong> — {task.status} — {task.priority}
        </li>
      ))}
    </ul>
  );
}

export default TaskList;