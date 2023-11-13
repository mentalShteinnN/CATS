import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { FunctionComponent, useContext } from 'react';
import styles from './catform.module.css';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../../Context/LoginContext';
import { catSchema } from '../../validation/schemas';

export const CatForm: FunctionComponent = () => {
  const navigate = useNavigate();
  const loginContext = useContext(LoginContext);

  const formik = useFormik({
    initialValues: {
      name: '',
      image: '',
      age: '',
      rate: '',
      favorite: 'false',
      description: '',
    },
    validationSchema: catSchema,
    onSubmit: values => {
      console.log(values);
      fetch(`https://cats.petiteweb.dev/api/single/${loginContext.username}/add`, {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: Date.now(),
          name: formik.values.name,
          image: formik.values.image,
          age: formik.values.age,
          rate: formik.values.rate,
          favorite: Boolean(formik.values.favorite.length),
          description: formik.values.description,
        }),
      }).then(response => {
        console.log(response.status);
        navigate('/cats');
      });
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className={styles.form} noValidate>
        <TextField
          onChange={formik.handleChange}
          value={formik.values.name}
          type="text"
          name=""
          id="name"
          placeholder="Введите имя котика"
          required={true}
          helperText={formik.touched.name ? formik.errors.name : ''}
          error={formik.touched.name && Boolean(formik.errors.name)}
          variant="outlined"
        />
        <TextField
          onChange={formik.handleChange}
          value={formik.values.age}
          type="text"
          name=""
          id="age"
          placeholder="Введите возраст котика числом"
          required={true}
          variant="outlined"
          helperText={formik.touched.age ? formik.errors.age : ''}
          error={formik.touched.age && Boolean(formik.errors.age)}
        />
        <TextField
          onChange={formik.handleChange}
          value={formik.values.image}
          type="text"
          name=""
          id="image"
          placeholder="Введите ссылку на картинку из интернета"
          required={true}
          variant="outlined"
          helperText={formik.touched.image ? formik.errors.image : ''}
          error={formik.touched.image && Boolean(formik.errors.image)}
        />
        <TextField
          onChange={formik.handleChange}
          value={formik.values.rate}
          type="text"
          name=""
          id="rate"
          placeholder="Введите рейтинг от 1 до 5"
          required={true}
          variant="outlined"
          helperText={formik.touched.rate ? formik.errors.rate : ''}
          error={formik.touched.rate && Boolean(formik.errors.rate)}
        />
        <FormControlLabel
          control={<Checkbox id="favorite" onChange={formik.handleChange} />}
          label="Любимый котик"
        />
        <TextField
          onChange={formik.handleChange}
          value={formik.values.description}
          type="text"
          name=""
          id="description"
          placeholder="Введите описание котика"
          required={true}
          variant="outlined"
          multiline={true}
        />
        <Button variant="contained" type="submit" className={styles.btn}>
          Добавить котика
        </Button>
      </form>
    </div>
  );
};
