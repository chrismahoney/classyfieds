import React from 'react';
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

const Login = () => {
  const { register, handleSubmit, control, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

  return (
    <>
      <Container style={{ marginTop: 20 }}>
        <Typography variant="h4" style={{ textAlign: 'center' }}>
          Login
        </Typography>
      </Container>
      <Container style={{ margin: 20 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={4}>
            <Grid item xs="12">
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
            <Grid item xs="12">
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
            <Grid item xs="12">
              <input type="submit" />
            </Grid>
          </Grid>
        </form>
      </Container>
    </>
  );

}

export default Login;