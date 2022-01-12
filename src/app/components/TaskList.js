import { Task } from "./Task";
import { getTasks } from '../../app/services/tasks';
import { Picture } from "./Picture";

export class TaskList {
    constructor() {
        this.todoList = document.querySelector('#Plans .item #todo-list');
        this.fileLoader = null;
        this.picture = null;
        getTasks().then(res => {
            this.tasks = res.data;
            const lastTaskAdded = this.tasks[0];
            lastTaskAdded.url = lastTaskAdded.url ? lastTaskAdded.url : '';
            this.tasks.map(task => {
                task.todoList = this.todoList;
                task.id = task._id;
                const newTask = new Task(task);
                newTask.appendView();
            });
            this.addPictureView(lastTaskAdded);
        });

        this.newPicture = new Picture();
    }

    listenInput() {
        const txtInput = document.querySelector('#new-task');
        txtInput.addEventListener('keyup', async (event) => {
            if (event.keyCode === 13 && txtInput.value.length > 0) {
                const newTask = new Task({
                    desc: txtInput.value,
                    todoList: this.todoList
                });
                await newTask.createTask();
                txtInput.value = '';
                this.tasks.push(newTask);
            }
        });
    }

    listenTodo() {
        this.todoList.addEventListener('click', async (event) => {
            getTasks().then(res => {
                this.tasks = res.data;
            });
            const target = event.target;
            let taskId = target.getAttribute('data-id');
            if (target.classList.contains('fa-check') || target.classList.contains('fa-edit') || target.classList.contains('fa-trash')) {
                taskId = target.parentElement.getAttribute('data-id');
            }
            
            let taskFounded = this.tasks.find(task => task.id === taskId);
            taskFounded = new Task(taskFounded);
            this.addPictureView(taskFounded);
            localStorage.setItem('task', JSON.stringify(taskFounded));

            if (target.classList.contains('fa-check') || target.classList.contains('fa-edit')) {
                await taskFounded.editTask(target, target.classList);
            }

            if (target.classList.contains('fa-trash')) {
                await taskFounded.deleteTask(target);
                const taskPicture = document.querySelector('#task-picture');
                taskPicture.classList.add('d-none');
            }
        });
    }

    addPictureView(taskFounded) {
        const taskPicture = document.querySelector('#task-picture');
        taskPicture.classList.remove('d-none');
        taskPicture.childNodes[1].innerHTML = taskFounded.desc;
        taskPicture.childNodes[11].innerHTML = this.getSpanishDate(taskFounded.createdAt);
        taskPicture.childNodes[3].src = taskFounded.url;
    }


    getSpanishDate(date) {
        return new Date(date).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' });
    }
}