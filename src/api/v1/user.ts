import { AxiosRequestConfig } from "axios";
import { userRequest, userResponse } from "../../types/user";
import { authorizedRequest } from "../axios";

export async function fetchListUser(): Promise<userResponse[] | undefined> {
  const apiConfig: AxiosRequestConfig<any> = {
      url: "/v1/user",
      method: "GET",
      data: {},
  }

  return authorizedRequest<userResponse[]>(apiConfig).then((res) => {
    return res.data
  });
}

export async function fetchShowUser(id: number): Promise<userResponse | undefined> {
  const apiConfig: AxiosRequestConfig<any> = {
      url: `/v1/user/`+id.toString(),
      method: "GET",
      data: {},
  }

  return authorizedRequest<userResponse>(apiConfig).then((res) => {
    return res.data
  });
}

export async function fetchStoreUser(payload: userRequest): Promise<userResponse | undefined> {
  const apiConfig: AxiosRequestConfig<any> = {
      url: `/v1/user/`,
      method: "POST",
      data: payload,
  }

  return authorizedRequest<userResponse>(apiConfig).then((res) => {
    return res.data
  });
}

export async function fetchUpdateUser(id: number, payload: userRequest): Promise<userResponse | undefined> {
  const apiConfig: AxiosRequestConfig<any> = {
      url: `/v1/user/`+id.toString(),
      method: "PUT",
      data: payload,
  }

  return authorizedRequest<userResponse>(apiConfig).then((res) => {
    return res.data
  });
}

export async function fetchDestroyUser(id: number): Promise<void | undefined> {
  const apiConfig: AxiosRequestConfig<any> = {
      url: `/v1/user/`+id.toString(),
      method: "DELETE",
      data: {},
  }

  return authorizedRequest<number>(apiConfig).then((res) => {
  });
}
