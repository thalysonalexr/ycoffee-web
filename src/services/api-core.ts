import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API,
});

export const getAllCoffees = async <T>(query: string, input: string) => {
  return api.get<{ coffees: T[] }>(`/coffees?${query}=${input}`);
}

export const authenticate = async <T>(email: string, password: string) => {
  return await api.post<T>('/session', { email, password, });
}

export const registerUser = async <T>(name: string, email: string, password: string) => {
  return await api.post<T>('/users', { name, email, password });
}

export default api;
