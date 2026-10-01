import { useEffect, useState } from "react";
import { fetchTasks, updateTask, deleteTask } from "../../api/tasks.js";
import type { Task, TaskStatus, TaskPriority } from "../../types/task.types.js";

type TaskListProps = {
  refreshKey: number;
  onChanged: () => void;
};

const STATUS_OPTIONS: TaskStatus[] = ["TODO", "IN_PROGRESS", "COMPLETED"];
const PRIORITY_OPTIONS: TaskPriority[] = ["LOW", "MEDIUM", "HIGH"];

function TaskList({ refreshKey, onChanged }: TaskListProps) {
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

  async function handleStatusChange(id: string, status: TaskStatus): Promise<void> {
    try {
      await updateTask(id, { status });
      onChanged();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Failed to update status.");
    }
  }

  async function handlePriorityChange(id: string, priority: TaskPriority): Promise<void> {
    try {
      await updateTask(id, { priority });
      onChanged();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Failed to update priority.");
    }
  }

  async function handleDelete(id: string, title: string): Promise<void> {
    const confirmed = window.confirm(`Delete "${title}"? This cannot be undone.`);
    if (!confirmed) {
      return;
    }
    try {
      await deleteTask(id);
      onChanged();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Failed to delete task.");
    }
  }

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
          <div className="task-card-controls">
            <select
              value={task.status}
              onChange={(event) =>
                handleStatusChange(task.id, event.target.value as TaskStatus)
              }
              className={`badge badge-${task.status}`}
            >
              {STATUS_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <select
              value={task.priority}
              onChange={(event) =>
                handlePriorityChange(task.id, event.target.value as TaskPriority)
              }
              className={`badge badge-${task.priority}`}
            >
              {PRIORITY_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <button
              type="button"
              className="task-delete-btn"
              onClick={() => handleDelete(task.id, task.title)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;