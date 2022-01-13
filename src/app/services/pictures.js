import axios from "axios";
import { apiURL } from "../config/keys";

const endpoint = `${apiURL}/file`;

export const createUrl = async (data) => {
    const res = await axios.post(endpoint, data);
    return res.data.data;
};

export const uploadPicture = async (url, formData) => {
    const res = await axios.post(url, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return res.status === 204;
};