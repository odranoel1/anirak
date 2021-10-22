import { deleteTask, createTask, editTask } from '../../app/services/tasks';

export class Task {
    constructor(obj) {
        this.id = obj.id ? obj.id : `${new Date().getTime()}`;
        this.desc = obj.desc;
        this.completed = obj.completed ? obj.completed : false;
        this.createdAt = obj.createdAt ? obj.createdAt : new Date().getTime();
        this.todoList = obj.todoList;
    }

    async createTask() {
        const res = await createTask({
            id: this.id,
            desc: this.desc,
            completed: this.completed,
            createdAt: this.createdAt,
        });
        if (res.success) {
            this.appendView();
        }
    }

    async editTask(target, classTarget) {
        this.completed = !this.completed;
        target.setAttribute('disabled', '');
        const res = await editTask({
            id: this.id,
            desc: this.desc,
            completed: this.completed,
            createdAt: this.createdAt,
        });
        if (res.success) {
            this.toggleIcon(classTarget);
        }
        target.removeAttribute('disabled');
    }

    async deleteTask(target) {
        target.setAttribute('disabled', '');
        const res = await deleteTask(this.id);
        if (res.success) {
            this.removeView(target.parentElement);
        }
        target.removeAttribute('disabled');
    }

    appendView() {
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

    removeView(liElement) {
        this.todoList.removeChild(liElement);
    }

    toggleIcon(classTarget) {
        if (classTarget.value.includes('fa-check')) {
            classTarget.remove('fa-check');
            classTarget.add('fa-edit');
            return true;
        }
        if (classTarget.value.includes('fa-edit')) {
            classTarget.remove('fa-edit');
            classTarget.add('fa-check');
            return true;
        }
    }
}