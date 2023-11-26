export interface tokenResponse {
  token: string
}

export interface loginRequest {
  email: string
  password: string
}

export interface registerRequest {
  name: string
  email: string
  password: string
}