/** @format */
import axios from 'axios';
import { create } from 'apisauce';

export const apiServer = axios.create({
	baseURL: process.env.REACT_APP_RAKETERO_API_PATH,
});

apiServer.interceptors.request.use((request) => {
	return request;
});

export const WebClient = create({ axiosInstance: apiServer });

WebClient.addResponseTransform((response) => {
	return response;
});
