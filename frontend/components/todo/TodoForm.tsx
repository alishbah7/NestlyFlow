// frontend/components/todo/TodoForm.tsx
import React, { useState, useEffect } from 'react';
import './todo.css';

interface TodoFormProps {
  initialData?: {
    id?: number;
    title: string;
    description?: string;
    completed?: boolean;
    due_at?: string;
    priority?: string;
    category?: string;
  };
  onSubmit: (data: { title: string; description?: string; completed?: boolean; due_at?: string; priority?: string; category?: string; }) => void;
  onCancel: () => void;
  isEditMode: boolean;
}

const TodoForm: React.FC<TodoFormProps> = ({ initialData, onSubmit, onCancel, isEditMode }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [completed, setCompleted] = useState(initialData?.completed || false);
  const [dueAt, setDueAt] = useState(initialData?.due_at ? new Date(initialData.due_at).toISOString().split('T')[0] : '');
  const [priority, setPriority] = useState(initialData?.priority || 'low');
  const [category, setCategory] = useState(initialData?.category || 'others');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description || '');
      setCompleted(initialData.completed || false);
      setDueAt(initialData.due_at ? new Date(initialData.due_at).toISOString().split('T')[0] : '');
      setPriority(initialData.priority || 'low');
      setCategory(initialData.category || 'others');
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      title,
      description: description || undefined,
      due_at: dueAt ? new Date(dueAt).toISOString() : undefined,
      priority,
      category,
      ...(isEditMode && { completed }), // Only include completed if in edit mode
    };
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <div className="form-group">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="form-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="form-input"
        ></textarea>
      </div>
      <div className="form-grid">
        <div>
          <label htmlFor="due_at" className="form-label">
            Due Date
          </label>
          <input
            type="date"
            id="due_at"
            value={dueAt}
            onChange={(e) => setDueAt(e.target.value)}
            className="form-input"
          />
        </div>
        <div>
          <label htmlFor="priority" className="form-label">
            Priority
          </label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="form-input"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div>
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="form-input"
          >
            <option value="work">Work</option>
            <option value="personal">Personal</option>
            <option value="study">Study</option>
            <option value="home">Home</option>
            <option value="health">Health</option>
            <option value="shopping">Shopping</option>
            <option value="others">Others</option>
          </select>
        </div>
      </div>
      {isEditMode && (
        <div className="form-checkbox-group">
          <input
            type="checkbox"
            id="completed"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
            className="form-checkbox"
          />
          <label htmlFor="completed" className="form-checkbox-label">
            Completed
          </label>
        </div>
      )}
      <div className="form-actions">
        <button
          type="button"
          onClick={onCancel}
          className="btn btn-cancel"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-submit"
        >
          {isEditMode ? 'Update Task' : 'Add Task'}
        </button>
      </div>
    </form>
  );
};

export default TodoForm;
