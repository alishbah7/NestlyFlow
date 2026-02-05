// frontend/components/todo/TodoList.tsx
import React from 'react';
import TodoItem from './TodoItem';
import './todo.css';

interface TodoListProps {
  todos: Array<{
    id: number;
    title: string;
    description?: string;
    completed: boolean;
    due_at?: string;
    created_at: string;
    updated_at: string;
    priority: string;
    category: string;
  }>;
  onToggleComplete: (id: number, completed: boolean) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onToggleComplete, onEdit, onDelete }) => {
  return (
    <div className="todo-list">
      {todos.length === 0 ? (
        <p className="empty-list-message">No tasks yet. Add a new one!</p>
      ) : (
        todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggleComplete={onToggleComplete}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))
      )}
    </div>
  );
};

export default TodoList;
