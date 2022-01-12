import axios from "axios";

const endpoint = 'https://3tpkvl68v9.execute-api.us-east-1.amazonaws.com/dev/api/v1/task';
// const endpoint = 'http://localhost:3000/dev/api/v1/task';

export const createTask = async (task) => {
    const res = await axios.post(endpoint, JSON.stringify(task));
    return res.data;
};

export const editTask = async (task) => {
    const res = await axios.put(`${endpoint}/${task.id}`, JSON.stringify(task));
    return res.data;
};

export const getTasks = async () => {
    const res = await axios.get(endpoint);
    return res.data;
};

export const deleteTask = async (taskId) => {
    const res = await axios.delete(`${endpoint}/${taskId}`);
    return res.data;
};