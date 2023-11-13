import { FunctionComponent, useContext, useEffect, useState } from 'react';
import { CatT } from '../../types/app';
import { CatCard } from '../CatCard/CatCard';
import { CatsContext } from '../../Context/CatsContext';
import { EditCatForm } from '../EditCatForm/EditCatForm';
import { LoginContext } from '../../Context/LoginContext';
import { Outlet, useNavigate } from 'react-router-dom';
import { Button, useMediaQuery } from '@mui/material';
import styles from './catslist.module.css';

export const CatsList: FunctionComponent = () => {
  const [cats, setCat] = useState<CatT[]>();
  const navigate = useNavigate();
  const matchesM = useMediaQuery('(max-width:1330px)');
  const matchesS = useMediaQuery('(max-width:940px)');
  const matchesXS = useMediaQuery('(max-width:550px)');

  const catContext = useContext(CatsContext);
  const loginContext = useContext(LoginContext);

  console.log(loginContext.username);

  function adaptive(): React.CSSProperties {
    if (matchesXS) {
      return { margin: '40px auto', gridTemplateColumns: 'repeat(1, 1fr)' };
    } else if (matchesS) {
      return { gridTemplateColumns: 'repeat(1, 1fr)' };
    } else if (matchesM) {
      return { gridTemplateColumns: 'repeat(2, 1fr)' };
    } else {
      return {};
    }
  }

  useEffect(() => {
    fetch(`https://cats.petiteweb.dev/api/single/${loginContext.username}/show/`, {
      method: 'get',
    }).then(function (response) {
      if (response.ok) {
        response.json().then(data => setCat(data));
      } else {
        throw new Error('Ошибка при выполнении запроса');
      }
    });
  }, [catContext.updated]);

  return (
    <div className={styles.container}>
      {Boolean(cats?.length) ? (
        <div className={styles.grid} style={adaptive()}>
          {cats?.map(e => <CatCard key={e.id} card={e} />)}
        </div>
      ) : (
        <h1 className={styles.addFirst}>Добавьте своего первого котика!</h1>
      )}
      {catContext.catUpdate && <EditCatForm />}
      <Button className={styles.btn} onClick={() => navigate('/add')} variant="contained">
        Добавить нового котика!
      </Button>
      <Outlet />
    </div>
  );
};
