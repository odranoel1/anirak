import { Task } from "./Task";
import { plans } from '../../assets/data.json';

export default () => {
    const txtInput = document.querySelector('#new-task');
    const todoList = document.querySelector('#Plans .item #todo-list');
    const tasks = [];

    plans.forEach(task => {
        const taskLoaded = new Task(task);
        tasks.push(taskLoaded);
        taskLoaded.createTask(txtInput, todoList);
    });

    txtInput.addEventListener('keyup', (event) => {
        if (event.keyCode === 13 && txtInput.value.length > 0) {
            const task = txtInput.value;
            const newTask = new Task({ desc: task });
            newTask.createTask(txtInput, todoList);
            tasks.push(newTask);
        }
    });

    todoList.addEventListener('click', (event) => {
        const target = event.target;
        let taskId = target.getAttribute('data-id');
        let classTarget = '';
        if (target.localName === 'button') {
            taskId = target.parentElement.getAttribute('data-id');
            classTarget = target.classList;
            const [taskFounded] = tasks.filter(task => task.id === taskId);

            if (classTarget.contains('fa-edit')) {
                taskFounded.markCompleted(classTarget);
            }

            if (classTarget.contains('fa-trash')) {
                taskFounded.deleteTask(todoList, target.parentElement);
                // tasks = tasks.filter(task => (task.id !== taskId));
            }
        }
    });
}