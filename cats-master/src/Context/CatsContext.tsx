import { createContext } from 'react';
import { CatContext } from '../types/app';

const defaultState: CatContext = {
  id: 1,
  setId: function () {},
  catUpdateFn: function () {},
  catUpdate: false,
  updated: false,
  setUpdated: function () {},
  logined: false,
  setLogined: function () {},
};

export const CatsContext = createContext<CatContext>(defaultState);
