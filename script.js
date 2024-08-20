document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('add-button');
    const todayTasks = document.getElementById('today-tasks');
    const futureTasks = document.getElementById('future-tasks');
    const completedTasks = document.getElementById('completed-tasks');
    // const searchBar = document.getElementById('search-bar');

    let todoList = JSON.parse(localStorage.getItem('todoList')) || [];

    function saveToLocalStorage() {
        localStorage.setItem('todoList', JSON.stringify(todoList));
    }

    function displayTasks() {
        const today = new Date().toISOString().split('T')[0];
        
        todayTasks.innerHTML = '';
        futureTasks.innerHTML = '';
        completedTasks.innerHTML = '';

        todoList.forEach(task => {
            const taskElement = document.createElement('li');
            taskElement.classList.add(task.completed ? 'completed' : 'none');
            taskElement.innerHTML = `
                <div class="task-details">
                    <strong>${task.name}&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp${task.date}&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp${task.priority}</strong>
                </div>
                <div>
                    <button onclick="completeTask('${task.name}')">${task.completed ? 'Undo' : 'Complete'}</button>
                    <button onclick="deleteTask('${task.name}')">Delete</button>
                </div>
            `;

            if (task.completed) {
                completedTasks.appendChild(taskElement);
            } else if (task.date === today) {
                todayTasks.appendChild(taskElement);
            } else {
                futureTasks.appendChild(taskElement);
            }
        });
    }

    addButton.addEventListener('click', function () {
        const name = document.getElementById('item-name').value.trim();
        const date = document.getElementById('item-date').value;
        const priority = document.getElementById('item-priority').value;

        if (name && date) {
            todoList.push({ name, date, priority, completed: false });
            saveToLocalStorage();
            displayTasks();
            document.getElementById('item-name').value = '';
            document.getElementById('item-date').value = '';
            document.getElementById('item-priority').value = 'Medium';
        } else {
            alert('Please enter a task name and date.');
        }
    });

    window.deleteTask = function (name) {
        todoList = todoList.filter(task => task.name !== name);
        saveToLocalStorage();
        displayTasks();
    };

    window.completeTask = function (name) {
        const task = todoList.find(task => task.name === name);
        if (task) {
            task.completed = !task.completed;
            saveToLocalStorage();
            displayTasks();
        }
    };

    // searchBar.addEventListener('input', function () {
    //     const searchText = searchBar.value.toLowerCase();
    //     const tasks = document.querySelectorAll('.task-list li');
        
    //     tasks.forEach(task => {
    //         const taskName = task.querySelector('.task-details strong').textContent.toLowerCase();
    //         task.style.display = taskName.includes(searchText) ? '' : 'none';
    //     });
    // });

    displayTasks();
});


