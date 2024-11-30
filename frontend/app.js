const API_URL = 'http://localhost:3000/tasks';

// Fetch tasks and display them
async function fetchTasks() {
  const response = await fetch(API_URL);
  const tasks = await response.json();
  const taskList = document.getElementById('tasks');

  taskList.innerHTML = '';
  tasks.forEach(task => {
    taskList.innerHTML += `
      <tr>
        <td>${task.title}</td>
        <td>${task.description || 'No description'}</td>
        <td>${task.dueDate}</td>
        <td>${task.status}</td>
        <td>
          <button class="toggle" onclick="toggleStatus(${task.id}, '${task.status}')">
            ${task.status === 'Pending' ? 'Complete' : 'Undo'}
          </button>
          <button class="delete" onclick="deleteTask(${task.id})">Delete</button>
        </td>
      </tr>
    `;
  });
}

// Create a new task
document.getElementById('create-task-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const dueDate = document.getElementById('dueDate').value;

  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, description, dueDate }),
  });

  document.getElementById('create-task-form').reset();
  fetchTasks();
});

// Delete a task
async function deleteTask(id) {
  if (confirm('Are you sure you want to delete this task?')) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchTasks();
  }
}

// Toggle task status
async function toggleStatus(id, currentStatus) {
  const newStatus = currentStatus === 'Pending' ? 'Completed' : 'Pending';
  await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status: newStatus }),
  });

  fetchTasks();
}

// Load tasks on page load
fetchTasks();



// Theme Toggle Logic
const themeToggleButton = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

// Check localStorage for saved theme preference
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark-theme');
  themeIcon.classList.add('fa-moon');
} else {
  themeIcon.classList.add('fa-sun');
}

themeToggleButton.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
  
  // Toggle icons
  if (document.body.classList.contains('dark-theme')) {
    themeIcon.classList.replace('fa-sun', 'fa-moon');
    localStorage.setItem('theme', 'dark');
  } else {
    themeIcon.classList.replace('fa-moon', 'fa-sun');
    localStorage.setItem('theme', 'light');
  }
});

