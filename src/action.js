 // Open and close modals
 function openModal() {
  document.getElementById('taskModal').classList.remove('hidden');
}

function closeModal() {
  document.getElementById('taskModal').classList.add('hidden');
}

function openEditModal(taskElement) {
  const taskTitle = taskElement.querySelector('.task-title').innerText;
  const taskDescription = taskElement.querySelector('.task-description').innerText;
  const taskDueDate = taskElement.querySelector('.task-due-date').innerText;
  const taskStatus = taskElement.closest('[id]').id;
  const taskPriority = taskElement.classList.contains('border-red-400') ? 'P1' : taskElement.classList.contains('border-yellow-400') ? 'P2' : 'P3';

  document.getElementById('editTaskTitle').value = taskTitle;
  document.getElementById('editTaskDescription').value = taskDescription;
  document.getElementById('editTaskDueDate').value = taskDueDate;
  document.getElementById('editTaskStatus').value = taskStatus.replace('-tasks', '');
  document.getElementById('editTaskPriority').value = taskPriority;

  document.getElementById('editTaskForm').onsubmit = function (event) {
    event.preventDefault();
    taskElement.querySelector('.task-title').innerText = document.getElementById('editTaskTitle').value;
    taskElement.querySelector('.task-description').innerText = document.getElementById('editTaskDescription').value;
    taskElement.querySelector('.task-due-date').innerText = document.getElementById('editTaskDueDate').value;
    const newStatus = document.getElementById('editTaskStatus').value + '-tasks';
    const newPriority = document.getElementById('editTaskPriority').value;

    taskElement.classList.remove('border-red-400', 'border-yellow-400', 'border-green-400');
    if (newPriority === 'P1') taskElement.classList.add('border-red-400');
    else if (newPriority === 'P2') taskElement.classList.add('border-yellow-400');
    else taskElement.classList.add('border-green-400');

    document.getElementById(newStatus).appendChild(taskElement);
    closeEditModal();
  };

  document.getElementById('editTaskModal').classList.remove('hidden');
}

function closeEditModal() {
  document.getElementById('editTaskModal').classList.add('hidden');
}

// Add new task
document.getElementById('taskForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const title = document.getElementById('taskTitle').value;
  const description = document.getElementById('taskDescription').value;
  const status = document.getElementById('taskStatus').value;
  const dueDate = document.getElementById('taskDueDate').value;
  const priority = document.getElementById('taskPriority').value;

  const taskElement = document.createElement('div');
  taskElement.classList.add('border', 'p-3', 'rounded', 'mb-2', 'cursor-pointer'); // Added cursor-pointer class
  if (priority === 'P1') taskElement.classList.add('border-red-400');
  else if (priority === 'P2') taskElement.classList.add('border-yellow-400');
  else taskElement.classList.add('border-green-400');

  taskElement.innerHTML = `
    <p class="task-title font-semibold">${title}</p>
    <p class="task-due-date text-sm text-gray-500">${dueDate}</p>
    <p class="task-description hidden">${description}</p>
    <div class="flex space-x-2 mt-2">
      <button class="bg-red-500 text-white px-7 py-1 rounded hover:bg-gray-400">Delete</button>
      <button class="bg-blue-400 text-white px-7 py-1 rounded hover:bg-blue-800" onclick="openEditModal(this.closest('.border'))">Edit</button>
    </div>
  `;

  taskElement.onclick = function () {
    toggleDescription(taskElement);
  };

  document.getElementById(`${status}-tasks`).appendChild(taskElement);

  closeModal();
  event.target.reset();
});

// Toggle description visibility
function toggleDescription(taskElement) {
  const description = taskElement.querySelector('.task-description');
  description.classList.toggle('hidden');
}