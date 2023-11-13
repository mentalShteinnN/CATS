export interface CatPropT {
  id: number;
}

export interface CardT {
  card: CatT;
}

export interface CatT {
  id: number;
  name: string;
  image: string;
  age: number;
  rate: number;
  favorite: boolean;
  description: string;
}

export interface editCatProps {
  id: number;
}

export interface CatContext {
  id: number;
  setId: (value: React.SetStateAction<number>) => void;
  catUpdateFn: (value: React.SetStateAction<boolean>) => void;
  catUpdate: boolean;
  updated: boolean;
  setUpdated: (value: React.SetStateAction<boolean>) => void;
  logined: boolean;
  setLogined: (value: React.SetStateAction<boolean>) => void;
}

export interface LoginContextT {
  username: string;
  setUsername: (value: React.SetStateAction<string>) => void;
}
