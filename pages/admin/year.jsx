import React from "react";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import { useForm, Controller } from "react-hook-form";
import AdminTheme from "../../components/AdminTheme";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const useStyles = makeStyles(theme => ({
  button: {
    textAlign: "right"
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  }
}));

export default function Admin(props) {
  const classes = useStyles();
  const router = useRouter();
  const { control, handleSubmit } = useForm();

  const onSubmit = data => {
    axios
      .post(`${props.env.api_url}/insertYear`, JSON.stringify(data))
      .then(value => {
        if (value.data.isQuery == true) {
          console.log("ddd", value.data);
          Swal.fire({
            title: "เพิ่มข้อมูลสำเร็จ!",
            text: "",
            icon: "success",
            showConfirmButton: false,
            timer: 1000
          });
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          Swal.fire({
            title: "เพิ่มข้อมูลไม่สำเร็จ!",
            text: "กรุณาตรวจสอบข้อมูลให้ถูกต้อง",
            icon: "error",
            showConfirmButton: true,
            confirmButtonText: "ตกลง"
          });
        }
      })
      .catch(reason => {
        console.log(reason);
      });
    // alert("เพิ่มข้อมูลสำเร็จ");
  };

  const onUpdate = data => {
    data = { ...data, Year_ID: varY.Year_ID };
    // console.log(data);
    Swal.fire({
      title: "บันทึกการแก้ไข?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: `บันทึก`,
      denyButtonText: `ไม่บันทึก`,
      cancelButtonText: `ยกเลิก`
    }).then(result => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        axios
          .post(`${props.env.api_url}/editYear`, JSON.stringify(data))
          .then(value => {
            if (value.data.isQuery == true) {
              console.log(value.data);
              Swal.fire({
                title: "แก้ไขสำเร็จ!",
                text: "",
                icon: "success",
                showConfirmButton: false,
                timer: 1000
              });
              setTimeout(() => {
                window.location.reload();
              }, 1000);
              // setTimeout(window.location.reload(), 5000);
            } else {
              Swal.fire({
                title: "แก้ไขไม่สำเร็จ!",
                text: "กรุณาตรวจสอบข้อมูลให้ถูกต้อง",
                icon: "error",
                showConfirmButton: true,
                confirmButtonText: "ตกลง"
              });
            }
          })
          .catch(reason => {
            console.log(reason);
          });
      } else if (result.isDenied) {
        Swal.fire({
          title: "ไม่บันทึกการแก้ไข",
          text: "",
          icon: "info",
          showConfirmButton: false,
          timer: 1000
        });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    });
    // window.location.reload();
  };

  const onDel = data => {
    Swal.fire({
      title: "ยืนยันการลบ?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ตกลง",
      cancelButtonText: "ยกเลิก"
    }).then(result => {
      if (result.isConfirmed) {
        axios
          .post(`${props.env.api_url}/delYear`, JSON.stringify(data))
          .then(value => {
            console.log(value.data);
            Swal.fire({
              title: "ลบสำเร็จ!",
              text: "",
              icon: "success",
              showConfirmButton: false
            });
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          })
          .catch(reason => {
            console.log(reason);
          });
      }
    });
    // window.location.reload();
    // alert("ลบข้อมูลสำเร็จ");
  };

  const [varY, setvarY] = useState({});

  const [data, setData] = useState([]);
  const getYear = data => {
    axios
      .post(`${props.env.api_url}/getYear`, JSON.stringify(data))
      .then(value => {
        console.log("data", value.data.result);
        setData(value.data.result);
      })
      .catch(reason => {
        console.log(reason);
      });
  };

  React.useEffect(() => {
    getYear();
  }, []);

  return (
    <AdminTheme {...props}>
      <div className={classes.button}>
        <button
          type="button"
          className="btn btn-success"
          data-toggle="modal"
          data-target="#AddSub"
        >
          <AddIcon />
          เพิ่มปีการศึกษา
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
          <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  เพิ่มปีการศึกษา
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
                    <label>ปีการศึกษา : </label>
                  </div>
                  <div className="col-sm-6 mb-2 align-middle text-left">
                    <Controller
                      name="Year"
                      defaultValue=""
                      control={control}
                      render={({ onChange, value }) => (
                        <TextField
                          variant="outlined"
                          size="small"
                          margin="normal"
                          required
                          fullWidth
                          label="ปีการศึกษา"
                          onChange={onChange}
                          value={value}
                          type="text"
                        />
                      )}
                    />
                  </div>
                  <div className="col-sm-5 mt-2 align-middle text-right">
                    <label>ภาคเรียน : </label>
                  </div>
                  <div className="col-sm-6 mt-2 mb-2 align-middle text-left">
                    <Controller
                      name="Term"
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
                            กรุณาเลือกภาคการเรียน...
                          </option>
                          <option>ภาคเรียนที่ 1</option>
                          <option>ภาคเรียนที่ 2</option>
                          <option>ภาคฤดูร้อน</option>
                        </select>
                      )}
                    />
                  </div>
                  <div className="col-sm-5 mt-3 align-middle text-right">
                    <label>วันเริ่มต้นปีการศึกษา : </label>
                  </div>
                  <div className="col-sm-6 align-middle text-left">
                    <Controller
                      name="Start_SchYear"
                      defaultValue=""
                      control={control}
                      render={({ onChange, value }) => (
                        <TextField
                          variant="outlined"
                          size="small"
                          margin="normal"
                          required
                          fullWidth
                          onChange={onChange}
                          value={value}
                          type="date"
                        />
                      )}
                    />
                  </div>
                  <div className="col-sm-5 mt-3 align-middle text-right">
                    <label>วันสิ้นสุดปีการศึกษา : </label>
                  </div>
                  <div className="col-sm-6 align-middle text-left">
                    <Controller
                      name="End_SchYear"
                      defaultValue=""
                      control={control}
                      render={({ onChange, value }) => (
                        <TextField
                          variant="outlined"
                          size="small"
                          margin="normal"
                          required
                          fullWidth
                          onChange={onChange}
                          value={value}
                          type="date"
                        />
                      )}
                    />
                  </div>
                  <div className="col-sm-5 mt-3 align-middle text-right">
                    <label>เริ่มต้นวันสอบกลางภาค : </label>
                  </div>
                  <div className="col-sm-6 align-middle text-left">
                    <Controller
                      name="Start_Midterm"
                      defaultValue=""
                      control={control}
                      render={({ onChange, value }) => (
                        <TextField
                          variant="outlined"
                          size="small"
                          margin="normal"
                          required
                          fullWidth
                          onChange={onChange}
                          value={value}
                          type="date"
                        />
                      )}
                    />
                  </div>
                  <div className="col-sm-5 mt-3 align-middle text-right">
                    <label>สิ้นสุดวันสอบกลางภาค : </label>
                  </div>
                  <div className="col-sm-6 align-middle text-left">
                    <Controller
                      name="End_Midterm"
                      defaultValue=""
                      control={control}
                      render={({ onChange, value }) => (
                        <TextField
                          variant="outlined"
                          size="small"
                          margin="normal"
                          required
                          fullWidth
                          onChange={onChange}
                          value={value}
                          type="date"
                        />
                      )}
                    />
                  </div>
                  <div className="col-sm-5 mt-3 align-middle text-right">
                    <label>เริ่มต้นวันสอบปลายภาค : </label>
                  </div>
                  <div className="col-sm-6 align-middle text-left">
                    <Controller
                      name="Start_Final"
                      defaultValue=""
                      control={control}
                      render={({ onChange, value }) => (
                        <TextField
                          variant="outlined"
                          size="small"
                          margin="normal"
                          required
                          fullWidth
                          onChange={onChange}
                          value={value}
                          type="date"
                        />
                      )}
                    />
                  </div>
                  <div className="col-sm-5 mt-3 align-middle text-right">
                    <label>สิ้นสุดวันสอบปลายภาค : </label>
                  </div>
                  <div className="col-sm-6 align-middle text-left">
                    <Controller
                      name="End_Final"
                      defaultValue=""
                      control={control}
                      render={({ onChange, value }) => (
                        <TextField
                          variant="outlined"
                          size="small"
                          margin="normal"
                          required
                          fullWidth
                          onChange={onChange}
                          value={value}
                          type="date"
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-success">
                  เพิ่ม
                </button>
                <button
                  type="close"
                  className="btn btn-danger"
                  data-dismiss="modal"
                >
                  ยกเลิก
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* ------------------------------------------------------ */}
      <div
        className="modal fade"
        id="Edit"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          {(() => {
            if (Object.keys(varY).length > 0) {
              return (
                <form
                  className={classes.form}
                  onSubmit={handleSubmit(onUpdate)}
                >
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">
                        แก้ไขปีการศึกษา
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
                          <label>ปีการศึกษา : </label>
                        </div>
                        <div className="col-sm-6 mb-2 align-middle text-left">
                          <Controller
                            name="YearE"
                            control={control}
                            defaultValue={
                              Object.keys(varY).length > 0 ? varY.Year : ""
                            }
                            render={({ onChange, value }) => (
                              <TextField
                                variant="outlined"
                                size="small"
                                margin="normal"
                                required
                                fullWidth
                                label="ปีการศึกษา"
                                value={value}
                                onChange={onChange}
                                type="text"
                              />
                            )}
                          />
                        </div>
                        <div className="col-sm-5 mt-2 align-middle text-right">
                          <label>ภาคเรียน : </label>
                        </div>
                        <div className="col-sm-6 mt-2 mb-2 align-middle text-left">
                          <Controller
                            name="TermE"
                            control={control}
                            defaultValue={
                              Object.keys(varY).length > 0 ? varY.Term : ""
                            }
                            variant="outlined"
                            render={({ onChange, value }) => (
                              <select
                                className="form-control"
                                id="addTerm"
                                onChange={onChange}
                                value={value}
                              >
                                <option>ภาคเรียนที่ 1</option>
                                <option>ภาคเรียนที่ 2</option>
                                <option>ภาคฤดูร้อน</option>
                              </select>
                            )}
                          />
                        </div>
                        <div className="col-sm-5 mt-3 align-middle text-right">
                          <label>วันเริ่มต้นปีการศึกษา : </label>
                        </div>
                        <div className="col-sm-6 align-middle text-left">
                          <Controller
                            name="Start_SchYearE"
                            control={control}
                            defaultValue={
                              Object.keys(varY).length > 0
                                ? varY.Start_SchYear
                                : ""
                            }
                            render={({ onChange, value }) => (
                              <TextField
                                variant="outlined"
                                size="small"
                                margin="normal"
                                required
                                fullWidth
                                onChange={onChange}
                                value={value}
                                type="date"
                              />
                            )}
                          />
                        </div>
                        <div className="col-sm-5 mt-3 align-middle text-right">
                          <label>วันสิ้นสุดปีการศึกษา : </label>
                        </div>
                        <div className="col-sm-6 align-middle text-left">
                          <Controller
                            name="End_SchYearE"
                            control={control}
                            defaultValue={
                              Object.keys(varY).length > 0
                                ? varY.End_SchYear
                                : ""
                            }
                            render={({ onChange, value }) => (
                              <TextField
                                variant="outlined"
                                size="small"
                                margin="normal"
                                required
                                fullWidth
                                onChange={onChange}
                                value={value}
                                type="date"
                              />
                            )}
                          />
                        </div>
                        <div className="col-sm-5 mt-3 align-middle text-right">
                          <label>เริ่มต้นวันสอบกลางภาค : </label>
                        </div>
                        <div className="col-sm-6 align-middle text-left">
                          <Controller
                            name="Start_MidtermE"
                            control={control}
                            defaultValue={
                              Object.keys(varY).length > 0
                                ? varY.Start_Midterm
                                : ""
                            }
                            render={({ onChange, value }) => (
                              <TextField
                                variant="outlined"
                                size="small"
                                margin="normal"
                                required
                                fullWidth
                                onChange={onChange}
                                value={value}
                                type="date"
                              />
                            )}
                          />
                        </div>
                        <div className="col-sm-5 mt-3 align-middle text-right">
                          <label>สิ้นสุดวันสอบกลางภาค : </label>
                        </div>
                        <div className="col-sm-6 align-middle text-left">
                          <Controller
                            name="End_MidtermE"
                            control={control}
                            defaultValue={
                              Object.keys(varY).length > 0
                                ? varY.End_Midterm
                                : ""
                            }
                            render={({ onChange, value }) => (
                              <TextField
                                variant="outlined"
                                size="small"
                                margin="normal"
                                required
                                fullWidth
                                onChange={onChange}
                                value={value}
                                type="date"
                              />
                            )}
                          />
                        </div>
                        <div className="col-sm-5 mt-3 align-middle text-right">
                          <label>เริ่มต้นวันสอบปลายภาค : </label>
                        </div>
                        <div className="col-sm-6 align-middle text-left">
                          <Controller
                            name="Start_FinalE"
                            control={control}
                            defaultValue={
                              Object.keys(varY).length > 0
                                ? varY.Start_Final
                                : ""
                            }
                            render={({ onChange, value }) => (
                              <TextField
                                variant="outlined"
                                size="small"
                                margin="normal"
                                required
                                fullWidth
                                onChange={onChange}
                                value={value}
                                type="date"
                              />
                            )}
                          />
                        </div>
                        <div className="col-sm-5 mt-3 align-middle text-right">
                          <label>สิ้นสุดวันสอบปลายภาค : </label>
                        </div>
                        <div className="col-sm-6 align-middle text-left">
                          <Controller
                            name="End_FinalE"
                            control={control}
                            defaultValue={
                              Object.keys(varY).length > 0 ? varY.End_Final : ""
                            }
                            render={({ onChange, value }) => (
                              <TextField
                                variant="outlined"
                                size="small"
                                margin="normal"
                                required
                                fullWidth
                                onChange={onChange}
                                value={value}
                                type="date"
                              />
                            )}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button type="submit" className="btn btn-warning">
                        แก้ไข
                      </button>
                      <button
                        type="close"
                        className="btn btn-danger"
                        data-dismiss="modal"
                      >
                        ยกเลิก
                      </button>
                    </div>
                  </div>
                </form>
              );
            }
          })()}
        </div>
      </div>

      <div className="col-sm-12  mt-4 align-middle">
        <table className="table table-hover align-middle text-center">
          <thead>
            <tr style={{ height: "60px" }}>
              <th
                style={{ verticalAlign: "middle", backgroundColor: "#DDDDDD" }}
              >
                ปีการศึกษา
              </th>
              <th
                style={{ verticalAlign: "middle", backgroundColor: "#DDDDDD" }}
              >
                ภาคเรียน
              </th>
              <th
                style={{ verticalAlign: "middle", backgroundColor: "#DDDDDD" }}
              >
                วันเริ่มต้นและวันสิ้นสุดปีการศึกษา
              </th>
              <th
                style={{ verticalAlign: "middle", backgroundColor: "#DDDDDD" }}
              >
                วันสอบกลางภาค
              </th>
              <th
                style={{ verticalAlign: "middle", backgroundColor: "#DDDDDD" }}
              >
                วันสอบปลายภาค
              </th>
              <th
                width="15%"
                style={{ verticalAlign: "middle", backgroundColor: "#DDDDDD" }}
              >
                จัดการ
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((variable, index) => {
              return (
                <tr key={variable.Year_ID}>
                  <td>{variable.Year}</td>
                  <td>{variable.Term}</td>
                  <td>
                    {variable.Start_SchYear}
                    &nbsp;&nbsp;-&nbsp;&nbsp;{variable.End_SchYear}
                  </td>
                  <td>
                    {variable.Start_Midterm}
                    &nbsp;&nbsp;-&nbsp;&nbsp;
                    {variable.End_Midterm}
                  </td>
                  <td>
                    {variable.Start_Final}
                    &nbsp;&nbsp;-&nbsp;&nbsp;{variable.End_Final}
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-warning mr-2"
                      data-toggle="modal"
                      data-target="#Edit"
                      onClick={() => {
                        setvarY(variable);
                      }}
                    >
                      <EditIcon />
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => {
                        onDel({ year: variable.Year_ID });
                      }}
                    >
                      <DeleteIcon />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </AdminTheme>
  );
}
