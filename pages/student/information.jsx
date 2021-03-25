import React from "react";
import { useRouter } from "next/router";
import StudentTheme from "../../components/StudentTheme";
import { makeStyles } from "@material-ui/core/styles";
import { useForm, Controller } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "50%",
    marginTop: theme.spacing(1),
  },
}));

export default function student(props) {
  const classes = useStyles();
  const router = useRouter();
  const { control, handleSubmit } = useForm();

  const onSubmit = (data) => {
    axios
      .post(`${props.env.api_url}/login`, JSON.stringify(data))
      .then((value) => {
        console.log(value.data);
        if (value.data.success) {
          props.setUserLogin(value.data.data);
          router.replace("/");
        } else {
          alert(value.data.message);
        }
      })
      .catch((reason) => {
        console.log(reason);
      });
  };

  React.useEffect(() => {}, []);

  return (
    <StudentTheme {...props}>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <div class="custom-file mb-3">
          <input
            type="file"
            class="custom-file-input"
            id="validatedCustomFile"
            required
          ></input>
          <label class="custom-file-label" for="validatedCustomFile">
            Choose file...
          </label>
          <div class="invalid-feedback">
            Example invalid custom file feedback
          </div>
        </div>
      </form>
    </StudentTheme>
  );
}
