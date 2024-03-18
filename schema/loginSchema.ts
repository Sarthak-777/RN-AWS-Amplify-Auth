import * as yup from 'yup';

const emailRegexp =
  // process.env.NODE_ENV === 'production'
  //   ? /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ :
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const loginSchema = yup.object().shape({
  username: yup.string().required('This field is required'),

  password: yup.string().required('This field is required'),
});

export default loginSchema;
