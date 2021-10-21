import { Task } from "./Task";
import { getTasks, deleteTask, createTask, editTask } from '../../app/services/tasks';

export class TaskList {
    constructor() {
        this.txtInput = document.querySelector('#new-task');
        this.todoList = document.querySelector('#Plans .item #todo-list');
        getTasks().then(resp => {
            this.tasks = resp.data;
            this.tasks.map(task => {
                task.todoList = this.todoList;
                const newTask = new Task(task);
                newTask.createTask();
            });
        });
    }

    addTask() {
        this.txtInput.addEventListener('keyup', (event) => {
            if (event.keyCode === 13 && this.txtInput.value.length > 0) {

                const newTask = new Task({
                    desc: this.txtInput.value,
                    todoList: this.todoList
                });

                createTask(newTask)
                    .then(data => {
                        if (data.success) {
                            console.log(newTask);
                            newTask.createTask();
                            this.txtInput.value = '';
                            this.tasks.push(newTask);
                        }
                    })
            }
        });
    }

    actionTask() {
        this.todoList.addEventListener('click', (event) => {
            const target = event.target;
            let taskId = target.getAttribute('data-id');
            let classTarget = '';
            if (target.localName === 'button') {
                taskId = target.parentElement.getAttribute('data-id');
                classTarget = target.classList;
                let [taskFounded] = this.tasks.filter(task => task.id === taskId);
                taskFounded = new Task(taskFounded);

                if (classTarget.contains('fa-edit')) {
                    taskFounded.completed = true;
                    editTask(taskFounded)
                        .then(res => {
                            if (res.success) {
                                taskFounded.markCompleted(classTarget);
                            }
                        });
                }

                if (classTarget.contains('fa-trash')) {
                    deleteTask(taskId)
                        .then(res => {
                            if (res.success) {
                                taskFounded.deleteTask(target.parentElement);
                                this.tasks = this.tasks.filter(task => (task.id !== taskId));
                            }
                        })
                        .catch(err => console.log(err));
                }
            }
        });
    }
}