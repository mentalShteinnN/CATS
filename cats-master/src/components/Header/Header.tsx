import { FC, useContext } from 'react';
import styles from './header.module.css';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { LoginContext } from '../../Context/LoginContext';
import { Button } from '@mui/material';
import { CatsContext } from '../../Context/CatsContext';

export const Header: FC = () => {
  const loginContext = useContext(LoginContext);
  const catContext = useContext(CatsContext);

  return (
    <header className={styles.container}>
      <h2 className={styles.header}>
        <AccountCircleRoundedIcon htmlColor="#fff" />
        <p>{loginContext.username}</p>
      </h2>
      <Button
        variant="contained"
        color="error"
        onClick={() => {
          localStorage.removeItem('username');
          catContext.setLogined(false);
        }}
      >
        Выйти
      </Button>
    </header>
  );
};
