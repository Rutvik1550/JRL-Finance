import * as Yup from 'yup';
import React from 'react';
// import { Link as RouterLink } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, Alert, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// routes
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
// import { PATH_AUTH } from '../../../routes/paths';
// hooks
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField } from '../../../components/hook-form';

// ----------------------------------------------------------------------

LoginForm.propTypes = {
  phoneNumber: PropTypes.number,
  setPhoneNumber: PropTypes.func,
};

const style = {
  '& .MuiFilledInput-root': {
    borderRadius: '10px',
    height: "54px",
    '&::after': {
      display: 'none',
    },
    '&::before': {
      display: 'none',
    },
  },
  "& .MuiInputAdornment-root": {
    margin: "0 16px 0 0 !important",
    width: "36px",
    height: "36px",
    background: "#fff",
    borderRadius: "8px"
  },
  "& input": {
    padding: "0"
  },
  fontSize: "20px"
};

export default function LoginForm({ setPhoneNumber }) {
  const { login } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const isMountedRef = useIsMountedRef();

  // const [showPassword, setShowPassword] = useState(false);

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const LoginSchema = Yup.object().shape({
    mobile: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required('Mobile Number is required.'),
    // password: Yup.string().required("Password is required"),
  });

  const defaultValues = {
    mobile: '',
    // password: 'demo1234',
    remember: true,
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      setPhoneNumber(data.mobile);
      // const res = await login(data.mobile, '+91');

      // if (res.message) {
      //   enqueueSnackbar(res.message);
      // }
    } catch (error) {
      console.error(error);
      setError('afterSubmit', { ...error, message: error.message });
      reset();
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3} sx={{ my: 2, mx: 4 }}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

        <RHFTextField
          name="mobile"
          placeholder="Enter your Mobile Number"
          variant="filled"
          type="number"
          sx={style}
          InputProps={{
            startAdornment: <InputAdornment position="start"><Iconify icon={'mdi:user-outline'} sx={{ fontSize: "36px" }} /></InputAdornment>,
          }}
        />
      </Stack>

      <Stack spacing={3} sx={{ my: 2, mx: 4 }}>
        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Get OTP <Iconify icon={'octicon:arrow-right-16'} sx={{ fontSize: "20px", marginLeft: "5px" }} />
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
