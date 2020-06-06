import api from './api';

interface Response {
  data: {
    token: string;
    user: {
      name: string;
      email: string;
    };
  };
  error?: object;
}
interface AuthData {
  email: string;
  password: string;
}
export async function signIn(data: AuthData): Promise<Response> {
  try {
    return await api.post('/users/authenticate', data);
  } catch (error) {
    const dataError = {
      data: {
        token: ' ',
        user: {
          name: ' ',
          email: ' ',
        },
      },
      error,
    };
    return dataError;
  }
}
