// frontend/services/api.ts
import Cookies from 'js-cookie';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://nestlyflow-api.up.railway.app';

// Interfaces
export interface Todo {
  category: string;
  priority: string;
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  due_at?: string;
  created_at: string;
  updated_at: string;
}

export interface NewTodo {
  title: string;
  description?: string;
  due_at?: string;
}

export interface UpdateTodo {
  title?: string;
  description?: string;
  completed?: boolean;
  due_at?: string;
}

export interface User {
    id: number;
    username: string;
    email: string;
    todos: Todo[];
}

export interface UserWithToken extends User {
    access_token: string;
    token_type: string;
}

export interface NewUser {
    username: string;
    email: string;
    password: string;
}

export interface LoginUser {
    username: string;
    password: string;
}

export interface Token {
    access_token: string;
    token_type: string;
}

// Dashboard API Interfaces
export interface TaskStats {
    total: number;
    completed: number;
    in_progress: number;
    overdue: number;
}

export interface PriorityStat {
    priority: string;
    count: number;
}

export interface CategoryStat {
    category: string;
    count: number;
}

export interface DeadlineStat {
    id: number;
    title: string;
    due_at: string;
}

export interface DashboardStats {
    stats: TaskStats;
    priorities: PriorityStat[];
    categories: CategoryStat[];
    deadlines: DeadlineStat[];
}



export interface UserUpdate {
    username?: string;
}

export interface PasswordReset {
    current_password: string;
    new_password: string;
}

export interface UserDelete {
    password: string;
}

const getAuthHeaders = (): Record<string, string> => {
    const token = Cookies.get('token');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
};

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorText = await response.text();
    console.error("API Error Raw Response:", errorText);
    let errorData;
    try {
      errorData = JSON.parse(errorText);
    } catch (parseError) {
      // The error response wasn't JSON. Throw a generic error.
      throw new Error(`Server error: ${response.status} - ${errorText || 'Unknown error'}`);
    }
    // The error response was JSON, throw an error with the detail message.
    throw new Error(errorData.detail || 'Something went wrong');
  }
  // For 204 No Content
  if (response.status === 204) {
    return;
  }
  return response.json();
};

// Auth API
export const signup = async (newUser: NewUser): Promise<UserWithToken> => {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
    });
    return handleResponse(response);
};

export const login = async (loginUser: LoginUser): Promise<Token> => {
    const formData = new URLSearchParams();
    formData.append('username', loginUser.username);
    formData.append('password', loginUser.password);

    const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString(),
    });
    const token = await handleResponse(response);
    if (token.access_token) {
        Cookies.set('token', token.access_token, { expires: 1, secure: process.env.NODE_ENV === 'production' });
    }
    return token;
};

export const getCurrentUser = async (): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/auth/users/me`, {
        headers: getAuthHeaders(),
    });
    return handleResponse(response);
};

export const logout = () => {
    Cookies.remove('token');
};

export const updateUser = async (userUpdate: UserUpdate): Promise<UserWithToken> => {
    const response = await fetch(`${API_BASE_URL}/auth/users/me`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            ...getAuthHeaders(),
        },
        body: JSON.stringify(userUpdate),
    });
    return handleResponse(response);
};

export const resetPassword = async (passwordReset: PasswordReset): Promise<any> => {
    const response = await fetch(`${API_BASE_URL}/auth/users/me/reset-password`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...getAuthHeaders(),
        },
        body: JSON.stringify(passwordReset),
    });
    return handleResponse(response);
};

export const deleteUser = async (userDelete: UserDelete): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/auth/users/me`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            ...getAuthHeaders(),
        },
        body: JSON.stringify(userDelete)
    });
    return handleResponse(response);
};


// Todo API
export const fetchTodos = async (): Promise<Todo[]> => {
  const response = await fetch(`${API_BASE_URL}/crud/todos`, {
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
};

export const fetchTodoById = async (id: number): Promise<Todo> => {
  const response = await fetch(`${API_BASE_URL}/crud/todos/${id}`, {
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
};

export const createTodo = async (newTodo: NewTodo): Promise<Todo> => {
  const response = await fetch(`${API_BASE_URL}/crud/todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
    body: JSON.stringify(newTodo),
  });
  return handleResponse(response);
};

export const updateTodo = async (id: number, updatedTodo: UpdateTodo): Promise<Todo> => {
  const response = await fetch(`${API_BASE_URL}/crud/todos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
    body: JSON.stringify(updatedTodo),
  });
  return handleResponse(response);
};

export const deleteTodo = async (id: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/crud/todos/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  if (!response.ok && response.status !== 204) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Something went wrong');
  }
};

// Dashboard API
export const fetchDashboardData = async (): Promise<DashboardStats> => {
    const response = await fetch(`${API_BASE_URL}/api`, {
        headers: getAuthHeaders(),
    });
    return handleResponse(response);
};

export const forgotPassword = async (email: string): Promise<any> => {
    const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
    });
    return handleResponse(response);
};

export const resetPasswordConfirm = async (token: string, new_password: string): Promise<any> => {
    const response = await fetch(`${API_BASE_URL}/auth/reset-password?token=${token}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ new_password }),
    });
    return handleResponse(response);
};

