import { http, HttpResponse, delay } from 'msw';
import { Task, CreateTaskInput, UpdateTaskInput } from '@/types/task';
import { LoginCredentials, AuthResponse } from '@/types/auth';

// Helper to get tasks from localStorage
const getTasks = (): Task[] => {
  const tasks = localStorage.getItem('tasks');
  return tasks ? JSON.parse(tasks) : [];
};

// Helper to save tasks to localStorage
const saveTasks = (tasks: Task[]) => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Initialize with sample data if empty
if (!localStorage.getItem('tasks')) {
  const sampleTasks: Task[] = [
    {
      id: '1',
      title: 'Complete project documentation',
      description: 'Write comprehensive documentation for the task management system',
      status: 'in-progress',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Review pull requests',
      description: 'Review and merge pending pull requests from the team',
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];
  saveTasks(sampleTasks);
}

export const handlers = [
  // Login endpoint
  http.post('/api/login', async ({ request }) => {
    await delay(500);
    
    console.log('🔵 MSW intercepted login request');
    
    const credentials = await request.json() as LoginCredentials;
    
    if (credentials.username === 'test' && credentials.password === 'test123') {
      const response: AuthResponse = {
        token: 'fake-jwt-token-' + Date.now(),
        user: {
          id: '1',
          username: credentials.username,
        },
      };
      console.log('✅ Login successful, returning:', response);
      return HttpResponse.json(response);
    }
    
    console.log('❌ Invalid credentials');
    return HttpResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    );
  }),

  // Get all tasks
  http.get('/api/tasks', async () => {
    await delay(300);
    const tasks = getTasks();
    return HttpResponse.json(tasks);
  }),

  // Create task
  http.post('/api/tasks', async ({ request }) => {
    await delay(300);
    const taskInput = await request.json() as CreateTaskInput;
    
    const newTask: Task = {
      id: Date.now().toString(),
      ...taskInput,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    const tasks = getTasks();
    tasks.push(newTask);
    saveTasks(tasks);
    
    return HttpResponse.json(newTask, { status: 201 });
  }),

  // Update task
  http.put('/api/tasks/:id', async ({ request, params }) => {
    await delay(300);
    const { id } = params;
    const updateInput = await request.json() as Omit<UpdateTaskInput, 'id'>;
    
    const tasks = getTasks();
    const taskIndex = tasks.findIndex(t => t.id === id);
    
    if (taskIndex === -1) {
      return HttpResponse.json(
        { error: 'Task not found' },
        { status: 404 }
      );
    }
    
    tasks[taskIndex] = {
      ...tasks[taskIndex],
      ...updateInput,
      updatedAt: new Date().toISOString(),
    };
    
    saveTasks(tasks);
    return HttpResponse.json(tasks[taskIndex]);
  }),

  // Delete task
  http.delete('/api/tasks/:id', async ({ params }) => {
    await delay(300);
    const { id } = params;
    
    const tasks = getTasks();
    const filteredTasks = tasks.filter(t => t.id !== id);
    
    if (tasks.length === filteredTasks.length) {
      return HttpResponse.json(
        { error: 'Task not found' },
        { status: 404 }
      );
    }
    
    saveTasks(filteredTasks);
    return HttpResponse.json({ success: true });
  }),
];
