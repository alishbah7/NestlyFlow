"use client";

import React from 'react';
import { Todo } from '@/services/api';
import { Edit, Trash2, CheckCircle } from 'lucide-react';
import { format, isBefore, isToday, isTomorrow } from 'date-fns';
import './TaskList.css';

interface TaskListProps {
    tasks: Todo[];
    onEdit: (task: Todo) => void;
    onDelete: (id: number) => void;
    onToggleComplete: (id: number, completed: boolean) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onEdit, onDelete, onToggleComplete }) => {
    if (tasks.length === 0) {
        return <div className="no-tasks-found">No tasks yet.</div>;
    }

    const truncate = (str: string, num: number) => {
        if (!str) return '';
        if (str.length <= num) {
            return str;
        }
        return str.slice(0, num) + '...';
    };

    const getTaskStatus = (task: Todo) => {
        if (task.completed) {
            return <div className="status-completed">Completed</div>;
        }
    
        if (task.due_at) {
            const dueDate = new Date(task.due_at);
            const now = new Date();
    
            if (isBefore(dueDate, now)) {
                return <div className="status-overdue">Overdue</div>;
            }
    
            if (isToday(dueDate) || isTomorrow(dueDate)) {
                return <div className="status-at-risk">At Risk</div>;
            }
        }
    
        return <div className="status-pending">Pending</div>;
    };

    return (
        <div className="tasks-grid">
            {tasks.map(task => (
                <div key={task.id} className={`task-card ${task.completed ? 'completed' : ''}`}>
                    <div className="task-card-header">
                        <h3 className="task-title">{truncate(task.title, 20)}</h3>
                        <div className="task-actions">
                            {!task.completed && (
                                <button onClick={() => onToggleComplete(task.id, !task.completed)} className="action-btn complete">
                                    <CheckCircle size={18} />
                                </button>
                            )}
                            <button onClick={() => onEdit(task)} className="action-btn edit">
                                <Edit size={18} />
                            </button>
                            <button onClick={() => onDelete(task.id)} className="action-btn delete">
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                    <p className="task-description">
                        {task.description ? truncate(task.description, 30) : 'No Description'}
                    </p>
                    <div className="task-card-footer">
                        <div className='pri-cat'>
                            <span className={`priority-badge ${task.priority}`}>{task.priority}</span>
                            <span className="task-category"><span className='todo-sub'>Category:</span> {task.category}</span>
                        </div>
                        <div className='date-status'>
                            <span className="task-due-date">
                                {task.due_at ? format(new Date(task.due_at), 'MMM dd, yyyy') : 'Due Date: Not Set'}
                            </span>
                            <div className="task-status-container">
                                {getTaskStatus(task)}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TaskList;
