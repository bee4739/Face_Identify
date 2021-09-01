import React from "react";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Link from "next/link";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: "8px"
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function Teacher(props) {
  const classes = useStyles();
  const router = useRouter();
  const { control, handleSubmit } = useForm();

  React.useEffect(() => {
    // router.replace("/teacher/study_group");
  }, []);

  const [data, setData] = useState([]);

  const onSubmit = data => {
    axios
      .post(`${props.env.api_url}/insertregister`, JSON.stringify(data))
      .then(value => {
        if (value.data.isQuery == true) {
          console.log("ddd", value.data);
          Swal.fire({
            title: "สมัครสมาชิกสำเร็จ!",
            text: "",
            icon: "success",
            showConfirmButton: false,
            timer: 1000
          });
          setTimeout(() => {
            router.replace("/");
          }, 1000);
        } else {
          Swal.fire({
            title: "สมัครสมาชิกไม่สำเร็จ!",
            text: "กรุณาตรวจสอบข้อมูลให้ถูกต้อง",
            icon: "error",
            showConfirmButton: true
          });
        }
      })
      .catch(reason => {
        console.log(reason);
      });
    // alert("เพิ่มข้อมูลสำเร็จ");
  };

  return (
    <Container component="main" maxWidth="xs">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-sm-6 mt-4 align-middle text-center">
            <Controller
              name="Username"
              control={control}
              defaultValue=""
              render={({ onChange, value }) => (
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="ชื่อผู้ใช้งาน"
                  onChange={onChange}
                  value={value}
                  type="text"
                  size="small"
                />
              )}
            />
          </div>
          <div className="col-sm-6 mb-2 mt-4 align-middle text-left">
            <Controller
              name="Std_ID"
              control={control}
              defaultValue=""
              render={({ onChange, value }) => (
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="รหัสนักศึกษา"
                  onChange={onChange}
                  value={value}
                  type="text"
                  size="small"
                />
              )}
            />
          </div>
          <div className="col-sm-12 mt-1 align-middle text-center">
            <Controller
              name="Title"
              defaultValue=""
              control={control}
              variant="outlined"
              render={({ onChange, value }) => (
                <select
                  className="form-control"
                  id="addTerm"
                  onChange={onChange}
                  value={value}
                >
                  <option value="" disabled="disabled">
                    คำนำหน้าชื่อภาษาไทย
                  </option>
                  <option>นาย</option>
                  <option>นางสาว</option>
                </select>
              )}
            />
          </div>
          <div className="col-sm-6 mt-1 align-middle text-center">
            <Controller
              name="FirstName"
              control={control}
              defaultValue=""
              render={({ onChange, value }) => (
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="ชื่อภาษาไทย"
                  onChange={onChange}
                  value={value}
                  type="text"
                  size="small"
                />
              )}
            />
          </div>
          <div className="col-sm-6 mt-1 align-middle text-center">
            <Controller
              name="LastName"
              control={control}
              defaultValue=""
              render={({ onChange, value }) => (
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="นามสกุลภาษาไทย"
                  onChange={onChange}
                  value={value}
                  type="text"
                  size="small"
                />
              )}
            />
          </div>
          <div className="col-sm-12 mt-1 align-middle text-center">
            <Controller
              name="Title_Eng"
              defaultValue=""
              control={control}
              variant="outlined"
              render={({ onChange, value }) => (
                <select
                  className="form-control"
                  id="addTerm"
                  onChange={onChange}
                  value={value}
                >
                  <option value="" disabled="disabled">
                    คำนำหน้าชื่อภาษาอังกฤษ
                  </option>
                  <option>Mr.</option>
                  <option>Miss.</option>
                </select>
              )}
            />
          </div>
          <div className="col-sm-6 mt-1 align-middle text-center">
            <Controller
              name="FirstName_Eng"
              control={control}
              defaultValue=""
              render={({ onChange, value }) => (
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="ชื่อภาษาอังกฤษ"
                  onChange={onChange}
                  value={value}
                  type="text"
                  size="small"
                />
              )}
            />
          </div>
          <div className="col-sm-6 mt-1 align-middle text-center">
            <Controller
              name="LastName_Eng"
              control={control}
              defaultValue=""
              render={({ onChange, value }) => (
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="นามสกุลภาษาอังกฤษ"
                  onChange={onChange}
                  value={value}
                  type="text"
                  size="small"
                />
              )}
            />
          </div>
          <div className="col-sm-12 mt-1 align-middle text-center">
            <Controller
              name="User_Password"
              control={control}
              defaultValue=""
              render={({ onChange, value }) => (
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="รหัสผ่าน"
                  onChange={onChange}
                  value={value}
                  type="password"
                  size="small"
                />
              )}
            />
          </div>
          <div className="col-sm-12 mt-1 align-middle text-center">
            <Button type="submit" fullWidth variant="contained" color="primary">
              สมัครสมาชิก
            </Button>
          </div>
        </div>
      </form>
    </Container>
  );
}
