"use client";

import { useEffect, useState, useCallback } from 'react';
import StatsOverview from '@/components/dashboard/StatsOverview';
import SecondaryOverview from '@/components/dashboard/SecondaryOverview';
import TaskList from '@/components/tasks/TaskList';
import TaskFormModal from '@/components/tasks/TaskFormModal';
import withAuth from '@/components/auth/withAuth';
import { 
    fetchDashboardData, 
    DashboardStats, 
    fetchTodos, 
    Todo,
    createTodo,
    updateTodo,
    deleteTodo,
    NewTodo,
    UpdateTodo
} from '@/services/api';
import './dashboard.css';

const Dashboard = () => {
    const [dashboardData, setDashboardData] = useState<DashboardStats | null>(null);
    const [tasks, setTasks] = useState<Todo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<Todo | null>(null);

    const loadData = useCallback(async () => {
        try {
            setLoading(true);
            const [dashboard, todos] = await Promise.all([
                fetchDashboardData(),
                fetchTodos()
            ]);
            setDashboardData(dashboard);
            setTasks(todos.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()));
        } catch (err: any) {
            setError(err.message || 'Failed to fetch data.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadData();
    }, [loadData]);

    const handleEdit = (task: Todo) => {
        setEditingTask(task);
        setIsFormOpen(true);
    };

    const handleCloseForm = () => {
        setEditingTask(null);
        setIsFormOpen(false);
    };

    const handleSave = async (taskData: NewTodo | UpdateTodo, id?: number) => {
        try {
            if (id) {
                await updateTodo(id, taskData as UpdateTodo);
            } else {
                await createTodo(taskData as NewTodo);
            }
            handleCloseForm();
            await loadData(); // Refresh all data
        } catch (err: any) {
            setError(err.message || 'Failed to save task.');
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteTodo(id);
            await loadData(); // Refresh all data
        } catch (err: any) {
            setError(err.message || 'Failed to delete task.');
        }
    };

    const handleToggleComplete = async (id: number, completed: boolean) => {
        try {
            await updateTodo(id, { completed });
            await loadData(); // Refresh all data
        } catch (err: any) {
            setError(err.message || 'Failed to update task status.');
        }
    };

    return (
        <div>
            <div className="dashboard-container">
                <header className="dashboard-header">
                    <h1>𝑫𝒂𝒔𝒉𝒃𝒐𝒂𝒓𝒅</h1>
                </header>
                
                {loading && <div className="loading-message">Loading dashboard...</div>}
                {error && <div className="error-message">{error}</div>}
                
                {dashboardData && (
                    <>
                        <StatsOverview stats={dashboardData.stats} />
                        <SecondaryOverview dashboardData={dashboardData} />
                        <div className="task-status-section">
                            <div className="task-status-div">
                                <h2>𝑻𝒂𝒔𝒌𝒔 𝑺𝒕𝒂𝒕𝒖𝒔</h2>
                            </div>
                            <TaskList
                                tasks={tasks}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                                onToggleComplete={handleToggleComplete}
                            />
                        </div>
                    </>
                )}
            </div>

            {isFormOpen && (
                <TaskFormModal
                    task={editingTask}
                    onClose={handleCloseForm}
                    onSave={handleSave}
                />
            )}
        </div>
    );
};

export default withAuth(Dashboard);