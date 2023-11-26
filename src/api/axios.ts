import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { toast } from 'react-toastify'

export interface ApiResponse<T> {
  status:         number;
  message:        string;
  data?:          T | undefined;
  error?:         any;
}

export function responseWrapper(raw: ApiResponse<any>): any | undefined {
    return raw
}

export type ApiPromise<T = any> = Promise<T>;

const api: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

export async function request<T>(config: AxiosRequestConfig): Promise<ApiResponse<T>> {
  return await api(config).then((response: AxiosResponse<ApiResponse<T>>) => {
    //* Handle client error
    if (!response.data.status) {
      toast.error(response.data.message)
    }

    return responseWrapper(response.data);
  }).catch((error: AxiosError<{message: string, error: {}}> ) => {
    if (error.response?.data !== undefined) {
      if (error.response.data?.message !== undefined) {
        toast.error(error.response.data?.message)
      } else {
        toast.error(error.message)
      }
    }
    console.log("server err:", error)
    const err: ApiResponse<T> = {
      status:         0,
      message:        error?.message,
      data:           undefined,
      error:          error.response?.data.error,
    }
    return responseWrapper(err);
  })
}

export async function authorizedRequest<T>(config: AxiosRequestConfig): Promise<ApiResponse<T>> {
  //* Intercept user authorization
  let type = localStorage.getItem('_auth_type') ?? ''
  let auth = localStorage.getItem('_auth') ?? ''


  async function checkAuth() {
    if (auth === '') {
      await setTimeout(async function() {
        auth = localStorage.getItem('_auth') ?? '';
        await checkAuth();
      }, 1000);
    }
  }
  await checkAuth();

  config.headers = {
    'Authorization': type + auth
  }

  //* Request
  return request(config)
}
