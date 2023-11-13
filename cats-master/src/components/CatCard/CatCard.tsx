import { FC, useContext } from 'react';
import { CardT } from '../../types/app';
import { Link } from 'react-router-dom';
import { CatsContext } from '../../Context/CatsContext';
import { LoginContext } from '../../Context/LoginContext';
import { Button } from '@mui/material';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import styles from './catcard.module.css';

export const CatCard: FC<CardT> = ({ card }) => {
  const { name, id, image } = card;

  const catContext = useContext(CatsContext);
  const loginContext = useContext(LoginContext);

  function setContext(): void {
    catContext.setId(id);
    catContext.catUpdateFn(!catContext.catUpdate);
  }

  function deleteCat(): void {
    fetch(`https://cats.petiteweb.dev/api/single/${loginContext.username}/delete/${id}`, {
      method: 'delete',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(response => {
      catContext.setUpdated(!catContext.updated);
      console.log(response.status);
    });
  }

  return (
    <div className={styles.container}>
      <div className={styles.cat_info}>
        <h2 className={styles.header}>{name}</h2>
        {<img src={image} className={styles.img}></img>}
        <Link className={styles.link} to={`${id}`}>
          Больше про котика
        </Link>
      </div>
      <div className={styles.btns}>
        <Button variant="contained" onClick={() => setContext()}>
          Редактировать котика
        </Button>
        <Button
          variant="outlined"
          color="error"
          startIcon={<DeleteRoundedIcon />}
          onClick={() => deleteCat()}
        >
          Удалить котика
        </Button>
      </div>
    </div>
  );
};
