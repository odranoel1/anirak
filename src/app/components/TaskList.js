import { Task } from "./Task";
import { getTasks } from '../../app/services/tasks';

export class TaskList {
    constructor() {
        this.todoList = document.querySelector('#Plans .item #todo-list');
        getTasks().then(res => {
            this.tasks = res.data;
            this.tasks.map(task => {
                task.todoList = this.todoList;
                const newTask = new Task(task);
                newTask.appendView();
            });
        });
    }

    listenInput() {
        const txtInput = document.querySelector('#new-task');
        txtInput.addEventListener('keyup', async (event) => {
            if (event.keyCode === 13 && txtInput.value.length > 0) {
                const newTask = new Task({
                    desc: txtInput.value,
                    todoList: this.todoList
                });
                newTask.createTask();
                txtInput.value = '';
                this.tasks.push(newTask);
            }
        });
    }

    listenTodo() {
        this.todoList.addEventListener('click', async (event) => {
            const target = event.target;
            let taskId = target.getAttribute('data-id');
            let classTarget = '';
            if (target.localName === 'button') {
                taskId = target.parentElement.getAttribute('data-id');
                classTarget = target.classList;
                let [taskFounded] = this.tasks.filter(task => task.id === taskId);
                taskFounded = new Task(taskFounded);

                if (classTarget.contains('fa-edit') || classTarget.contains('fa-check')) {
                    await taskFounded.editTask(target, classTarget);
                }

                if (classTarget.contains('fa-trash')) {
                    await taskFounded.deleteTask(target);
                    this.tasks = this.tasks.filter(task => (task.id !== taskId));
                }
            }
        });
    }
}