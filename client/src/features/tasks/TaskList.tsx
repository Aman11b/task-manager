import { useEffect, useState } from "react";
import { fetchTasks } from "../../api/tasks.js";
import type { Task } from "../../types/task.types.js";

type TaskListProps = {
  refreshKey: number;
};

function TaskList({ refreshKey }: TaskListProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchTasks()
      .then((data) => setTasks(data))
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : "Failed to load tasks.");
      })
      .finally(() => setLoading(false));
  }, [refreshKey]);

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
    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task.id} className="task-card">
          <div className="task-card-title">{task.title}</div>
          <div>
            <span className={`badge badge-${task.status}`}>{task.status}</span>
            <span className={`badge badge-${task.priority}`}>{task.priority}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;