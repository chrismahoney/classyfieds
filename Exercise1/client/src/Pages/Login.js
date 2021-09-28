import React, {
  useState
} from 'react';
import { 
  Controller,
  useForm 
} from 'react-hook-form';

import {
  Typography,
  Container,
  TextField,
  Grid
} from '@mui/material';
import Authentication from '../services/Authentication';

const Login = (props) => {
  const [errorMessage, setErrorMessage] = useState({});

  const { register, handleSubmit, control, formState: { errors } } = useForm();
  const onSubmit = (data) => {
    console.log(data);

    // TODO: Catch and respond with 400 message (Invalid credentials)
    const credentials = { email: data.username, password: data.password };
    Authentication.login(credentials)
      .then(res => {
        console.log(res);
        // Login was successful, capture user info to local storage
        // and redirect to listings page. Display error messaging on failure.
        if (res.status === 200) {
          localStorage.setItem("userInfo", JSON.stringify(res.data));
          props.history.push('/');
        } else {
          setErrorMessage({ message: `Error (${res.status}) ${res.data.error}` })
        }
      })
      .catch(err => {
        setErrorMessage({ message: err });
      })
  }

  return (
    <>
      <Container style={{ marginTop: 20 }}>
        <Typography variant="h4" style={{ textAlign: 'center' }}>
          Login
        </Typography>
      </Container>
      <Container style={{ margin: 20 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={4} justifyContent="center" alignItems="center">
            <Grid item>
              <Controller
                name="username"
                control={control}
                defaultValue={""}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField label="username" {...field} />
                )}
              />
            </Grid>
            <Grid item>
              <Controller
                name="password"
                control={control}
                defaultValue={""}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField label="password" type="password" {...field} />
                )}
              />
            </Grid>
            <Grid item>
              <input type="submit" />
            </Grid>
            {/* <Grid item>
              {errorMessage && (
                <div style={{ color: 'red' }}>
                  {JSON.stringify(errorMessage.message)}
                </div>
              )}
              {errors && (
                <div style={{ color: 'red' }}>
                  {JSON.stringify(errors)}
                </div>
              )}
            </Grid> */}
          </Grid>
        </form>
      </Container>
    </>
  );

}

export default Login;