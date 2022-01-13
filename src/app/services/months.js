import axios from "axios";
import { apiURL } from "../config/keys";

const endpoint = `${apiURL}/month`;

export const createMonth = async (data) => {
    const res = await axios.post(endpoint, data);
    return res.data;
}

export const getMonths = async () => {
    const res = await axios.get(endpoint);
    return res.data;
};