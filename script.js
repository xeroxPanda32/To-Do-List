let items = [
    {
        "id": 1710956734916,
        "title": "Do Stationery",
        "description": "Pen, Pencil, Notebook",
        "endDate": "2024-01-19",
        "priority": 1,
        "status": "todo"
    },
    {
        "id": 1710956734910,
        "title": "Do Laundry",
        "description": "Shirts, Pants, Bedsheet",
        "endDate": "2024-03-11",
        "priority": 2,
        "status": "doing"
    },
    {
        "id": 1710956794910,
        "title": "Buy groceries",
        "description": "Baigan, potato, tomato, onion",
        "endDate": "2024-03-11",
        "priority": 0,
        "status": "done"
    }
];

function showAddForm() {
    const modal = document.getElementById('addModal');
    modal.innerHTML = `
    <div class="modal-content">
      <input type="text" id="title" placeholder="Title">
      <textarea id="description" placeholder="Description"></textarea>
      <input type="date" id="endDate">
      <select id="priority">
        <option value=0 >Low</option>
        <option value=1 >Medium</option>
        <option value=2 >High</option>
      </select>
      <select id="status">
      <option value="todo" selected> To-do </option>
      <option value="doing"> Doing </option>
      <option value="done"> Done </option>
      </select>
      <button class="button"onclick="addItem()">Add</button>
      <button class="button" onclick="closeModal()">Cancel</button>
    </div>
  `;
    modal.style.display = 'flex';
}

function addItem() {
    const id = Date.now();
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const endDate = document.getElementById('endDate').value;
    const priority = parseInt(document.getElementById('priority').value);
    const status = document.getElementById('status').value;

    items.push({ id, title, description, endDate, priority, status });
    displayItems();
    closeModal();
}

function closeModal() {
    document.getElementById('addModal').style.display = 'none';
}

function displayItems() {
    const todoList = document.getElementById('todo-list');
    const doingList = document.getElementById('doing-list');
    const doneList = document.getElementById('done-list');

    todoList.innerHTML = '';
    doingList.innerHTML = '';
    doneList.innerHTML = '';

    items.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.setAttribute('class', 'card')
        itemElement.innerHTML = `
      <div style="display: flex; justify-content: space-between;">
        <div>${item.title}
        <select id="status-${item.id}"  onchange="statusChange(${item.id},this.value)">
        <option value="todo" ${item.status === 'todo' ? 'selected' : ''}> To-do </option>
        <option value="doing" ${item.status === 'doing' ? 'selected' : ''}> Doing </option>
        <option value="done" ${item.status === 'done' ? 'selected' : ''}> Done </option></div>
    </select>
    </div>
        <div>Priority-${parseInt(item.priority) === 0 ? "Low" : (parseInt(item.priority) === 1 ? "Medium" : "High")}</div>
        <div>${item.endDate}</div>
        </div>
        <hr style="width: 100%;"></hr>
      <div>${item.description}</div>
     
      <div style=" margin-left: auto; width: max-content;">
        <button class="button" onclick="editItem(${index})">Edit</button>
        <button class="button" onclick="deleteItem(${index})" style="background-color: #ff6961">Delete</button>
        <button id="myButton" class="button"  onclick="onComplete(${index})">${!item.completed ? "Complete" : "Completed"}</button>

     </div>
    `;

        if (item.status === "done") {
            doneList.appendChild(itemElement);
        } else if (item.status === 'todo') {
            todoList.appendChild(itemElement);
        } else {
            doingList.appendChild(itemElement);
        }
    });
}

function statusChange(id, val) {
    const itemIndex = items.findIndex(el => el.id === id);
    if (itemIndex >= 0) {
        items[itemIndex].status = val;
        displayItems();
    } else {
        console.error("Item not found with ID:", id);
    }

}

function editItem(index) {
    const item = items[index];
    const modal = document.getElementById('addModal');
    modal.innerHTML = `
    <div class="modal-content">
      <input type="text" id="title" value="${item.title}">
      <textarea id="description">${item.description}</textarea>
      <input type="date" id="endDate" value="${item.endDate}">
      <select id="priority">
        <option value=0 ${item.priority === 0 ? 'selected' : ''}>Low</option>
        <option value=1 ${item.priority === 1 ? 'selected' : ''}>Medium</option>
        <option value=2 ${item.priority === 2 ? 'selected' : ''}>High</option>
      </select>
      <button class="button" onclick="updateItem(${index})">Update</button>
      <button class="button" onclick="closeModal()">Cancel</button>
    </div>
  `;
    modal.style.display = 'flex';
}

function updateItem(index) {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const endDate = document.getElementById('endDate').value;
    const priority = parseInt(document.getElementById('priority').value);
    const status = document.getElementById(`status-${items[index].id}`).value;

    items[index] = { ...items[index], title, description, endDate, priority, status };
     displayItems();
    closeModal();
}

function deleteItem(index) {
    items.splice(index, 1);
    displayItems();
}

function onComplete(index) {
    items[index].completed = !items[index].completed;
    displayItems();
}

function sortItems() {
    const sortBy = document.getElementById('sort').value;
    if (sortBy === 'priority') {
        items.sort((a, b) => (a.priority > b.priority ? 1 : -1));
    } else if (sortBy === 'endDate') {
        items.sort((a, b) => (new Date(a.endDate) > new Date(b.endDate) ? 1 : -1));
    }
    displayItems();
}

displayItems();














