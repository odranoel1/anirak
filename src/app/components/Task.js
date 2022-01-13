import { deleteTask, createTask, editTask } from '../../app/services/tasks';

export class Task {
    constructor(obj) {
        this.id = obj.id ? obj.id : '';
        this.desc = obj.desc ? obj.desc : 'Sin texto';
        this.completed = obj.completed ? obj.completed : false;
        this.createdAt = obj.createdAt ? obj.createdAt : new Date().getTime();
        this.todoList = document.querySelector('#Plans .item #todo-list');
        this.url = obj.url ? obj.url : '';
    }

    async createTask() {
        const res = await createTask({
            desc: this.desc,
            completed: this.completed,
            createdAt: this.createdAt,
            url: this.url
        });
        if (res.success) {
            this.id = res.data.insertedId;
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
            url: this.url
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

    static addPictureView(task = null) {
        const taskPicture = document.querySelector('#task-picture');
        taskPicture.classList.remove('d-none');
        taskPicture.childNodes[1].innerHTML = task.desc;
        taskPicture.childNodes[11].innerHTML = new Date(task.createdAt).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' });
        taskPicture.childNodes[3].src = task.url;
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

    getSpanishDate(date) {
        return new Date(date).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' });
    }
}