import { number, object, string } from 'yup';

export const catSchema = object().shape({
  name: string()
    .min(2, 'Слишком короткое имя!')
    .max(20, 'Слишком длинное имя!')
    .required('Имя котика обязательно!'),
  image: string()
    .matches(/\.(jpg|png|jpeg)$/, 'Это не картинка')
    .required('Картинка обязательна!'),
  age: number().min(0, 'Не может быть меньше 0 лет').required('Возраст обязателен!'),
  rate: number()
    .min(1, 'Рейтинг должен быть от 1 до 5')
    .max(5, 'Рейтинг должен быть от 1 до 5')
    .required('Введите рейтинг своего котика!'),
});
