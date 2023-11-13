import { createContext } from 'react';
import { LoginContextT } from '../types/app';

const defaultState: LoginContextT = {
  username: '',
  setUsername: function () {},
};

export const LoginContext = createContext<LoginContextT>(defaultState);
