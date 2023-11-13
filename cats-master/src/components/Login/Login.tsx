import { FC, KeyboardEvent, RefObject, useContext, useEffect, useRef, useState } from 'react';
import { Button, TextField } from '@mui/material';
import { CatsContext } from '../../Context/CatsContext';
import { LoginContext } from '../../Context/LoginContext';
import { Outlet, useNavigate } from 'react-router-dom';
import { Header } from '../Header/Header';

export const Login: FC = () => {
  const usernameRef = useRef() as RefObject<HTMLInputElement> | null;
  const navigate = useNavigate();

  const [username, setUsername] = useState(localStorage.getItem('username') ?? '');
  const [error, setError] = useState('');

  const catContext = useContext(CatsContext);
  const loginContext = useContext(LoginContext);

  function handleLogin(): void {
    if (username.length >= 1) {
      loginContext.username = username;
      catContext.setLogined(true);
      navigate('/cats');
      localStorage.setItem('username', username);
      setError('');
    } else {
      setError('Имя пользователя не может быть пустым!');
    }
  }

  useEffect(() => {
    if (username.length >= 1) {
      setError('');
    } else {
      setError('Имя пользователя не может быть пустым!');
    }
  }, [username]);

  useEffect(() => {
    if (username) {
      loginContext.username = username;
      catContext.setLogined(true);
    }
  }, []);

  return (
    <LoginContext.Provider value={{ username: username, setUsername: setUsername }}>
      {catContext.logined && <Header />}
      {!catContext.logined && (
        <div
          className="gap-10 flex flex-col justify-center items-center w-[500px] h-[500px] shadow-lg shadow-blue absolute top-[calc(100vh/2-250px)] left-[calc(100vw/2-250px)] border-4 border-blue rounded-[40px]"
          onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => {
            if (e.code === 'Enter') {
              handleLogin();
            }
          }}
          tabIndex={1}
        >
          <h1 className="font-roboto text-blue text-3xl font-semibold">Введите имя пользователя</h1>
          <TextField
            onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
              if (e.code === 'Enter') {
                handleLogin();
              }
            }}
            value={username}
            helperText={error.length > 0 ? error : ''}
            error={Boolean(error)}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setUsername(e.target.value);
            }}
            ref={usernameRef}
          />
          <Button variant="contained" onClick={() => handleLogin()}>
            Войти
          </Button>
        </div>
      )}
      {catContext.logined && <Outlet />}
    </LoginContext.Provider>
  );
};
