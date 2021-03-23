import React from "react";
import { useRouter } from "next/router";
import TeacherTheme from "../../../components/TeacherTheme";
import { makeStyles } from "@material-ui/core/styles";
import { useForm, Controller } from "react-hook-form";
import Link from "next/link";

const useStyles = makeStyles((theme) => ({
  button: {
    textAlign: "right",
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
        <div className={classes.button}>
          <button
            type="button"
            className="btn btn-success"
            data-toggle="modal"
            data-target="#AddSub"
          >
            เพิ่มรายวิชา
          </button>
        </div>

        <div
          className="modal fade"
          id="AddSub"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  เพิ่มข้อมูลกลุ่มเรียน
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-sm-4 mb-2 mt-2 align-middle text-right">
                    <label>รหัสกลุ่มเรียน : </label>
                  </div>
                  <div className="col-sm-8 mb-2 mt-2 align-middle text-left">
                    <input type="text" className="form-control"></input>
                  </div>
                  <div className="col-sm-4 mb-2 mt-2 align-middle text-right">
                    <label>รหัสวิชา : </label>
                  </div>
                  <div className="col-sm-8 mb-2 mt-2 align-middle text-left">
                    <input type="text" className="form-control"></input>
                  </div>
                  <div className="col-sm-4 mb-2 mt-2 align-middle text-right">
                    <label>รหัสปีการศึกษา : </label>
                  </div>
                  <div className="col-sm-8 mb-2 mt-2 align-middle text-left">
                    <input type="text" className="form-control"></input>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger"
                  data-dismiss="modal"
                >
                  ยกเลิก
                </button>
                <button type="button" className="btn btn-success">
                  เพิ่ม
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-12  mt-4 align-middle">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">รหัสกลุ่มเรียน</th>
                <th scope="col">รหัสวิชา</th>
                <th scope="col">รหัสปีการศึกษา</th>
                <th scope="col">จัดการ</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>
                  <Link href="/teacher/subject/check">
                    <button type="button" className="btn btn-warning">
                      เช็คชื่อ
                    </button>
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </form>
    </TeacherTheme>
  );
}
