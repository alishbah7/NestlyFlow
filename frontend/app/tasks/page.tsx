"use client";
import React, { useState, useEffect, useCallback } from 'react';
import TaskList from '../../components/tasks/TaskList';
import TaskFormModal from '../../components/tasks/TaskFormModal';
import CustomFilterDropdown from '../../components/shared/CustomFilterDropdown'; // Import the new component
import { 
  fetchTodos, 
  createTodo, 
  updateTodo, 
  deleteTodo, 
  Todo, 
  NewTodo, 
  UpdateTodo 
} from '../../services/api';
import withAuth from '../../components/auth/withAuth';
import './tasks.css';
import { useAuth } from '@/context/AuthContext';
import { Plus, Search } from 'lucide-react';

interface DropdownOption {
    value: string;
    label: string;
    isGroup?: boolean; // Indicates if this is an optgroup label
}

const filterOptions: DropdownOption[] = [
    { value: 'none', label: 'None' },
    { value: 'az', label: 'Title (A-Z)' },
    { value: 'za', label: 'Title (Z-A)' },
    { value: 'priority-group', label: '𝑷𝒓𝒊𝒐𝒓𝒊𝒕𝒚', isGroup: true },
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' },
    { value: 'category-group', label: '𝑪𝒂𝒕𝒆𝒈𝒐𝒓𝒚', isGroup: true },
    { value: 'work', label: 'Work' },
    { value: 'personal', label: 'Personal' },
    { value: 'shopping', label: 'Shopping' },
    { value: 'health', label: 'Health' },
    { value: 'education', label: 'Education' },
    { value: 'others', label: 'Others' },
];

const TasksPage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [initialLoading, setInitialLoading] = useState<boolean>(true); // For first load
  const [isFetching, setIsFetching] = useState<boolean>(false); // For subsequent fetches
  const [error, setError] = useState<string | null>(null);
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Todo | null>(null);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedFilter, setSelectedFilter] = useState<string>('none'); 
  const [filteredAndSortedTodos, setFilteredAndSortedTodos] = useState<Todo[]>([]);
  const [searchNotFound, setSearchNotFound] = useState<boolean>(false);

  const { todosLastUpdated } = useAuth();

  const loadTodos = useCallback(async () => {
    if (initialLoading) { // Only set initialLoading for the very first load
      // No need to set isFetching yet, as initialLoading covers it
    } else { // For subsequent fetches
      setIsFetching(true);
    }
    try {
      const data = await fetchTodos();
      setTodos(data);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setInitialLoading(false);
      setIsFetching(false);
    }
  }, [initialLoading]);

  useEffect(() => {
    loadTodos();
  }, [loadTodos, todosLastUpdated]);

  useEffect(() => {
    let currentTodos = [...todos];

    // Apply filtering and sorting based on selectedFilter
    switch (selectedFilter) {
      case 'none':
        // No specific filter/sort, maybe sort by creation date by default or do nothing
        currentTodos.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
      case 'az':
        currentTodos.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'za':
        currentTodos.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'high':
      case 'medium':
      case 'low':
        currentTodos = currentTodos.filter(todo => todo.priority === selectedFilter);
        break;
      case 'work':
      case 'personal':
      case 'shopping':
      case 'health':
      case 'education':
      case 'others':
        currentTodos = currentTodos.filter(todo => todo.category === selectedFilter);
        break;
      default:
        break;
    }

    // Apply searching
    if (searchQuery) {
        const lowerCaseQuery = searchQuery.toLowerCase();
        currentTodos = currentTodos.filter(todo => 
            todo.title.toLowerCase().includes(lowerCaseQuery) ||
            (todo.description && todo.description.toLowerCase().includes(lowerCaseQuery))
        );
        setSearchNotFound(currentTodos.length === 0);
    } else {
        setSearchNotFound(false);
    }

    setFilteredAndSortedTodos(currentTodos);
  }, [todos, searchQuery, selectedFilter]);

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
      await loadTodos(); // Refresh data
    } catch (err: any) {
      setError(err.message || 'Failed to save task.');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTodo(id);
      await loadTodos(); // Refresh data
    } catch (err: any) {
      setError(err.message || 'Failed to delete task.');
    }
  };

  const handleToggleComplete = async (id: number, completed: boolean) => {
    try {
      await updateTodo(id, { completed });
      await loadTodos(); // Refresh data
    } catch (err: any) {
      setError(err.message || 'Failed to update task status.');
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (value: string) => { // Updated to receive value directly
    setSelectedFilter(value);
  };


  return (
    <div className="tasks-page-container">
      <div className="tasks-content-container">
        <div className='task-title-div'>
          <h1 className="tasks-title">𝒀𝒐𝒖𝒓 𝑻𝒂𝒔𝒌𝒔</h1>
        </div>

        {error && (
          <div className="tasks-error-alert" role="alert">
            <strong className="tasks-error-strong">Error:</strong>
            <span className="tasks-error-span"> {error}</span>
          </div>
        )}

        <div className="tasks-controls-top-row">
            <button 
                onClick={() => { setIsFormOpen(true); setEditingTask(null); }}
                className="add-task-btn big-btn"
            >
               Add Task
            </button>
            <button 
                onClick={() => { setIsFormOpen(true); setEditingTask(null); }}
                className="add-task-btn small-btn"
            >
              +
            </button>
            <div className="filter-section-and-search">
                <div className="filter-by tasks-filter-dropdown-wrapper">
                    <label htmlFor="task-filter" className='task-filter'>Filter:</label>
                    <CustomFilterDropdown 
                        options={filterOptions} 
                        value={selectedFilter} 
                        onChange={handleFilterChange} 
                    />
                </div>                
            </div>
        </div>

        <div className="searchBar">
          <div className="search-bar-tasks">
              <Search size={20} className="search-icon" />
              <input
                  type="text"
                  placeholder="Search tasks by title or description..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="search-input-tasks"
              />
          </div>
        </div>

        {initialLoading ? (
          <p className="tasks-loading-text">Loading tasks...</p>
        ) : (
          <>
            {isFetching && (
              <div className="fetching-updates-overlay">
                <p>Fetching updates...</p>
              </div>
            )}
            {searchNotFound ? (
              <div className="no-tasks-found">That Task Does Not Exist</div>
            ) : (
              <TaskList
                tasks={filteredAndSortedTodos}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onToggleComplete={handleToggleComplete}
              />
            )}
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
}

export default withAuth(TasksPage);