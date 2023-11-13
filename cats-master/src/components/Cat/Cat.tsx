import { FunctionComponent, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CatT } from '../../types/app';
import { LoginContext } from '../../Context/LoginContext';
import styles from './cat.module.css';
import UndoIcon from '@mui/icons-material/Undo';

export const Cat: FunctionComponent = () => {
  const navigate = useNavigate();
  const params = useParams();
  const loginContext = useContext(LoginContext);

  const [cat, setCat] = useState<CatT>();

  useEffect(() => {
    fetch(`https://cats.petiteweb.dev/api/single/${loginContext.username}/show/${params.id}`, {
      method: 'get',
    }).then(function (response) {
      if (response.ok) {
        response.json().then(data => setCat(data));
      } else {
        throw new Error('Ошибка при выполнении запроса');
      }
    });
  }, [params.id]);

  function ageChoice(age: number) {
    if (age >= 5 && age <= 20) {
      return 'лет';
    }
    const strAge = age.toString();
    if (strAge.endsWith('1')) {
      return 'год';
    } else if (strAge.endsWith('2') || strAge.endsWith('3') || strAge.endsWith('4')) {
      return 'года';
    } else {
      return 'лет';
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.flex}>
        <h1 className={styles.header}>Имя котика: {cat?.name}</h1>
        <div className={styles.backIcon} onClick={() => navigate('/cats')}>
          <UndoIcon color="error" sx={{ fontSize: 40 }} />
        </div>
      </div>
      <div className={styles.desc}>
        <p>
          Возраст: {cat?.age} {ageChoice(cat?.age ? cat.age : 1)}
        </p>
        <p>Описание котика: {cat?.description === '' ? 'Нет описания :(' : cat?.description}</p>
        <p>{cat?.rate} лучших котиков из 5</p>
        <p>
          {cat?.favorite
            ? 'Это ваш любимый котик'
            : 'Это не самый любимый котик, но он тоже милашка!'}
        </p>
      </div>
      <img className={styles.img} src={cat?.image} alt="" />
    </div>
  );
};
