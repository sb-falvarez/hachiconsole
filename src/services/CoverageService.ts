import axios from "axios";
import { RequestCoverage } from "../classes/RequestCoverage";

export const createCoverage = async (request:RequestCoverage) => {
    const url = "http://localhost:3000/api/document";
    try {
        const response = await axios.post(url, request);
        return response.data;
    } catch (error:any) {
        return `error: ${ JSON.stringify(request)} - ${error.message}`;
    }

}