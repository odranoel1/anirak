import { Task } from "./Task";
import { getTask, getTasks } from '../../app/services/tasks';
import { Picture } from "./Picture";

export class TaskList {
    constructor() {
        this.fileLoader = null;
        this.picture = null;
        this.tasks = [];
        getTasks().then(res => {
            this.tasks = res.data;
            const lastTaskAdded = this.tasks[0];
            lastTaskAdded.url = lastTaskAdded.url ? lastTaskAdded.url : '';
            Task.addPictureView(lastTaskAdded);
            this.tasks.forEach(task => {
                task.id = task._id;
                const newTask = new Task(task);
                newTask.appendView();
            });
        });

        this.newPicture = new Picture();
    }

    addLastTaskFirst(newTask) {
        this.tasks.unshift(newTask);
        const todoList = document.querySelector('#Plans .item #todo-list');
        todoList.innerHTML = '';
        this.tasks.forEach(task => {
            task.id = task._id;
            const newTask = new Task(task);
            newTask.appendView();
        });
    }

    listenInput() {
        const txtInput = document.querySelector('#new-task');
        txtInput.addEventListener('keyup', async (event) => {
            if (event.keyCode === 13 && txtInput.value.length > 0) {
                const newTask = new Task({ desc: txtInput.value });
                await newTask.createTask();
                txtInput.value = '';
            }
        });
    }

    listenTodo() {
        const todoList = document.querySelector('#Plans .item #todo-list');
        todoList.addEventListener('click', async (event) => {
            // Assign Id
            const target = event.target;
            let taskId = target.getAttribute('data-id');
            if (target.classList.contains('fa-check') || target.classList.contains('fa-edit') || target.classList.contains('fa-trash')) {
                taskId = target.parentElement.getAttribute('data-id');
            }

            const { data } = await getTask(taskId);
            data.id = data._id;
            const taskFounded = new Task(data);
            Task.addPictureView(taskFounded);
            localStorage.setItem('task', JSON.stringify(taskFounded));

            // Actions
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
}