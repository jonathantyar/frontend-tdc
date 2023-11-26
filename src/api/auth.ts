import { authorizedRequest, request } from "./axios";
import { loginRequest, tokenResponse } from "../types/auth";
import { AxiosRequestConfig } from 'axios';

export async function fetchRefresh(): Promise<tokenResponse | undefined> {
  const apiConfig: AxiosRequestConfig<any> = {
      url: "/refresh",
      method: "POST",
      data: {},
  }

  return authorizedRequest<tokenResponse>(apiConfig).then((res) => {
    return res.data
  });
}

export async function fetchLogin(payload: loginRequest): Promise<tokenResponse | undefined> {
  const apiConfig: AxiosRequestConfig<any> = {
      url: "/login",
      method: "POST",
      data: payload,
  }

  return request<tokenResponse>(apiConfig).then((res) => {
    return res.data
  });
}