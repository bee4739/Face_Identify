import React from "react";
import { useRouter } from "next/router";
import StudentTheme from "../../components/StudentTheme";
import { makeStyles } from "@material-ui/core/styles";
import { useForm, Controller } from "react-hook-form";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const useStyles = makeStyles(theme => ({
  form: {
    marginTop: theme.spacing(1)
  },
  d: {
    width: "50%"
  },
  t: {
    width: "30%"
  },
  table: {
    textAlign: "center"
  },
  button: {
    textAlign: "right"
  }
}));

export default function student(props) {
  const classes = useStyles();
  const router = useRouter();
  const { control, handleSubmit } = useForm();

  const [studyGroupStudent, setStudyGroupStudent] = useState([]);
  const getStudyGroupStudent = data => {
    axios
      .post(`${props.env.api_url}/getStudyGroupStudent`, JSON.stringify(data))
      .then(value => {
        setStudyGroupStudent(value.data.result);
        console.log("ssss", value.data.result);
      })
      .catch(reason => {
        console.log(reason);
      });
  };

  const [student, setStudent] = useState([]);
  const getStudent = data => {
    data = { ...data, User_ID: props.userLogin.User_ID };
    axios
      .post(`${props.env.api_url}/getStudent`, JSON.stringify(data))
      .then(value => {
        setStudent(value.data.result);
        console.log("s", value.data.result);
      })
      .catch(reason => {
        console.log(reason);
      });
  };

  const onSubmit = data => {
    data = { ...data, User_ID: props.userLogin.User_ID };

    axios
      .post(
        `${props.env.api_url}/insertStudyGroupStudent`,
        JSON.stringify(data)
      )
      .then(value => {
        if (value.data.isQuery == true) {
          console.log("oooo", value.data);
          Swal.fire({
            title: "เพิ่มข้อมูลสำเร็จ!",
            text: "",
            icon: "success",
            showConfirmButton: false
          });
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          Swal.fire({
            title: "เพิ่มข้อมูลไม่สำเร็จ!",
            text: "กรุณาตรวจสอบข้อมูลให้ถูกต้อง",
            icon: "error",
            showConfirmButton: true
          });
        }
      })
      .catch(reason => {
        console.log(reason);
      });
  };

  React.useEffect(() => {
    getStudyGroupStudent();
    getStudent();
  }, []);

  return (
    <StudentTheme {...props}>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.button}>
          <button
            type="button"
            className="btn btn-success"
            data-toggle="modal"
            data-target="#AddSub"
          >
            <AddIcon />
            เพิ่มกลุ่มเรียน
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
                  เพิ่มกลุ่มเรียน
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
                  <div className="col-sm-5 mt-3 align-middle text-right">
                    <label>กลุ่มเรียน : </label>
                  </div>
                  <div className="col-sm-6 mt-2 mb-2 align-middle text-left">
                    <Controller
                      name="Study_Group"
                      defaultValue=""
                      control={control}
                      variant="outlined"
                      render={({ onChange, value }) => (
                        <select
                          className="form-control"
                          id="addSubject"
                          onChange={onChange}
                          value={value}
                        >
                          <option value="" disabled="disabled">
                            กรุณาเลือกรายวิชา...
                          </option>
                          {studyGroupStudent.map((variable, index) => {
                            return (
                              <option key={index} value={variable.Class_ID}>
                                {variable.Subject_ID}
                                &nbsp;-&nbsp;
                                {variable.Subject_NameTH}
                                &nbsp;&nbsp;({variable.Group_Study})
                              </option>
                            );
                          })}
                        </select>
                      )}
                    />
                  </div>
                  <div className="col-sm-5 mt-4 align-middle text-right">
                    <label>รหัสเข้ากลุ่มเรียน : </label>
                  </div>
                  <div className="col-sm-6 mb-2 align-middle text-left">
                    <Controller
                      name="Pass_Group"
                      defaultValue=""
                      control={control}
                      render={({ onChange, value }) => (
                        <TextField
                          variant="outlined"
                          size="small"
                          margin="normal"
                          required
                          fullWidth
                          label="รหัสเข้ากลุ่มเรียน"
                          onChange={onChange}
                          value={value}
                          type="password"
                        />
                      )}
                    />
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
                <button type="submit" className="btn btn-success">
                  เพิ่ม
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-12  mt-4 align-middle">
          <center>
            <table
              className="table table-striped align-middle text-center"
              style={{ width: "80%" }}
            >
              <thead>
                <tr>
                  <th>วิชา</th>
                </tr>
              </thead>
              <tbody>
                {process.env.api_url}
                {student.map((variable, index) => {
                  return (
                    <tr key={index}>
                      <td align="left">
                        {variable.Subject_ID}&nbsp;-&nbsp;
                        {variable.Subject_NameTH}&nbsp;&nbsp;(
                        {variable.Group_Study})
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </center>
        </div>
      </form>
    </StudentTheme>
  );
}
