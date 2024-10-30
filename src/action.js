function openModal() {
    document.getElementById('taskModal').classList.remove('hidden');
  }

  function closeModal() {
    document.getElementById('taskModal').classList.add('hidden');
  }

  document.getElementById('taskForm').addEventListener('submit', function(event) {
    event.preventDefault();
    // Collect form data
    const title = document.getElementById('taskTitle').value;
    const description = document.getElementById('taskDescription').value;
    const status = document.getElementById('taskStatus').value;
    const dueDate = document.getElementById('taskDueDate').value;
    const priority = document.getElementById('taskPriority').value;

    // Create task element
    const taskElement = document.createElement('div');
    taskElement.classList.add('border', 'p-3', 'rounded', 'mb-2');
    if (priority === 'P1') taskElement.classList.add('border-red-400');
    else if (priority === 'P2') taskElement.classList.add('border-yellow-400');
    else taskElement.classList.add('border-green-400');
    taskElement.innerHTML = `
      <p class="font-semibold">${title}</p>
      <p class="text-sm text-gray-500">${dueDate}</p>
      <div class="flex space-x-2 mt-2">
        <button class="bg-red-500 text-white px-7 py-1 rounded hover:bg-slate-400">Delete</button>
        <button class="bg-blue-400 text-white px-7 py-1 rounded hover:bg-blue-800">Edit</button>
      </div>
    `;

    // Append task to the correct section
    document.getElementById(`${status}-tasks`).appendChild(taskElement);

    // Close modal and reset form
    closeModal();
    event.target.reset();
  });