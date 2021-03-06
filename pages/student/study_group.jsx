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
import HistoryIcon from "@material-ui/icons/History";

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
        console.log("aaaa", value.data.result);
        setStudent(value.data.result);
      })
      .catch(reason => {
        console.log(reason);
      });
  };

  const onSubmit = data => {
    data = {
      ...data,
      User_ID: props.userLogin.User_ID,
      Std_ID: props.userLogin.Std_ID,
      Title: props.userLogin.Title,
      FirstName: props.userLogin.FirstName,
      LastName: props.userLogin.LastName,
      Study_Group: `${data.Study_Group}`.split(",")[0],
      passwordDefault: `${data.Study_Group}`.split(",")[1]
    };

    console.log(data);

    if (`${data.passwordDefault}` !== `${data.Pass_Group}`) {
      Swal.fire({
        title: "????????????????????????????????????????????????????????????!",
        text: "????????????????????????????????????????????????????????????????????????????????????",
        icon: "error",
        showConfirmButton: true,
        confirmButtonText: "????????????"
      });
    } else {
      axios
        .post(
          `${props.env.api_url}/insertStudyGroupStudent`,
          JSON.stringify(data)
        )
        .then(value => {
          if (value.data.isQuery == true) {
            console.log("oooo", value.data);
            Swal.fire({
              title: "???????????????????????????????????????????????????!",
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
              title: "????????????????????????????????????????????????????????????!",
              text: "????????????????????????????????????????????????????????????????????????????????????",
              icon: "error",
              showConfirmButton: true,
              confirmButtonText: "????????????"
            });
          }
        })
        .catch(reason => {
          console.log(reason);
        });
    }
  };

  const onDel = data => {
    Swal.fire({
      title: "??????????????????????????????????",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "????????????",
      cancelButtonText: "??????????????????"
    }).then(result => {
      if (result.isConfirmed) {
        axios
          .post(
            `${props.env.api_url}/delStudyGroupStudent`,
            JSON.stringify(data)
          )
          .then(value => {
            Swal.fire({
              title: "????????????????????????!",
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
    // alert("??????????????????????????????????????????");
  };

  const [historyCheck, setHistoryCheck] = useState([]);
  const getHistoryCheck = data => {
    data = { ...data, User_ID: props.userLogin.User_ID };
    axios
      .post(`${props.env.api_url}/getHistoryCheck`, JSON.stringify(data))
      .then(value => {
        console.log("getHistoryCheck", value.data.result);
        setHistoryCheck(value.data.result);
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
            ?????????????????????????????????????????????
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
                  ?????????????????????????????????????????????
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
                    <label>?????????????????????????????? : </label>
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
                          onChange={e => {
                            // let tmpEvent = {
                            //   ...e,
                            //   target: { value: e.target.value.split(",")[0] },
                            // };
                            onChange(e);
                          }}
                          value={value}
                        >
                          <option value="" disabled="disabled">
                            ???????????????????????????????????????????????????...
                          </option>
                          {studyGroupStudent.map((variable, index) => {
                            return (
                              <option
                                key={index}
                                value={`${variable.Class_ID},${variable.Pass_Group}`}
                              >
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
                    <label>?????????????????????????????????????????????????????? : </label>
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
                          label="??????????????????????????????????????????????????????"
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
                <button type="submit" className="btn btn-success">
                  ???????????????
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  data-dismiss="modal"
                >
                  ??????????????????
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-12  mt-4 align-middle">
          <center>
            <table
              className="table table-hover align-middle text-center"
              style={{ width: "80%" }}
            >
              <thead>
                <tr style={{ height: "60px" }}>
                  <th
                    style={{
                      verticalAlign: "middle",
                      backgroundColor: "#DDDDDD"
                    }}
                  >
                    ???????????????????????? - ???????????????????????? (??????????????????????????????)
                  </th>
                  <th
                    style={{
                      verticalAlign: "middle",
                      backgroundColor: "#DDDDDD"
                    }}
                  ></th>
                </tr>
              </thead>
              <tbody>
                {student.map((variable, index) => {
                  return (
                    <tr key={index} style={{ textAlign: "left" }}>
                      <td
                        style={{
                          verticalAlign: "middle"
                        }}
                      >
                        {variable.Subject_ID}&nbsp;-&nbsp;
                        {variable.Subject_NameTH}&nbsp;&nbsp;(
                        {variable.Group_Study})
                      </td>
                      <td>
                        <button
                          type="button"
                          class="btn btn-info"
                          // style={{ backgroundColor: "#F7D9D9" }}
                          data-toggle="modal"
                          data-target="#history"
                          onClick={() => {
                            getHistoryCheck({ Class_ID: variable.Class_ID });
                          }}
                        >
                          <HistoryIcon />
                          {/* <HistoryIcon style={{ color: "#F25287" }} /> */}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </center>
        </div>
      </form>

      <div
        class="modal fade"
        id="history"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                ?????????????????????????????????????????????????????????
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <table
                class="table table-hover"
                style={{
                  verticalAlign: "middle",
                  textAlign: "center"
                }}
              >
                <thead>
                  <tr>
                    <th
                      style={{
                        backgroundColor: "#DDDDDD"
                      }}
                    >
                      ????????????????????????
                    </th>
                    <th
                      style={{
                        backgroundColor: "#DDDDDD"
                      }}
                    >
                      ????????? - ????????????
                    </th>
                    <th
                      style={{
                        backgroundColor: "#DDDDDD"
                      }}
                    >
                      ???????????????
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {historyCheck.map((variable, index) => {
                    return (
                      <tr key={index}>
                        <td
                          style={{
                            verticalAlign: "middle",
                            textAlign: "center"
                          }}
                        >
                          {index + 1}
                        </td>
                        <td>{variable.Time}</td>
                        <td>{variable.Status}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                ?????????
              </button>
            </div>
          </div>
        </div>
      </div>
    </StudentTheme>
  );
}
