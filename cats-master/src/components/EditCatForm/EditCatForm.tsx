import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { FC, RefObject, useContext, useEffect, useRef, useState } from 'react';
import styles from './editCatForm.module.css';
import { CatsContext } from '../../Context/CatsContext';
import { CatT } from '../../types/app';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../../Context/LoginContext';
import { catSchema } from '../../validation/schemas';
import CloseIcon from '@mui/icons-material/Close';

export const EditCatForm: FC = () => {
  const navigate = useNavigate();

  const scrollTargetRef = useRef() as RefObject<HTMLInputElement>;

  function scrollHandle() {
    scrollTargetRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  const catContext = useContext(CatsContext);
  const loginContext = useContext(LoginContext);

  const [curCat, setCat] = useState<CatT>();

  const formik = useFormik({
    initialValues: {
      name: curCat ? curCat.name : '',
      image: curCat ? curCat.image : '',
      age: curCat ? curCat.age : '',
      rate: curCat ? curCat.rate : '',
      favorite: curCat ? curCat.favorite : false,
      description: curCat ? curCat.description : '',
    },
    validationSchema: catSchema,
    onSubmit: () => {
      fetch(
        `https://cats.petiteweb.dev/api/single/${loginContext.username}/update/${catContext.id}`,
        {
          method: 'put',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: catContext.id,
            name: formik.values.name,
            image: formik.values.image,
            age: formik.values.age,
            rate: formik.values.rate,
            favorite: formik.values.favorite,
            description: formik.values.description,
          }),
        },
      ).then(response => {
        catContext.setUpdated(!catContext.updated);
        console.log(response.status);
      });
      catContext.catUpdateFn(false);
      navigate('/cats');
    },
  });

  useEffect(() => {
    fetch(`https://cats.petiteweb.dev/api/single/${loginContext.username}/show/`, {
      method: 'get',
    }).then(function (response) {
      if (response.ok) {
        response.json().then(data => {
          const cat: CatT = data.find((e: CatT) => e.id === catContext.id);
          setCat(cat);
          formik.values.name = cat.name;
          formik.values.image = cat.image;
          formik.values.age = cat.age;
          formik.values.rate = cat.rate;
          formik.values.favorite = cat.favorite;
          formik.values.description = cat.description;
        });
      } else {
        throw new Error('Ошибка при выполнении запроса');
      }
    });
    scrollHandle();
  }, []);

  const h = document.documentElement.scrollHeight;

  return (
    <div className={styles.container} style={{ height: `${h}px` }} ref={scrollTargetRef}>
      <div
        className={styles.close}
        onClick={() => {
          catContext.catUpdateFn(false);
        }}
      >
        <CloseIcon color="error" sx={{ fontSize: 50 }} />
      </div>
      <form onSubmit={formik.handleSubmit} className={styles.form} noValidate>
        <TextField
          onChange={formik.handleChange}
          value={formik.values.name}
          type="text"
          name=""
          id="name"
          placeholder={curCat ? curCat?.name : 'Введите имя котика'}
          required={true}
          variant="outlined"
          label="Имя котика"
          helperText={formik.touched.name ? formik.errors.name : ''}
          error={formik.touched.name && Boolean(formik.errors.name)}
        />
        <TextField
          onChange={formik.handleChange}
          value={formik.values.age}
          type="text"
          name=""
          id="age"
          placeholder={curCat ? curCat?.age.toString() : 'Введите возраст котика числом'}
          required={true}
          variant="outlined"
          label="Возраст котика"
          helperText={formik.touched.age ? formik.errors.age : ''}
          error={formik.touched.age && Boolean(formik.errors.age)}
        />
        <TextField
          onChange={formik.handleChange}
          value={formik.values.image}
          type="text"
          name=""
          id="image"
          placeholder={curCat ? curCat?.image : 'Введите ссылку на картинку из интернета'}
          required={true}
          variant="outlined"
          label="Ссылка на фотку"
          helperText={formik.touched.image ? formik.errors.image : ''}
          error={formik.touched.image && Boolean(formik.errors.image)}
        />
        <TextField
          onChange={formik.handleChange}
          value={formik.values.rate}
          type="text"
          name=""
          id="rate"
          placeholder={curCat ? curCat?.rate.toString() : 'Введите рейтинг от 1 до 5'}
          required={true}
          variant="outlined"
          label="Ваша оценка от 1 до 5"
          helperText={formik.touched.rate ? formik.errors.rate : ''}
          error={formik.touched.rate && Boolean(formik.errors.rate)}
        />
        <FormControlLabel
          control={
            <Checkbox
              id="favorite"
              checked={formik.values.favorite || false}
              onChange={formik.handleChange}
            />
          }
          label="Любимый котик"
        />
        <TextField
          onChange={formik.handleChange}
          value={formik.values.description}
          type="text"
          name=""
          id="description"
          placeholder={curCat ? curCat?.description : 'Введите опписаниу котика'}
          variant="outlined"
          multiline={true}
          label="Описание котика"
        />
        <Button variant="contained" type="submit">
          Изменить котика
        </Button>
      </form>
    </div>
  );
};
