import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/router";
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

export default function RegisterStudent(props) {
  const classes = useStyles();
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = data => {
    if (`${data.User_Password}` !== `${data.User_Password_a}`) {
      Swal.fire({
        title: "สมัครสมาชิกไม่สำเร็จ!",
        text: "รหัสผ่านไม่ถูกต้อง",
        icon: "error",
        showConfirmButton: true,
        confirmButtonText: "ตกลง"
      });
    } else {
      Swal.fire({
        title: "สมัครสมาชิก?",
        text: "กรุณาตรวจสอบข้อมูลให้ถูกต้อง",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: `ตกลง`,
        denyButtonText: `ตรวจสอบ`,
        cancelButtonText: `ยกเลิก`
      }).then(result => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          axios
            .post(`${props.env.api_url}/registerStudent`, JSON.stringify(data))
            .then(value => {
              if (value.data.isQuery == true) {
                // console.log("ddd", value.data);
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
                // console.log("ddd", value.data);
              }
            })
            .catch(reason => {
              console.log(reason);
            });
        } else if (result.isDenied) {
          Swal.fire({
            title: "ตรวจสอบความถูกต้อง",
            text: "",
            icon: "info",
            showConfirmButton: false,
            timer: 1000
          });
        }
      });
    }
  };
  return (
    <div className="login_content">
      <div className="_bgc_left"></div>
      <div className="_bgc_right"></div>
      <div className="_form_regis">
        <div>
          <h5>สมัครสมาชิกสำหรับนักศึกษา</h5>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-sm-6 align-middle text-center">
              <Controller
                name="Username"
                control={control}
                defaultValue=""
                rules={{
                  pattern: {
                    value: /^[a-z.]*$/,
                    message: "กรอกเฉพาะ 'a-z' และ '.' เท่านั้น"
                  }
                }}
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
                    // helperText="เช่น somchai.ko"
                    placeholder="ตัวอย่าง somchai.ko"
                  />
                )}
              />
              <div style={{ fontSize: "12px" }}>
                {errors.Username && (
                  <span className="text-danger" role="alert">
                    {errors.Username.message}
                  </span>
                )}
              </div>
            </div>
            <div className="col-sm-6 align-middle text-left">
              <Controller
                name="Std_ID"
                control={control}
                defaultValue=""
                rules={{
                  pattern: {
                    value: /^[0-9-]*$/,
                    message: "กรอกเฉพาะตัวเลข '0-9' และ '-' เท่านั้น"
                  }
                }}
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
              <div style={{ fontSize: "12px" }}>
                {errors.Std_ID && (
                  <span className="text-danger" role="alert">
                    {errors.Std_ID.message}
                  </span>
                )}
              </div>
            </div>
            <div className="col-sm-12 mt-3 align-middle text-center">
              <Controller
                name="Title"
                defaultValue=""
                control={control}
                variant="outlined"
                render={({ onChange, value }) => (
                  <select
                    className="form-control"
                    onChange={onChange}
                    value={value}
                    style={{ backgroundColor: "#F9F3F3" }}
                    required
                  >
                    <option value="" disabled="disabled">
                      คำนำหน้าชื่อ
                    </option>
                    <option>นาย/Mr.</option>
                    <option>นางสาว/Miss.</option>
                  </select>
                )}
              />
            </div>
            <div className="col-sm-6 mt-2 align-middle text-center">
              <Controller
                name="FirstName"
                control={control}
                defaultValue=""
                rules={{
                  pattern: {
                    value: /^[ก-ฮะ-๋์]*$/,
                    message: "กรอกเฉพาะภาษาไทยเท่านั้น"
                  }
                }}
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
              <div style={{ fontSize: "12px" }}>
                {errors.FirstName && (
                  <span className="text-danger" role="alert">
                    {errors.FirstName.message}
                  </span>
                )}
              </div>
            </div>
            <div className="col-sm-6 mt-2 align-middle text-center">
              <Controller
                name="LastName"
                control={control}
                defaultValue=""
                rules={{
                  pattern: {
                    value: /^[ก-ฮะ-๋์]*$/,
                    message: "กรอกเฉพาะภาษาไทยเท่านั้น"
                  }
                }}
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
              <div style={{ fontSize: "12px" }}>
                {errors.LastName && (
                  <span className="text-danger" role="alert">
                    {errors.LastName.message}
                  </span>
                )}
              </div>
            </div>
            {/* <div className="col-sm-12 mt-3 align-middle text-center">
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
            </div> */}
            <div className="col-sm-6 mt-2 align-middle text-center">
              <Controller
                name="FirstName_Eng"
                control={control}
                defaultValue=""
                rules={{
                  pattern: {
                    value: /^[a-zA-Z]*$/,
                    message: "กรอกเฉพาะภาษาอังกฤษเท่านั้น"
                  }
                }}
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
              <div style={{ fontSize: "12px" }}>
                {errors.FirstName_Eng && (
                  <span className="text-danger" role="alert">
                    {errors.FirstName_Eng.message}
                  </span>
                )}
              </div>
            </div>
            <div className="col-sm-6 mt-2 align-middle text-center">
              <Controller
                name="LastName_Eng"
                control={control}
                defaultValue=""
                rules={{
                  pattern: {
                    value: /^[a-zA-Z]*$/,
                    message: "กรอกเฉพาะภาษาอังกฤษเท่านั้น"
                  }
                }}
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
              <div style={{ fontSize: "12px" }}>
                {errors.LastName_Eng && (
                  <span className="text-danger" role="alert">
                    {errors.LastName_Eng.message}
                  </span>
                )}
              </div>
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
              <Controller
                name="User_Password_a"
                control={control}
                defaultValue=""
                render={({ onChange, value }) => (
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="ยืนยันรหัสผ่าน"
                    onChange={onChange}
                    value={value}
                    type="password"
                    size="small"
                  />
                )}
              />
            </div>
            <div className="col-sm-12 mt-3 align-middle text-center">
              <Button
                className="mb-2"
                type="submit"
                fullWidth
                variant="contained"
                style={{
                  backgroundColor: "#F25287",
                  color: "#DDDDDD"
                }}
              >
                สมัครสมาชิก
              </Button>
            </div>
            <Link href="/login">
              <div className="col-sm-12 mt-1 align-middle text-center">
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  style={{
                    backgroundColor: "#DDDDDD",
                    color: "#F25287"
                  }}
                >
                  กลับ
                </Button>
              </div>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
