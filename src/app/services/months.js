import axios from "axios";

const endpoint = 'https://3tpkvl68v9.execute-api.us-east-1.amazonaws.com/dev/api/v1/month';
// const endpoint = 'http://localhost:3000/dev/api/v1/month';

export const createMonth = async (data) => {
    const res = await axios.post(endpoint, data);
    return res.data;
}

export const getMonths = async () => {
    const res = await axios.get(endpoint);
    return res.data;
};