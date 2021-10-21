const endpoint = 'https://3tpkvl68v9.execute-api.us-east-1.amazonaws.com/dev/api/v1/task';

export const createTask = async (task) => {
    let res = await fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify(task),
    });
    res = await res.json();
    return res;
};

export const editTask = async (task) => {
    let res = await fetch(`${endpoint}/${task.id}`, {
        method: 'PUT',
        body: JSON.stringify(task),
    });
    res = await res.json();
    return res;
};

export const getTasks = async () => {
    let res = await fetch(endpoint, { method: 'GET' });
    res = await res.json();
    return res;
};

export const deleteTask = async (taskId) => {
    let res = await fetch(`${endpoint}/${taskId}`, { method: 'DELETE' });
    res = await res.json();
    return res;
};