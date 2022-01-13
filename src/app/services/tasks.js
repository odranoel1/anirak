import axios from "axios";
import { apiURL } from "../config/keys";

const endpoint = `${apiURL}/task`;

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

export const getTask = async (taskId) => {
    const res = await axios.get(`${endpoint}/${taskId}`);
    return res.data;
};