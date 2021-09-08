import React from "react";
import { useRouter } from "next/router";
import TeacherTheme from "../../components/TeacherTheme";
import { makeStyles } from "@material-ui/core/styles";
import { useForm, Controller } from "react-hook-form";

const useStyles = makeStyles(theme => ({
  button: {
    textAlign: "center"
  },
  form: {
    width: "80%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  }
}));

export default function Teacher(props) {
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

  React.useEffect(() => {}, []);

  return (
    <TeacherTheme {...props}>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-sm-4 mb-2 mt-2 align-middle text-right">
            ปีการศึกษา :
          </div>
          <div className="col-sm-6 mb-2 mt-2 align-middle text-left">
            <div className={classes.d}>
              <select class="form-control form-control-sm">
                <option>เลือกปีการศึกษา</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </select>
            </div>
          </div>
          <div className="col-sm-4 mb-2 mt-2 align-middle text-right">
            ภาคเรียน :
          </div>
          <div className="col-sm-6 mb-2 mt-2 align-middle text-left">
            <div className={classes.d}>
              <select class="form-control form-control-sm">
                <option>เลือกภาคเรียน</option>
                <option>ภาคเรียนที่ 1</option>
                <option>ภาคเรียนที่ 2</option>
                <option>ภาคเรียนฤดูร้อน</option>
              </select>
            </div>
          </div>
        </div>
        <div className={classes.button}>
          <button
            type="button"
            className="btn btn-success ml-2 mr-2 mb-4 mt-4 "
            data-toggle="modal"
            data-target="#AddSub"
          >
            ตกลง
          </button>
        </div>
      </form>
    </TeacherTheme>
  );
}
