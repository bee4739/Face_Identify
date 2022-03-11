import React from "react";
import { useRouter } from "next/router";
import TeacherTheme from "../../components/TeacherTheme";
import { makeStyles } from "@material-ui/core/styles";
import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import EditIcon from "@material-ui/icons/Edit";
import Swal from "sweetalert2";
import HistoryIcon from "@material-ui/icons/History";

const useStyles = makeStyles(theme => ({
  button: {
    textAlign: "center"
  },
  form: {
    width: "80%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  }
}));

export default function Teacher(props) {
  const classes = useStyles();
  const router = useRouter();
  const {
    control,
    handleSubmit,
    handleChange,
    formState: { errors }
  } = useForm();

  const [ddyear, setddYear] = useState("");
  const [ddsubject, setddSubject] = useState("");
  // const [scoreTotal, setScoreTotal] = useState({});
  const [scoreSum, setScoreSum] = useState({});

  const [scoreLate, setScoreLate] = useState({});

  const [rsDate, setrsDate] = useState([]);
  const getrsDate = data => {
    axios
      .post(`${props.env.api_url}/rsDate`, JSON.stringify(data))
      .then(value => {
        setrsDate(value.data.result);
        // console.log("ssss", value.data.result);
      })
      .catch(reason => {
        console.log(reason);
      });
  };

  const [rsStatus, setrsStatus] = useState([]);
  const getrsStatus = data => {
    axios
      .post(`${props.env.api_url}/rsStatus`, JSON.stringify(data))
      .then(value => {
        setrsStatus(value.data.result);
        // console.log("ssss", value.data.result);
      })
      .catch(reason => {
        console.log(reason);
      });
  };

  const [year, setYear] = useState([]);
  const getYear = data => {
    axios
      .post(`${props.env.api_url}/resultcheck`, JSON.stringify(data))
      .then(value => {
        setYear(value.data.result);
        // console.log("ssss", value.data.result);
      })
      .catch(reason => {
        console.log(reason);
      });
  };

  const [subject, setSubject] = useState([]);
  const getSubject = data => {
    data = {
      ...data,
      User_ID: props.userLogin.User_ID
    };

    axios
      .post(`${props.env.api_url}/resultchecksubject`, JSON.stringify(data))
      .then(value => {
        setSubject(value.data.result);
        // console.log("ssss", value.data.result);
      })
      .catch(reason => {
        console.log(reason);
      });
  };

  const [showresulte, setShowresulte] = useState([]);
  const getShowresulte = data => {
    // data = { ...data, Year_ID: ddyear.Year_ID, Subject_PK: ddsubject.Subject_PK };
    axios
      .post(`${props.env.api_url}/showresultcheck`, JSON.stringify(data))
      .then(value => {
        setShowresulte(value.data.result);
        // console.log("ssss", value.data.result);
      })
      .catch(reason => {
        console.log(reason);
      });
  };

  const [showEdit, setShowEdit] = useState([]);
  const getShowEdit = data => {
    // data = { ...data, Year_ID: ddyear.Year_ID, Subject_PK: ddsubject.Subject_PK };
    axios
      .post(`${props.env.api_url}/showEdit`, JSON.stringify(data))
      .then(value => {
        setShowEdit(value.data.result);
        // console.log("ssss", value.data.result);
      })
      .catch(reason => {
        console.log(reason);
      });
  };

  const onUpdate = data => {
    // data = { ...data, Year_ID: varY.Year_ID };
    // console.log(data);
    data = {
      ...data,
      Std_No: `${data.Time}`.split(",")[0],
      Time: `${data.Time}`.split(",")[1]
    };
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
          .post(`${props.env.api_url}/updateCheck`, JSON.stringify(data))
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
              // setTimeout(window.location.reload(), 5000);
            } else {
              Swal.fire({
                title: "แก้ไขไม่สำเร็จ!",
                text: "กรุณาตรวจสอบข้อมูลให้ถูกต้อง",
                icon: "error",
                showConfirmButton: true,
                confirmButtonText: "ตกลง"
              });
              // console.log(value.data.isQuery);
              // console.log(value.data);
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

  const [historyCheck, setHistoryCheck] = useState([]);
  const getHistoryCheck = data => {
    // data = { ...data, User_ID: props.userLogin.User_ID };
    axios
      .post(`${props.env.api_url}/getHistoryCheck`, JSON.stringify(data))
      .then(value => {
        // console.log("getHistoryCheck", value.data.result);
        setHistoryCheck(value.data.result);
      })
      .catch(reason => {
        console.log(reason);
      });
  };

  React.useEffect(() => {
    getYear();
    getSubject();
  }, []);

  return (
    <TeacherTheme {...props}>
      <form>
        <div className={classes.form}>
          <div className="row">
            <div className="col-sm-5 mt-2 align-middle text-right">
              <label>ปีการศึกษา : </label>
            </div>
            <div className="col-sm-6 mt-2 mb-2 align-middle text-left">
              <select
                className="form-control"
                onChange={e => {
                  setddYear(e.target.value);
                }}
                value={ddyear}
                required
              >
                <option value="" disabled="disabled">
                  กรุณาเลือกปีการศึกษา...
                </option>
                {year.map((y, index) => {
                  return (
                    <option key={index} value={y.Year_ID}>
                      {y.Year} - {y.Term}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="col-sm-5 mt-2 align-middle text-right">
              <label>วิชา : </label>
            </div>
            <div className="col-sm-6 mt-2 mb-2 align-middle text-left">
              <select
                required
                className="form-control"
                onChange={e => {
                  setddSubject(e.target.value);
                }}
                defaultValue={ddsubject}
              >
                <option value="" disabled="disabled">
                  กรุณาเลือกวิชา...
                </option>

                {subject
                  .filter(e => e.Year_ID == ddyear)
                  .map((s, index) => {
                    return (
                      <option key={index} value={s.Class_ID}>
                        {s.Subject_ID} - {s.Subject_NameTH} ({s.Group_Study})
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>
        </div>

        <div className={classes.button}>
          <button
            type="button"
            className="btn btn-success ml-2 mr-2 mb-4 mt-4 "
            onClick={() => {
              // document.getElementById("ex").visibility = "visible";
              // document.getElementById("btExport").visibility = "visible";
              getrsStatus({ dds: ddsubject });
              getrsDate({ dds: ddsubject });
              getShowresulte({ dds: ddsubject });
            }}
          >
            แสดง
          </button>
        </div>
      </form>
      <div style={{ fontSize: "12px", color: "red", textAlign: "right" }}>
        * คะแนน 10 = มา, 7 = สาย, 5 = ลา, 0 = ขาด
      </div>
      <div
        className="col-sm-12  mt-4 align-middle"
        style={{
          overflowY: "scroll",
          height: "270px",
          overflowX: "scroll"
        }}
      >
        <table
          className="table table-responsive-md table-hover align-middle text-center"
          id="ex"
          style={{
            width: "100%"
          }}

          // style={{ visibility: "hidden" }}
        >
          <thead>
            <tr style={{ height: "60px" }}>
              <th
                style={{
                  verticalAlign: "middle",
                  width: "5%"
                  // backgroundColor: "#FFFFFF"
                }}
              >
                ที่
              </th>
              <th
                style={{
                  verticalAlign: "middle",
                  width: "15%"
                  //  backgroundColor: "#FFFFFF"
                }}
              >
                รหัสนักศึกษา
              </th>
              <th
                style={{
                  verticalAlign: "middle",
                  width: "40%"
                  // backgroundColor: "#FFFFFF"
                }}
              >
                ชื่อ-นามสกุล
              </th>
              {rsDate.map((variable, index) => {
                return (
                  <th
                    style={{
                      verticalAlign: "middle",
                      width: "20%"
                      // backgroundColor: "#FFFFFF"
                    }}
                  >
                    {variable.Date}
                  </th>
                );
              })}
              <th
                style={{
                  verticalAlign: "middle",
                  width: "5%"
                  // backgroundColor: "#FFFFFF"
                }}
              >
                รวม
              </th>
              <th
                style={{
                  verticalAlign: "middle",
                  width: "5%"
                  // backgroundColor: "#FFFFFF"
                }}
              ></th>
              <th
                style={{
                  verticalAlign: "middle",
                  width: "5%"
                  // backgroundColor: "#FFFFFF"
                }}
              ></th>
            </tr>
          </thead>
          <tbody>
            {showresulte.map((variable, index) => {
              let tmpStd = {};
              tmpStd[index] = [];

              let tmpcount = {};
              tmpcount[index] = [];

              return (
                <tr key={index}>
                  <td
                    style={{
                      verticalAlign: "middle"
                      // height: "60px"
                      // backgroundColor: "#FFFFFF"
                    }}
                  >
                    {index + 1}
                  </td>
                  <td
                    style={{
                      verticalAlign: "middle"
                      // height: "60px"
                      // backgroundColor: "#FFFFFF"
                    }}
                  >
                    {variable.Std_ID}
                  </td>
                  <td
                    style={{
                      verticalAlign: "middle",
                      textAlign: "left"
                      // height: "60px"
                      // backgroundColor: "#FFFFFF"
                    }}
                  >
                    {variable.Std_Title}
                    {variable.Std_FirstName} {variable.Std_LastName}
                  </td>
                  {rsStatus.map((v, i) => {
                    if (i === rsStatus.length - 1) {
                      // console.log(
                      //   `Sum : `,
                      //   tmpStd[index]?.reduce((a, b) => a + b, 0)
                      // );
                      // console.log("i", tmpcount[index].length);
                    }

                    if (variable.Std_No == v.Std_No) {
                      tmpStd[index].push(
                        v.Status == "ขาด"
                          ? 0
                          : v.Status == "ลา"
                          ? 5
                          : v.Status == "สาย"
                          ? 7
                          : 10
                      );

                      tmpcount[index].push(i);

                      return (
                        <td
                          style={{
                            verticalAlign: "middle"
                            // height: "60px"
                            // backgroundColor: "#FFFFFF"
                          }}
                        >
                          {v.Status == "ขาด"
                            ? 0
                            : v.Status == "ลา"
                            ? 5
                            : v.Status == "สาย"
                            ? 7
                            : 10}
                        </td>
                      );
                    }
                  })}
                  <td
                    style={{
                      verticalAlign: "middle"
                      // height: "60px"
                      // backgroundColor: "#FFFFFF"
                    }}
                  >
                    {parseInt(
                      (tmpStd[index]?.reduce((a, b) => a + b, 0) * 100) /
                        (tmpcount[index].length * 10) /
                        10
                    )}
                  </td>
                  <td
                    style={{
                      verticalAlign: "middle"
                      // height: "60px"
                      // backgroundColor: "#FFFFFF"
                    }}
                  >
                    <button
                      type="button"
                      class="btn btn-info"
                      data-toggle="modal"
                      data-target="#history"
                      data-placement="bottom"
                      title="ประวัติการเข้าเรียน"
                      style={{
                        padding: "1px 1px"
                      }}
                      onClick={() => {
                        getHistoryCheck({
                          Class_ID: variable.Class_ID,
                          User_ID: variable.Std_No
                        });
                      }}
                    >
                      <HistoryIcon />
                    </button>
                  </td>
                  <td
                    style={{
                      verticalAlign: "middle"
                      // height: "60px"
                      // backgroundColor: "#FFFFFF"
                    }}
                  >
                    <button
                      type="button"
                      className="btn btn-warning mr-2"
                      data-toggle="modal"
                      data-target="#editCheck"
                      data-placement="bottom"
                      title="แก้ไขข้อมูลการมาเรียน"
                      style={{
                        padding: "1px 1px"
                      }}
                      onClick={() => {
                        getShowEdit({
                          Std_No: variable.Std_No,
                          Schedule_ID: variable.Schedule_ID,
                          Class_ID: variable.Class_ID
                        });
                      }}
                    >
                      <EditIcon />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div>
        <div
          class="modal fade"
          id="editCheck"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <form className={classes.form} onSubmit={handleSubmit(onUpdate)}>
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    แก้ไขบันทึกการมาเรียน
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
                  <div className="row">
                    <div className="col-sm-5 mt-2 align-middle text-right">
                      <label>วันที่ : </label>
                    </div>
                    <div className="col-sm-6 mt-2 mb-2 align-middle text-left">
                      <Controller
                        name="Time"
                        defaultValue=""
                        control={control}
                        variant="outlined"
                        render={({ onChange, value }) => (
                          // <select options={{options}} />
                          <select
                            className="form-control"
                            // onChange={onChange}
                            onChange={onChange}
                            value={value}
                            required
                          >
                            <option value="" disabled="disabled">
                              กรุณาเลือกวันที่...
                            </option>
                            {showEdit.map((variable, index) => {
                              return (
                                <option
                                  // key={variable.Subject_PK}
                                  key={index}
                                  // value={`${variable.Subject_ID},${variable.Subject_NameTH}`}
                                  value={`${variable.Std_No},${variable.Time}`}
                                  // value={`${variable.Subject_PK}`}
                                >
                                  วันที่ {variable.Date}
                                </option>
                              );
                            })}
                          </select>
                        )}
                      />
                    </div>
                    <div className="col-sm-5 mt-2 align-middle text-right">
                      <label>สถานะ : </label>
                    </div>
                    <div className="col-sm-6 mt-2 mb-2 align-middle text-left">
                      <Controller
                        name="Status"
                        defaultValue=""
                        control={control}
                        variant="outlined"
                        render={({ onChange, value }) => (
                          // <select options={{options}} />
                          <select
                            className="form-control"
                            // onChange={onChange}
                            onChange={onChange}
                            value={value}
                            required
                          >
                            <option value="" disabled="disabled">
                              กรุณาเลือกสถานะ...
                            </option>
                            <option>มา</option>
                            <option>สาย</option>
                            <option>ลา</option>
                            <option>ขาด</option>
                          </select>
                        )}
                      />
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="submit" class="btn btn-success">
                    บันทึก
                  </button>
                  <button
                    type="button"
                    class="btn btn-danger"
                    data-dismiss="modal"
                  >
                    ยกเลิก
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

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
                ประวัติการเข้าเรียน
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
                      ครั้งที่
                    </th>
                    <th
                      style={{
                        backgroundColor: "#DDDDDD"
                      }}
                    >
                      วัน - เวลา
                    </th>
                    <th
                      style={{
                        backgroundColor: "#DDDDDD"
                      }}
                    >
                      สถานะ
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
                        <td>
                          {variable.Status == "ขาด" || variable.Status == "ลา"
                            ? `${variable.Date}`
                            : `${variable.Time}`}
                        </td>
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
                ปิด
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className={classes.button}
        // style={{ visibility: "hidden" }}
      >
        <ReactHTMLTableToExcel
          id="btExport"
          className="btn btn-info mt-4"
          table="ex"
          filename="รายชื่อนักศึกษา"
          sheet="Sheet"
          buttonText="Export Excel"
        />
      </div>
    </TeacherTheme>
  );
}
