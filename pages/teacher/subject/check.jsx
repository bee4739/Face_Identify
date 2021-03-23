import React from "react";
import { useRouter } from "next/router";
import TeacherTheme from "../../../components/TeacherTheme";
import { makeStyles } from "@material-ui/core/styles";
import { useForm, Controller } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
  table: {
    textAlign: "center",
  },
  button: {
    textAlign: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
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
        <p>
          <h3>ระบบเช็คชื่อเข้าเรียน</h3>
        </p>

        <div className={classes.table}>
          <center>
            <table border="1" width="80%">
              <tr></tr>
              <td width="50%">1</td>
              <td>วันที่</td>
              <td>เวลา</td>
              <td>เช็ค</td>
            </table>
          </center>
        </div>

        <div className={classes.button}>
          <button
            type="button"
            className="btn btn-success ml-2 mr-2 mb-4 mt-4 "
            data-toggle="modal"
            data-target="#AddSub"
          >
            สรุปวันนี้
          </button>
          <button type="button" className="btn btn-danger" data-dismiss="modal">
            สรุปทั้งหมด
          </button>
        </div>
      </form>
    </TeacherTheme>
  );
}
