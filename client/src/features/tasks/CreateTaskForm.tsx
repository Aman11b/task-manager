import { useState } from "react";
import type { FormEvent } from "react";
import { createTask } from "../../api/tasks.js";

type CreateTaskFormProps = {
  onCreated: () => void;
};

function CreateTaskForm({ onCreated }: CreateTaskFormProps) {
  const [title, setTitle] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    if (title.trim().length < 3) {
      setError("Title must be at least 3 characters.");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      await createTask({ title: title.trim() });
      setTitle("");
      onCreated();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to create task.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="New task title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      {error && <p className="task-form-error">{error}</p>}
      <button type="submit" disabled={submitting}>
        {submitting ? "Adding..." : "Add Task"}
      </button>
    </form>
  );
}

export default CreateTaskForm;