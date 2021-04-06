import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/router";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function SignIn(props) {
  const classes = useStyles();
  const router = useRouter();
  const { control, handleSubmit } = useForm();

  const onSubmit = data => {
    axios
      .post(`${props.env.api_url}/login`, JSON.stringify(data))
      .then(value => {
        console.log(value.data);
        if (value.data.success) {
          props.setUserLogin(value.data.data);
          router.replace("/");
        } else {
          alert(value.data.message);
        }
      })
      .catch(reason => {
        console.log(reason);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <img
          src="https://upload.wikimedia.org/wikipedia/th/e/e0/RMUTI_KORAT.png"
          className="rounded mx-auto d-block w-25"
          alt="logo"
        ></img>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="username"
            control={control}
            defaultValue=""
            render={({ onChange, value }) => (
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Username"
                onChange={onChange}
                value={value}
                type="text"
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ onChange, value }) => (
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Password"
                onChange={onChange}
                value={value}
                type="password"
              />
            )}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  );
}
