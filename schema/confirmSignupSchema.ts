import * as yup from 'yup';

const confirmSignupSchema = yup.object().shape({
  code: yup.string().required('This field is required'),
});

export default confirmSignupSchema;
