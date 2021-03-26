import React from "react";
import { useRouter } from "next/router";
import StudentTheme from "../../components/StudentTheme";
import { makeStyles } from "@material-ui/core/styles";
import { useForm, Controller } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: theme.spacing(1),
  },
  d: {
    width: "50%",
  },
  t: {
    width: "30%",
  },
  table: {
    textAlign: "center",
  },
  button: {
    textAlign: "center",
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
        <div className="row">
          <div className="col-sm-5 mb-2 mt-2 align-middle text-right">
            กลุ่มเรียน
          </div>
          <div className="col-sm-6 mb-2 mt-2 align-middle text-left">
            <div className={classes.d}>
              <select class="form-control form-control-sm">
                <option>Small select</option>
                <option>Small 1</option>
                <option>Small 2</option>
                <option>Small 3</option>
              </select>
            </div>
          </div>
          <div className="col-sm-5 mb-2 mt-2 align-middle text-right">
            <label>รหัสเข้ากลุ่มเรียน</label>
          </div>
          <div className="col-sm-6 mb-2 mt-2 text-left">
            <div className={classes.t}>
              <input type="text" className="form-control"></input>
            </div>
          </div>
        </div>
        <div className={classes.button}>
          <button type="button" className=" btn btn-success align-center mt-2">
            ตกลง
          </button>
        </div>
      </form>
      <div className={classes.table}>
        <div className="mt-4">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">วิชา</th>
                <th scope="col">กลุ่มเรียน</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </StudentTheme>
  );
}
