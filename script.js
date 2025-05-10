const addBtn = document.getElementById('addBtn');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

window.onload = loadTasks;

addBtn.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if (!taskText) return;

  addTaskElement(taskText, false);
  saveTask({ text: taskText, completed: false });
  taskInput.value = '';
});

function addTaskElement(text, completed) {
  const li = document.createElement('li');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = completed;

  const span = document.createElement('span');
  span.textContent = text;
  span.className = 'task-text';

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.className = 'delete-btn';

  if (completed) li.classList.add('completed');

  li.append(checkbox, span, deleteBtn);
  taskList.appendChild(li);

  checkbox.addEventListener('change', () => {
    li.classList.toggle('completed');
    updateTask(text, checkbox.checked);
  });

  deleteBtn.addEventListener('click', () => {
    li.remove();
    deleteTask(text);
  });
}

function saveTask(task) {
  const tasks = getTasks();
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  getTasks().forEach(task => addTaskElement(task.text, task.completed));
}

function updateTask(text, completed) {
  const tasks = getTasks().map(task =>
    task.text === text ? { ...task, completed } : task
  );
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function deleteTask(text) {
  const tasks = getTasks().filter(task => task.text !== text);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasks() {
  return JSON.parse(localStorage.getItem('tasks')) || [];
}
