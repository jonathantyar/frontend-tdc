export interface userResponse {
  id:                number;
  name:              string;
  email:             string;
  email_verified_at: string;
  created_at:        string;
  updated_at:        string;
}

export interface userRequest {
  name:     string;
  email:    string;
  password?: string;
}
