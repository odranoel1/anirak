export class Task {
    constructor(obj) {
        this.id = obj.id ? obj.id : `${new Date().getTime()}`;
        this.desc = obj.desc;
        this.completed = obj.completed ? obj.completed : false;
        this.createdAt = obj.createdAt ? obj.createdAt : new Date().getTime();
        this.todoList = obj.todoList;
    }

    createTask() {
        const li = document.createElement('li');
        li.innerHTML = `
            <li data-id="${this.id}">
                <button class="${this.completed ? 'fas fa-check' : 'fas fa-edit'} btn-icon"></button>
                ${this.desc}
                <button class="fas fa-trash btn-icon"></button>
            </li>
        `;
        this.todoList.appendChild(li.firstElementChild);
    }

    markCompleted(classTarget) {
        classTarget.remove('fa-edit');
        classTarget.add('fa-check');
    }

    deleteTask(liElement) {
        this.todoList.removeChild(liElement);
    }
}