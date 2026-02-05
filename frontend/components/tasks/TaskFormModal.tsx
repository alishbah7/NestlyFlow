"use client";

import React, { useState, useEffect } from 'react';
import { Todo, NewTodo, UpdateTodo } from '@/services/api';
import CustomFilterDropdown from '../shared/CustomFilterDropdown'; // Import the new component
import './TaskFormModal.css';

interface DropdownOption {
    value: string;
    label: string;
    isGroup?: boolean; // Indicates if this is an optgroup label
}

const priorityOptions: DropdownOption[] = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
];

const categoryOptions: DropdownOption[] = [
    { value: 'work', label: 'Work' },
    { value: 'personal', label: 'Personal' },
    { value: 'shopping', label: 'Shopping' },
    { value: 'health', label: 'Health' },
    { value: 'education', label: 'Education' },
    { value: 'others', label: 'Others' },
];

interface TaskFormModalProps {
    task: Todo | null;
    onClose: () => void;
    onSave: (taskData: NewTodo | UpdateTodo, id?: number) => Promise<void>;
}

const TaskFormModal: React.FC<TaskFormModalProps> = ({ task, onClose, onSave }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState('low');
    const [category, setCategory] = useState('others');
    const [isSaving, setIsSaving] = useState(false);
    const [titleError, setTitleError] = useState<string | null>(null);

    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(task.description || '');
            setDueDate(task.due_at ? new Date(task.due_at).toISOString().substring(0, 16) : '');
            setPriority(task.priority);
            setCategory(task.category);
        } else {
            // Reset form for new task
            setTitle('');
            setDescription('');
            setDueDate('');
            setPriority('low');
            setCategory('others');
        }
    }, [task]);

    // Effect to handle body scroll lock
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = ''; // Revert to default on unmount
        };
    }, []);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) {
            setTitleError('This field is mandatory');
            return;
        }
        setTitleError(null);
        setIsSaving(true);

        const taskData = {
            title,
            description,
            due_at: dueDate || undefined,
            priority,
            category,
        };

        try {
            await onSave(taskData, task?.id);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="task-form-modal-overlay">
            <div className="task-form-modal">
                <div className="task-form-header">
                    <h2>{task ? 'Edit Task' : 'Add New Task'}</h2>
                    <button onClick={onClose} className="close-button">&times;</button>
                </div>
                <form onSubmit={handleSubmit} className="task-form">
                    <div className="form-group">
                        <label htmlFor="title">Task Title</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => {
                                setTitle(e.target.value);
                                if (titleError) setTitleError(null);
                            }}
                        />
                        {titleError && <p className="form-error">{titleError}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description (Optional)</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="dueDate">Due Date</label>
                            <input
                                type="datetime-local"
                                id="dueDate"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="priority">Priority</label>
                            <CustomFilterDropdown
                                options={priorityOptions}
                                value={priority}
                                onChange={setPriority}
                                placeholder="Select Priority"
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="category">Category</label>
                        <CustomFilterDropdown
                            options={categoryOptions}
                            value={category}
                            onChange={setCategory}
                            placeholder="Select Category"
                        />
                    </div>
                    <div className="form-actions">
                        <button type="submit" className="btn-save" disabled={isSaving}>
                            {isSaving ? (task ? 'Editing...' : 'Creating...') : (task ? 'Save Changes' : 'Create Task')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TaskFormModal;
