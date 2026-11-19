
export interface User {
  id: number;
  name: string;
  age: number;
  city: string;
  state: string;
  pincode: string;
}

export interface CreateUserRequest {
  name: string;
  age: number;
  city: string;
  state: string;
  pincode: string;
}

export interface LoginRequest{
      username: string;
      password: string;
}

export interface LoginResponse{
    
  accessToken: string;
  tokenType: string;
  expiresAt: string;
  user: UserResponse;
}
export interface UserResponse {
  name: string;
  email: string;
  role: string;
}