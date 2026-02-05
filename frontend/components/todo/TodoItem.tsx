// frontend/components/todo/TodoItem.tsx
import React from 'react';
import './todo.css';

interface TodoItemProps {
  todo: {
    id: number;
    title: string;
    description?: string;
    completed: boolean;
    due_at?: string;
    created_at: string;
    updated_at: string;
    priority: string;
    category: string;
  };
  onToggleComplete: (id: number, completed: boolean) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggleComplete, onEdit, onDelete }) => {
  const handleToggle = () => {
    onToggleComplete(todo.id, !todo.completed);
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-item-content">
        <div className="todo-item-header">
          <h3 className={`todo-title ${todo.completed ? 'completed' : ''}`}>{todo.title}</h3>
          <span className={`priority-badge ${todo.priority.toLowerCase()}`}>{todo.priority}</span>
          <span className="category-badge">{todo.category}</span>
        </div>
        {todo.description && <p className={`todo-description ${todo.completed ? 'completed' : ''}`}>{todo.description}</p>}
        {todo.due_at && (
          <p className={`todo-due-date ${todo.completed ? 'completed' : ''}`}>Due: {new Date(todo.due_at).toLocaleDateString()}</p>
        )}
      </div>
      <div className="todo-item-actions">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggle}
          className="todo-checkbox"
        />
        <button
          onClick={() => onEdit(todo.id)}
          className="btn-edit"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className="btn-delete"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
