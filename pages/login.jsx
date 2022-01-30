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
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  form: {
    // width: "100%", // Fix IE 11 issue.
    // marginTop: theme.spacing(1)
    textAlign: "center"
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
        if (value.data.success) {
          Swal.fire({
            title: "เข้าสู่ระบบสำเร็จ!",
            text: "",
            icon: "success",
            showConfirmButton: false,
            timer: 1000
          });
          props.setUserLogin(value.data.data);
          // router.replace("/");
          setTimeout(() => {
            router.replace("/");
          }, 1000);
        } else {
          Swal.fire({
            title: "เข้าสู่ระบบไม่สำเร็จ!",
            text: "กรุณาตรวจสอบข้อมูล",
            icon: "error",
            showConfirmButton: true,
            confirmButtonText: "ตกลง"
          });
        }
      })
      .catch(reason => {
        console.log(reason);
      });
  };

  return (
    <div className="login_content">
      <div className="_bgc_left"></div>
      <div className="_bgc_right"></div>
      <div className="_form_login">
        <div>
          <img
            src="https://upload.wikimedia.org/wikipedia/th/e/e0/RMUTI_KORAT.png"
            alt="logo"
            style={{ width: "7.5rem" }}
          ></img>
          <div>
            <br />
            <h4>ระบบบันทึกการเข้าเรียนด้วยการตรวจจับใบหน้า</h4>
            <br />
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="username"
              control={control}
              defaultValue=""
              render={({ onChange, value }) => (
                <TextField
                  variant="outlined"
                  margin="dense"
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

            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ onChange, value }) => (
                <TextField
                  variant="outlined"
                  margin="dense"
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

            <Button
              className={classes.submit}
              type="submit"
              fullWidth
              variant="contained"
              style={{
                backgroundColor: "#F25287",
                color: "#DDDDDD"
              }}
            >
              เข้าสู่ระบบ
            </Button>
          </form>
          {/* <Link href="sso?sso">
            <Button
              // className={classes.submit}
              type="button"
              fullWidth
              variant="contained"
              style={{
                backgroundColor: "#DDDDDD",
                color: "#F25287"
              }}
            >
              เข้าสู่ระบบด้วยบัญชีอินเทอร์เน็ตมหาวิทยาลัย
            </Button>
          </Link> */}
          <Link href="/register_student">
            <Button
              type="button"
              fullWidth
              variant="contained"
              style={{
                backgroundColor: "#DDDDDD",
                color: "#F25287",
                width: "45%",
                marginRight: "10px"
              }}
            >
              สมัครสมาชิกสำหรับนักศึกษา
            </Button>
          </Link>
          <Link href="/register_teacher">
            <Button
              type="button"
              fullWidth
              variant="contained"
              style={{
                backgroundColor: "#DDDDDD",
                color: "#F25287",
                width: "45%"
              }}
            >
              สมัครสมาชิกสำหรับอาจารย์
            </Button>
          </Link>
        </div>
      </div>

      {/* <table
        className="table align-middle text-center"
        style={{
          height: "97vh"
        }}
      >
        <tr>
          <td
            style={{
              backgroundColor: "#FFC0CB",
              verticalAlign: "middle"
            }}
          >
            <h2>ระบบบันทึกการเข้าเรียนด้วยการตรวจจับใบหน้า</h2>
          </td>
          <td
            style={{
              backgroundColor: "#F9F3F3",
              verticalAlign: "middle"
            }}
          >
            <div>
              <img
                src="https://upload.wikimedia.org/wikipedia/th/e/e0/RMUTI_KORAT.png"
                alt="logo"
                style={{ width: "8rem" }}
              ></img>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                  name="username"
                  control={control}
                  defaultValue=""
                  render={({ onChange, value }) => (
                    <TextField
                      variant="outlined"
                      margin="dense"
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

                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  render={({ onChange, value }) => (
                    <TextField
                      variant="outlined"
                      margin="dense"
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

                <Button
                  className={classes.submit}
                  type="submit"
                  fullWidth
                  variant="contained"
                  style={{
                    backgroundColor: "#F25287",
                    color: "#DDDDDD"
                  }}
                >
                  เข้าสู่ระบบ
                </Button>
              </form>
            </div>
          </td>
        </tr>
      </table>
     */}
    </div>
  );
}
