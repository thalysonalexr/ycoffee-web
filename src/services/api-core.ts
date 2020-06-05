import axios, { AxiosError } from 'axios';

interface ErrorResponse {
  error: string;
}

interface CoffeeData {
  type: string;
  description: string;
  ingredients: string[];
  preparation: string;
  timePrepare?: string | number;
  portions?: string | number;
}

interface UserData {
  name: string;
  email: string;
  password: string;
}

interface ParamsPagination {
  query?: string;
  input?: string;
  page?: number;
  total?: number;
}

const api = axios.create({
  baseURL: process.env.REACT_APP_API,
});

export const middlewareUnathourized = async (fnAction: Function) => {
  api.interceptors.response.use(
    (_) => _,
    (err: AxiosError<ErrorResponse>) => {
      if (err.response?.status === 401) fnAction();
      throw err;
    }
  );
};

export const getAllCoffees = async <T>(query: string, input: string) => {
  return await api.get<T>(`/coffees?${query}=${input}`);
};

export const authenticate = async <T>(email: string, password: string) => {
  return await api.post<T>('/session', { email, password });
};

export const registerUser = async <T>(
  name: string,
  email: string,
  password: string
) => {
  return await api.post<T>('/users', { name, email, password });
};

export const getAllCoffeesByUser = async <T>({
  query,
  input,
  page,
  total = 5,
}: ParamsPagination) => {
  const filter: (string | null)[] = [];

  filter.push(page ? `page=${page}` : null);
  filter.push(total ? `limit=${total}` : null);
  filter.push(query && input ? `${query}=${input}` : null);

  const q = filter.filter((q) => q !== null).join('&');

  return await api.get<T>(`/coffees/me?${q}`);
};

export const destroyCoffeeById = async (id: string) => {
  return await api.delete(`/coffees/${id}`);
};

export const createNewCoffee = async <T>(coffeeData: CoffeeData) => {
  return await api.post<T>(`/coffees`, coffeeData);
};

export const uploadCoffeeImage = async <T>(
  id: string,
  data: FormData,
  updateFileProgress: (progress: number) => void
) => {
  return await api.put<T>(`/coffees/${id}/image`, data, {
    onUploadProgress: (e: ProgressEvent) => {
      const progress = (e.loaded * 100) / e.total;
      updateFileProgress(progress);
    },
  });
};

export const getCoffeeById = async <T>(id: string) => {
  return await api.get<T>(`/coffees/${id}`);
};

export const updateCoffee = async <T>(id: string, coffeeData: CoffeeData) => {
  return await api.put<T>(`/coffees/${id}`, coffeeData);
};

export const getUserAccount = async <T>() => {
  return await api.get<T>('/users');
};

export const destroyUserAccount = async () => {
  return await api.delete('/users');
};

export const updateUserAccount = async <T>(userData: UserData) => {
  return await api.put<T>('/users', userData);
};

export const uploadUserAvatar = async <T>(
  data: FormData,
  updateFileProgress: (progress: number) => void
) => {
  return await api.put<T>('/users/avatar', data, {
    onUploadProgress: (e: ProgressEvent) => {
      const progress = (e.loaded * 100) / e.total;
      updateFileProgress(progress);
    },
  });
};

export default api;
