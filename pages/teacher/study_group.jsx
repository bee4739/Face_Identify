import React from "react";
import { useRouter } from "next/router";
import TeacherTheme from "../../components/TeacherTheme";
import { makeStyles } from "@material-ui/core/styles";
import { useForm, Controller } from "react-hook-form";
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
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

export default function Teacher(props) {
  const classes = useStyles();

  const router = useRouter();

  const { control, handleSubmit, reset } = useForm();

  const [subject, setSubject] = useState([]);
  const getSubject = data => {
    axios
      .post(`${props.env.api_url}/dropdownSubject`, JSON.stringify(data))
      .then(value => {
        setSubject(value.data.result);
        console.log("ssss", value.data.result);
      })
      .catch(reason => {
        console.log(reason);
      });
  };

  const [year, setYear] = useState([]);
  const getYear = data => {
    axios
      .post(`${props.env.api_url}/dropdownYear`, JSON.stringify(data))
      .then(value => {
        setYear(value.data.result);
        console.log("yyyy", value.data.result);
      })
      .catch(reason => {
        console.log(reason);
      });
  };

  const onSubmit = data => {
    data = { ...data, User_ID: props.userLogin.User_ID };
    console.log(data);
    axios
      .post(`${props.env.api_url}/insertStudyGroup`, JSON.stringify(data))
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
    // window.location.reload();
    // alert("เพิ่มข้อมูลเรียนสำเร็จ");
  };

  const [def, setDef] = useState({});
  const onUpdate = data => {
    data = { ...data, Class_ID: def.Class_ID };
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
          .post(`${props.env.api_url}/editStudyGroup`, JSON.stringify(data))
          .then(value => {
            if (value.data.isQuery == true) {
              console.log(value.data);
              Swal.fire({
                title: "แก้ไขสำเร็จ!",
                text: "",
                icon: "success",
                showConfirmButton: false
              });
              setTimeout(() => {
                window.location.reload();
              }, 1000);
            } else {
              Swal.fire({
                title: "แก้ไขไม่สำเร็จ!",
                text: "กรุณาตรวจสอบข้อมูลให้ถูกต้อง",
                icon: "error",
                showConfirmButton: true
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
          showConfirmButton: false
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
          .post(`${props.env.api_url}/delStudyGroup`, JSON.stringify(data))
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

  const [studyGroup, setStudyGroup] = useState([]);
  const getStudyGroup = data => {
    data = { ...data, Username: props.userLogin.User_ID };
    axios
      .post(`${props.env.api_url}/getStudyGroup`, JSON.stringify(data))
      .then(value => {
        console.log("data", value.data.result);
        setStudyGroup(value.data.result);
      })
      .catch(reason => {
        console.log(reason);
      });
  };

  useEffect(() => {
    getSubject();
    getYear();
    getStudyGroup();
  }, []);

  return (
    <TeacherTheme {...props}>
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
          <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
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
                  <div className="col-sm-5 mt-2 align-middle text-right">
                    <label>วิชา : </label>
                  </div>
                  <div className="col-sm-6 mt-2 mb-2 align-middle text-left">
                    <Controller
                      name="Subject_ID"
                      defaultValue=""
                      control={control}
                      variant="outlined"
                      render={({ onChange, value }) => (
                        // <select options={{options}} />
                        <select
                          className="form-control"
                          id="addSubject"
                          // onChange={onChange}
                          onChange={onChange}
                          value={value}
                        >
                          <option value="" disabled="disabled">
                            กรุณาเลือกรายวิชา...
                          </option>
                          {subject.map((variable, index) => {
                            return (
                              <option
                                // key={variable.Subject_PK}
                                key={index}
                                // value={`${variable.Subject_ID},${variable.Subject_NameTH}`}
                                value={variable.Subject_PK}
                                // value={`${variable.Subject_PK}`}
                              >
                                {variable.Subject_ID}
                                &nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;
                                {variable.Subject_NameTH}
                              </option>
                            );
                          })}
                        </select>
                      )}
                    />
                  </div>
                  <div className="col-sm-5 mt-3 align-middle text-right">
                    <label>กลุ่มเรียน : </label>
                  </div>
                  <div className="col-sm-6 mb-2 align-middle text-left">
                    <Controller
                      name="Group_Study"
                      defaultValue=""
                      control={control}
                      render={({ onChange, value }) => (
                        <TextField
                          placeholder="ตัวอย่าง CPE.60231A"
                          variant="outlined"
                          size="small"
                          margin="normal"
                          required
                          fullWidth
                          label="กลุ่มเรียน"
                          onChange={onChange}
                          value={value}
                          type="text"
                        />
                      )}
                    />
                  </div>
                  <div className="col-sm-5 mt-2 align-middle text-right">
                    <label>ปีการศึกษา : </label>
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
                            กรุณาเลือกปีการศึกษา...
                          </option>
                          {year.map((variable, index) => {
                            return (
                              <option
                                key={index}
                                value={variable.Year_ID}
                                // value={`${variable.Year_ID}`}
                              >
                                {variable.Year}
                                &nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;
                                {variable.Term}
                              </option>
                            );
                          })}
                        </select>
                      )}
                    />
                  </div>

                  <div className="col-sm-5 mt-3 align-middle text-right">
                    <label>รหัสกลุ่มเรียน : </label>
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
                          label="รหัสกลุ่มเรียน"
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
          </form>
        </div>
      </div>

      {/* -------------------------------------------Edit */}

      <div
        className="modal fade"
        id="EditSub"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          {(() => {
            if (Object.keys(def).length > 0) {
              return (
                <form
                  className={classes.form}
                  onSubmit={handleSubmit(onUpdate)}
                >
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">
                        แก้ไขกลุ่มเรียน
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
                        <div className="col-sm-5 mt-2 align-middle text-right">
                          <label>วิชา : </label>
                        </div>
                        <div className="col-sm-6 mt-2 mb-2 align-middle text-left">
                          <Controller
                            name="Subject_IDE"
                            // defaultValue=""
                            defaultValue={
                              Object.keys(def).length > 0 ? def.Subject_PK : ""
                            }
                            control={control}
                            variant="outlined"
                            render={({ onChange, value }) => (
                              // <select options={{options}} />
                              <select
                                className="form-control"
                                id="addSubject"
                                // onChange={onChange}
                                onChange={onChange}
                                value={value}
                              >
                                {subject.map((variable, index) => {
                                  return (
                                    <option
                                      // key={variable.Subject_PK}
                                      key={index}
                                      // value={`${variable.Subject_ID},${variable.Subject_NameTH}`}
                                      value={variable.Subject_PK}
                                      // value={`${variable.Subject_PK}`}
                                    >
                                      {variable.Subject_ID}
                                      &nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;
                                      {variable.Subject_NameTH}
                                    </option>
                                  );
                                })}
                              </select>
                            )}
                          />
                        </div>
                        <div className="col-sm-5 mt-3 align-middle text-right">
                          <label>กลุ่มเรียน : </label>
                        </div>
                        <div className="col-sm-6 mb-2 align-middle text-left">
                          <Controller
                            name="Group_StudyE"
                            defaultValue={
                              Object.keys(def).length > 0 ? def.Group_Study : ""
                            }
                            control={control}
                            render={({ onChange, value }) => (
                              <TextField
                                placeholder="ตัวอย่าง CPE.60231A"
                                variant="outlined"
                                size="small"
                                margin="normal"
                                required
                                fullWidth
                                label="กลุ่มเรียน"
                                onChange={onChange}
                                value={value}
                                type="text"
                              />
                            )}
                          />
                        </div>
                        <div className="col-sm-5 mt-2 align-middle text-right">
                          <label>ปีการศึกษา : </label>
                        </div>
                        <div className="col-sm-6 mt-2 mb-2 align-middle text-left">
                          <Controller
                            name="TermE"
                            defaultValue={
                              Object.keys(def).length > 0 ? def.Year_ID : ""
                            }
                            control={control}
                            variant="outlined"
                            render={({ onChange, value }) => (
                              <select
                                className="form-control"
                                onChange={onChange}
                                value={value}
                              >
                                {year.map((variable, index) => {
                                  return (
                                    <option
                                      key={index}
                                      value={variable.Year_ID}
                                      // value={`${variable.Year_ID}`}
                                    >
                                      {variable.Year}
                                      &nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;
                                      {variable.Term}
                                    </option>
                                  );
                                })}
                              </select>
                            )}
                          />
                        </div>

                        <div className="col-sm-5 mt-3 align-middle text-right">
                          <label>รหัสกลุ่มเรียน : </label>
                        </div>
                        <div className="col-sm-6 mb-2 align-middle text-left">
                          <Controller
                            name="Pass_GroupE"
                            defaultValue={
                              Object.keys(def).length > 0 ? def.Pass_Group : ""
                            }
                            control={control}
                            render={({ onChange, value }) => (
                              <TextField
                                variant="outlined"
                                size="small"
                                margin="normal"
                                required
                                fullWidth
                                label="รหัสกลุ่มเรียน"
                                onChange={onChange}
                                value={value}
                                type="text"
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
                      <button type="submit" className="btn btn-warning">
                        แก้ไข
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
        <table className="table table-striped align-middle text-center">
          <thead>
            <tr>
              <th scope="col" style={{ verticalAlign: "middle" }}>
                รหัสวิชา - ชื่อวิชา
              </th>
              <th scope="col" style={{ verticalAlign: "middle" }}>
                กลุ่มเรียน
              </th>
              <th scope="col" style={{ verticalAlign: "middle" }}>
                ปีการศึกษา / ภาคเรียน
              </th>
              <th scope="col" width="15%" style={{ verticalAlign: "middle" }}>
                จัดการ
              </th>
            </tr>
          </thead>
          <tbody>
            {studyGroup.map((variable, index) => {
              return (
                <tr key={index}>
                  <td style={{ textAlign: "left" }}>
                    {variable.Subject_ID}
                    &nbsp;&nbsp;-&nbsp;&nbsp;
                    {variable.Subject_NameTH}
                  </td>
                  <td>{variable.Group_Study}</td>
                  <td>
                    {variable.Year}
                    &nbsp;&nbsp;/&nbsp;&nbsp;
                    {variable.Term}
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-warning mr-2"
                      data-toggle="modal"
                      data-target="#EditSub"
                      onClick={() => {
                        setDef(variable);
                        console.log(variable);
                        reset({
                          Subject_IDE: variable.Subject_PK,
                          TermE: variable.Year_ID
                        });
                      }}
                    >
                      <EditIcon />
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => {
                        onDel({ Class_ID: variable.Class_ID });
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
    </TeacherTheme>
  );
}
