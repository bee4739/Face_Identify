import React from "react";
import { useRouter } from "next/router";
import TeacherTheme from "../components/TeacherTheme";
import { makeStyles } from "@material-ui/core/styles";
import { useForm, Controller } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
  button: {
    textAlign: "center",
  },
  form: {
    width: "80%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
}));

export default function Teacher(props) {
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
    <TeacherTheme {...props}>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-sm-6 mb-2 mt-2 align-middle text-right">
            <label>รหัสผ่านเดิม : </label>
          </div>
          <div className="col-sm-4 mb-2 mt-2 align-middle text-left">
            <input type="text" className="form-control"></input>
          </div>
          <div className="col-sm-6 mb-2 mt-2 align-middle text-right">
            <label>รหัสผ่านใหม่ : </label>
          </div>
          <div className="col-sm-4 mb-2 mt-2 align-middle text-left">
            <input type="text" className="form-control"></input>
          </div>
          <div className="col-sm-6 mb-2 mt-2 align-middle text-right">
            <label>ยืนยันรหัสผ่าน : </label>
          </div>
          <div className="col-sm-4 mb-2 mt-2 align-middle text-left">
            <input type="text" className="form-control"></input>
          </div>
        </div>
        <div className={classes.button}>
          <button
            type="button"
            className="btn btn-success ml-2 mr-2 mb-4 mt-4 "
            data-toggle="modal"
            data-target="#AddSub"
          >
            เปลี่ยนรหัสผ่าน
          </button>
          <button type="button" className="btn btn-danger" data-dismiss="modal">
            ยกเลิก
          </button>
        </div>
      </form>
    </TeacherTheme>
  );
}
