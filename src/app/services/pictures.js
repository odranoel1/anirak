import axios from "axios";

const endpoint = 'https://3tpkvl68v9.execute-api.us-east-1.amazonaws.com/dev/api/v1/file';
// const endpoint = 'http://localhost:3000/dev/api/v1/file';

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