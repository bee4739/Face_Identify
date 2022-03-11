import React from "react";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import { useForm, Controller } from "react-hook-form";
import AdminTheme from "../../components/AdminTheme";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
// import { DataGrid } from "@mui/x-data-grid";

const useStyles = makeStyles(theme => ({
  button: {
    textAlign: "right"
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  }
}));

const columns = [];

const rows = [];

export default function Admin(props) {
  const classes = useStyles();
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = data => {
    axios
      .post(`${props.env.api_url}/insertSubject`, JSON.stringify(data))
      .then(value => {
        if (value.data.isQuery == true) {
          // console.log(value.data);
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
    // window.location.reload();
    // alert("เพิ่มข้อมูลสำเร็จ");
  };

  const onUpdate = data => {
    data = { ...data, Subject_PK: varY.Subject_PK };
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
          .post(`${props.env.api_url}/editSubject`, JSON.stringify(data))
          .then(value => {
            if (value.data.isQuery == true) {
              // console.log(value.data);
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
    // alert("แก้ไขข้อมูลสำเร็จ");
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
          .post(`${props.env.api_url}/delSubject`, JSON.stringify(data))
          .then(value => {
            // console.log(value.data);
            Swal.fire({
              title: "ลบสำเร็จ!",
              text: "",
              icon: "success",
              showConfirmButton: false,
              timer: 1000
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
  const getSubject = data => {
    axios
      .post(`${props.env.api_url}/getSubject`, JSON.stringify(data))
      .then(value => {
        // console.log(value.data);
        setData(value.data.result);
      })
      .catch(reason => {
        console.log(reason);
      });
  };

  React.useEffect(() => {
    getSubject();
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
          <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  เพิ่มรายวิชา
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
                  <div className="col-sm-4 mb-2 mt-3 align-middle text-right">
                    <label>รหัสวิชา : </label>
                  </div>
                  <div className="col-sm-7 mb-2 align-middle text-left">
                    <Controller
                      name="Subject_ID"
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
                          size="small"
                          margin="normal"
                          required
                          fullWidth
                          label="รหัสวิชา"
                          onChange={onChange}
                          value={value}
                          type="text"
                        />
                      )}
                    />
                    <div style={{ fontSize: "12px" }}>
                      {errors.Subject_ID && (
                        <span className="text-danger" role="alert">
                          {errors.Subject_ID.message}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="col-sm-4 mb-2 mt-3 align-middle text-right">
                    <label>ชื่อวิชาภาษาไทย : </label>
                  </div>
                  <div className="col-sm-7 mb-2 align-middle text-left">
                    <Controller
                      name="Subject_NameTH"
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
                          size="small"
                          margin="normal"
                          required
                          fullWidth
                          label="ชื่อวิชาภาษาไทย"
                          onChange={onChange}
                          value={value}
                          type="text"
                        />
                      )}
                    />
                    <div style={{ fontSize: "12px" }}>
                      {errors.Subject_NameTH && (
                        <span className="text-danger" role="alert">
                          {errors.Subject_NameTH.message}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="col-sm-4 mb-2 mt-3 align-middle text-right">
                    <label>ชื่อวิชาภาษาอังกฤษ : </label>
                  </div>
                  <div className="col-sm-7 mb-2 align-middle text-left">
                    <Controller
                      name="Subject_NameEN"
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
                          size="small"
                          margin="normal"
                          required
                          fullWidth
                          label="ชื่อวิชาภาษาอังกฤษ"
                          onChange={onChange}
                          value={value}
                          type="text"
                        />
                      )}
                    />
                    <div style={{ fontSize: "12px" }}>
                      {errors.Subject_NameEN && (
                        <span className="text-danger" role="alert">
                          {errors.Subject_NameEN.message}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="col-sm-4 mb-2 mt-3 align-middle text-right">
                    <label>จำนวนชั่วโมงวิชาทฤษฎี : </label>
                  </div>
                  <div className="col-sm-7 mt-3 mb-2 align-middle text-left">
                    <Controller
                      name="Subject_Theory"
                      defaultValue=""
                      control={control}
                      variant="outlined"
                      render={({ onChange, value }) => (
                        <select
                          className="form-control"
                          id="addTerm"
                          onChange={onChange}
                          value={value}
                          required
                        >
                          <option value="" disabled="disabled">
                            จำนวนชั่วโมงวิชาทฤษฎี...
                          </option>
                          <option>0</option>
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                          <option>6</option>
                          <option>7</option>
                          <option>8</option>
                          <option>9</option>
                        </select>
                      )}
                    />
                  </div>
                  <div className="col-sm-4 mb-2 mt-3 align-middle text-right">
                    <label>จำนวนชั่วโมงวิชาปฏิบัติ : </label>
                  </div>
                  <div className="col-sm-7 mt-3 mb-2 align-middle text-left">
                    <Controller
                      name="Subject_Practice"
                      defaultValue=""
                      control={control}
                      variant="outlined"
                      render={({ onChange, value }) => (
                        <select
                          className="form-control"
                          id="addTerm"
                          onChange={onChange}
                          value={value}
                          required
                        >
                          <option value="" disabled="disabled">
                            จำนวนชั่วโมงวิชาปฏิบัติ...
                          </option>
                          <option>0</option>
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                          <option>6</option>
                          <option>7</option>
                          <option>8</option>
                          <option>9</option>
                        </select>
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
                  type="button"
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
      {/* ///////////////////////////////////////////////////////////////////////////////////////////// */}
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
                        แก้ไขรายวิชา
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
                        <div className="col-sm-4 mb-2 mt-3 align-middle text-right">
                          <label>รหัสวิชา : </label>
                        </div>
                        <div className="col-sm-7 mb-2 align-middle text-left">
                          <Controller
                            name="Subject_IDE"
                            control={control}
                            defaultValue={
                              Object.keys(varY).length > 0
                                ? varY.Subject_ID
                                : ""
                            }
                            rules={{
                              pattern: {
                                value: /^[0-9-]*$/,
                                message:
                                  "กรอกเฉพาะตัวเลข '0-9' และ '-' เท่านั้น"
                              }
                            }}
                            render={({ onChange, value }) => (
                              <TextField
                                variant="outlined"
                                size="small"
                                margin="normal"
                                required
                                fullWidth
                                label="เพิ่มรายวิชา"
                                value={value}
                                onChange={onChange}
                                type="text"
                              />
                            )}
                          />
                          <div>
                            {errors.Subject_IDE && (
                              <span
                                className="text-danger"
                                role="alert"
                                style={{ fontSize: "12px" }}
                              >
                                {errors.Subject_IDE.message}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="col-sm-4 mb-2 mt-3 align-middle text-right">
                          <label>ชื่อวิชาภาษาไทย : </label>
                        </div>
                        <div className="col-sm-7 mb-2 align-middle text-left">
                          <Controller
                            name="Subject_NameTHE"
                            control={control}
                            defaultValue={
                              Object.keys(varY).length > 0
                                ? varY.Subject_NameTH
                                : ""
                            }
                            rules={{
                              pattern: {
                                value: /^[ก-ฮะ-๋์]*$/,
                                message: "กรอกเฉพาะภาษาไทยเท่านั้น"
                              }
                            }}
                            render={({ onChange, value }) => (
                              <TextField
                                variant="outlined"
                                size="small"
                                margin="normal"
                                required
                                fullWidth
                                label="ชื่อวิชาภาษาไทย"
                                value={value}
                                onChange={onChange}
                                type="text"
                              />
                            )}
                          />
                          <div style={{ fontSize: "12px" }}>
                            {errors.Subject_NameTHE && (
                              <span className="text-danger" role="alert">
                                {errors.Subject_NameTHE.message}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="col-sm-4 mb-2 mt-3 align-middle text-right">
                          <label>ชื่อวิชาภาษาอังกฤษ : </label>
                        </div>
                        <div className="col-sm-7 mb-2 align-middle text-left">
                          <Controller
                            name="Subject_NameENE"
                            control={control}
                            defaultValue={
                              Object.keys(varY).length > 0
                                ? varY.Subject_NameEN
                                : ""
                            }
                            rules={{
                              pattern: {
                                value: /^[a-zA-Z]*$/,
                                message: "กรอกเฉพาะภาษาอังกฤษเท่านั้น"
                              }
                            }}
                            render={({ onChange, value }) => (
                              <TextField
                                variant="outlined"
                                size="small"
                                margin="normal"
                                required
                                fullWidth
                                label="ชื่อวิชาภาษาอังกฤษ"
                                value={value}
                                onChange={onChange}
                                type="text"
                              />
                            )}
                          />
                          <div style={{ fontSize: "12px" }}>
                            {errors.Subject_NameENE && (
                              <span className="text-danger" role="alert">
                                {errors.Subject_NameENE.message}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="col-sm-4 mb-2 mt-3 align-middle text-right">
                          <label>จำนวนชั่วโมงวิชาทฤษฎี : </label>
                        </div>
                        <div className="col-sm-7 mt-3 mb-2 align-middle text-left">
                          <Controller
                            name="Subject_TheoryE"
                            control={control}
                            defaultValue={
                              Object.keys(varY).length > 0
                                ? varY.Subject_Theory
                                : ""
                            }
                            render={({ onChange, value }) => (
                              <select
                                className="form-control"
                                id=""
                                onChange={onChange}
                                value={value}
                                required
                              >
                                <option value="" disabled="disabled">
                                  จำนวนชั่วโมงวิชาทฤษฎี...
                                </option>
                                <option>0</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                                <option>7</option>
                                <option>8</option>
                                <option>9</option>
                              </select>
                            )}
                          />
                        </div>
                        <div className="col-sm-4 mb-2 mt-3 align-middle text-right">
                          <label>จำนวนชั่วโมงวิชาปฏิบัติ : </label>
                        </div>
                        <div className="col-sm-7 mt-3 mb-2 align-middle text-left">
                          <Controller
                            name="Subject_PracticeE"
                            control={control}
                            defaultValue={
                              Object.keys(varY).length > 0
                                ? varY.Subject_Practice
                                : ""
                            }
                            render={({ onChange, value }) => (
                              <select
                                className="form-control"
                                id=""
                                onChange={onChange}
                                value={value}
                                required
                              >
                                <option value="" disabled="disabled">
                                  จำนวนชั่วโมงวิชาปฏิบัติ...
                                </option>
                                <option>0</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                                <option>7</option>
                                <option>8</option>
                                <option>9</option>
                              </select>
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
        <table id="ss" className="table table-hover align-middle text-center">
          <thead>
            <tr style={{ height: "60px" }}>
              <th
                width="15%"
                style={{ verticalAlign: "middle", backgroundColor: "#DDDDDD" }}
              >
                รหัสวิชา
              </th>
              <th
                style={{ verticalAlign: "middle", backgroundColor: "#DDDDDD" }}
              >
                ชื่อวิชาภาษาไทย
              </th>
              <th
                style={{ verticalAlign: "middle", backgroundColor: "#DDDDDD" }}
              >
                ชื่อวิชาภาษาอังกฤษ
              </th>
              <th
                width="13%"
                style={{ verticalAlign: "middle", backgroundColor: "#DDDDDD" }}
              >
                ทฤษฎี
                <br />
                (จำนวนชั่วโมง)
              </th>
              <th
                width="13%"
                style={{ verticalAlign: "middle", backgroundColor: "#DDDDDD" }}
              >
                ปฏิบัติ
                <br />
                (จำนวนชั่วโมง)
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
                <tr key={variable.Subject_PK}>
                  <td style={{ textAlign: "left", verticalAlign: "middle" }}>
                    {variable.Subject_ID}
                  </td>
                  <td style={{ textAlign: "left", verticalAlign: "middle" }}>
                    {variable.Subject_NameTH}
                  </td>
                  <td style={{ textAlign: "left", verticalAlign: "middle" }}>
                    {variable.Subject_NameEN}
                  </td>
                  <td style={{ verticalAlign: "middle" }}>
                    {variable.Subject_Theory}
                  </td>
                  <td style={{ verticalAlign: "middle" }}>
                    {variable.Subject_Practice}
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
                      data-placement="bottom"
                      title="แก้ไขข้อมูลรายวิชา"
                    >
                      <EditIcon />
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => {
                        onDel({ subject: variable.Subject_PK });
                      }}
                      data-placement="bottom"
                      title="ลบข้อมูลรายวิชา"
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
      {/* datatable */}
      {/* <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div> */}
    </AdminTheme>
  );
}
