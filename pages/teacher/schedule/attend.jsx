import React from "react";
import { useRouter } from "next/router";
import TeacherTheme from "../../../components/TeacherTheme";
import { makeStyles } from "@material-ui/core/styles";
import { useForm, Controller } from "react-hook-form";
import AddIcon from "@material-ui/icons/Add";
import TextField from "@material-ui/core/TextField";
// import "react-calendar/dist/Calendar.css";
// import Calendar from "react-calendar";
// import moment from "moment";
// import "../../../node_modules/react-big-calendar/lib/css/react-big-calendar.css";
import {
  Inject,
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month
} from "@syncfusion/ej2-react-schedule";
// BigCalendar.momentLocalizer(moment);
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import HowToRegIcon from "@material-ui/icons/HowToReg";
import Link from "next/link";
import { TimePicker } from "@material-ui/pickers";

const useStyles = makeStyles(theme => ({
  button: {
    textAlign: "right"
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  dataCarlendar: {
    textAlign: "center",
    backgroundColor: "#FFCCCC"
  },
  buttond: {
    width: "100px"
  },
  low: {
    backgroundColor: "#FFFFCC"
  }
}));

export default function Teacher(props) {
  console.log(props.userLogin);

  const [btStatus, setBtStatus] = useState(true);

  const classes = useStyles();
  const router = useRouter();
  const { control, handleSubmit, reset } = useForm();

  const [sub, setSub] = useState([]);
  const [dayList, setDayList] = useState([]);
  const [dateSelect, setDateSelect] = useState(null);
  const getDay = () => {
    axios
      .post(`${props.env.api_url}/getDay`)
      .then(value => {
        if (value.data.rowCount > 0) {
          let backup = [];
          value.data.result.forEach((e, i) => {
            let start = new Date(`${e.Start_SchYear}`);
            let end = new Date(`${e.End_SchYear}`);

            for (let i = start.getTime(); i < end.getTime(); i += 86400000) {
              if (`${new Date(i).getDay()}` === `${e.Day}`) {
                start = new Date(i);
                break;
              }
            }

            for (
              let i = start.getTime();
              i < end.getTime();
              i += 86400000 * 7
            ) {
              backup.push({
                Id: backup.length + 1,
                Subject: e.Subject_NameTH,
                StartTime: new Date(i),
                EndTime: new Date(i),
                IsAllDay: true,
                Priority: "High",
                data1: e.Subject_ID,
                data2: e.Subject_NameTH,
                data3: e.Group_Study,
                data4: e.Start_Time,
                data5: e.End_Time,
                data6: e.Subject_Type,
                data7: e.Schedule_ID,
                data8: e.Class_ID,
                data9: e.Day,
                data10: e.Start_Time,
                data11: e.End_Time
              });
            }
          });

          setDayList(backup);
        } else {
          setDayList([]);
        }
      })
      .catch(reason => {
        console.log(reason);
      });
  };

  const getSubject = data => {
    axios
      .post(`${props.env.api_url}/dropdownSubSchedule`, JSON.stringify(data))
      .then(value => {
        setSub(value.data.result);
        console.log("ssss", value.data.result);
      })
      .catch(reason => {
        console.log(reason);
      });
  };

  const onSubmit = data => {
    axios
      .post(`${props.env.api_url}/insertScheduleAttend`, JSON.stringify(data))
      .then(value => {
        if (value.data.isQuery == true) {
          console.log(value.data);
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
    // window.location.reload();
    // alert("???????????????????????????????????????????????????");
  };

  const [def, setDef] = useState({});
  const onUpdate = data => {
    data = { ...data, Schedule_ID: def.data7 };
    // console.log(data);
    Swal.fire({
      title: "???????????????????????????????????????????",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: `??????????????????`,
      denyButtonText: `???????????????????????????`,
      cancelButtonText: `??????????????????`
    }).then(result => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        axios
          .post(`${props.env.api_url}/editScheduleAttend`, JSON.stringify(data))
          .then(value => {
            if (value.data.isQuery == true) {
              console.log(value.data);
              Swal.fire({
                title: "?????????????????????????????????!",
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
                title: "??????????????????????????????????????????!",
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
      } else if (result.isDenied) {
        Swal.fire({
          title: "???????????????????????????????????????????????????",
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
    // alert("???????????????????????????????????????????????????");
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
          .post(`${props.env.api_url}/delScheduleAttend`, JSON.stringify(data))
          .then(value => {
            console.log(value.data);
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

  // const todayDate = moment().toDate();
  // const events = [
  //   {
  //     title: "Visit to San Francisco",
  //     start: moment().toDate(),
  //     end: moment().add(5, "day").toDate(),
  //   },
  //   {
  //     title: "Meeting with Investors",
  //     start: moment().add(8, "day").toDate(),
  //     end: moment().add(11, "day").toDate(),
  //   },
  //   {
  //     title: "Sports day at office",
  //     start: moment().add(13, "day").toDate(),
  //     end: moment().add(15, "day").toDate(),
  //   },
  // ];

  const [schedule, setSchedule] = useState({});
  const insertCompensate = data => {
    data = { ...data, Schedule_ID: schedule.data7 };

    axios
      .post(`${props.env.api_url}/insertCompensate`, JSON.stringify(data))
      .then(value => {
        if (value.data.isQuery == true) {
          console.log("scheduleS", value.data);
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
          console.log("scheduleF", value.data);
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
    // window.location.reload();
    // alert("???????????????????????????????????????????????????");
  };

  React.useEffect(() => {
    getSubject();
    getDay();
    // var x = document.getElementsByName("checkname");
    // x.disabled = btStatus;
  }, []);

  return (
    <TeacherTheme {...props}>
      <div className={classes.button}>
        <button
          type="button"
          className="btn btn-success mb-4"
          data-toggle="modal"
          data-target="#AddSub"
        >
          <AddIcon />
          ???????????????????????????????????????
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
                  ???????????????????????????????????????
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
                    ??????????????????????????????????????????????????? :
                  </div>
                  <div className="col-sm-6 mt-2 mb-2 align-middle text-left">
                    <Controller
                      name="Class_ID"
                      defaultValue=""
                      control={control}
                      variant="outlined"
                      render={({ onChange, value }) => (
                        <select
                          className="form-control"
                          id="addSub"
                          onChange={onChange}
                          value={value}
                        >
                          <option value="" disabled="disabled">
                            ????????????????????????????????????????????????????????????...
                          </option>
                          {sub.map((variable, index) => {
                            return (
                              <option key={index} value={variable.Class_ID}>
                                {variable.Subject_ID}
                                &nbsp;-&nbsp;
                                {variable.Subject_NameTH}
                                &nbsp;&nbsp;&nbsp; (??????????????????????????????&nbsp;
                                {variable.Group_Study})
                              </option>
                            );
                          })}
                        </select>
                      )}
                    />
                  </div>
                  <div className="col-sm-4 mb-2 mt-2 align-middle text-right">
                    ???????????????????????? :
                  </div>
                  <div className="col-sm-6 mt-2 mb-2 align-middle text-left">
                    <Controller
                      name="Day"
                      defaultValue=""
                      control={control}
                      variant="outlined"
                      render={({ onChange, value }) => (
                        <select
                          className="form-control"
                          id="addDay"
                          onChange={onChange}
                          value={value}
                        >
                          <option value="" disabled="disabled">
                            ???????????????????????????????????????...
                          </option>
                          <option value={0}>??????????????????????????????</option>
                          <option value={1}>???????????????????????????</option>
                          <option value={2}>???????????????????????????</option>
                          <option value={3}>??????????????????</option>
                          <option value={4}>?????????????????????????????????</option>
                          <option value={5}>????????????????????????</option>
                          <option value={6}>????????????????????????</option>
                        </select>
                      )}
                    />
                  </div>
                  <div className="col-sm-4 mb-2 mt-2 align-middle text-right">
                    <label>??????????????????????????? : </label>
                  </div>
                  <div className="col-sm-6 align-middle text-left">
                    <Controller
                      name="Start_Time"
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
                          type="time"
                        />
                      )}
                    />
                  </div>

                  <div className="col-sm-4 mb-2 mt-2 align-middle text-right">
                    <label>????????????????????????????????? : </label>
                  </div>
                  <div className="col-sm-6 align-middle text-left">
                    <Controller
                      name="End_Time"
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
                          type="time"
                        />
                      )}
                    />
                  </div>
                  <div className="col-sm-4 mb-2 mt-2 align-middle text-right">
                    <label>?????????????????????????????? : </label>
                  </div>
                  <div className="col-sm-6 mb-2 mt-2 align-middle text-left">
                    <div className={classes.d}>
                      <Controller
                        name="Subject_Type"
                        defaultValue=""
                        control={control}
                        variant="outlined"
                        render={({ onChange, value }) => (
                          <select
                            className="form-control"
                            id="addSubType"
                            onChange={onChange}
                            value={value}
                          >
                            <option value="" disabled="disabled">
                              ????????????????????????????????????????????????????????????...
                            </option>
                            <option>???????????????</option>
                            <option>?????????????????????</option>
                          </select>
                        )}
                      />
                    </div>
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
          </form>
        </div>
      </div>

      <div
        className="modal fade"
        id="compensate"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <form
            className={classes.form}
            onSubmit={handleSubmit(insertCompensate)}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="compensate">
                  ????????????????????????
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
                    <label>????????????????????????????????? : </label>
                  </div>
                  <div className="col-sm-6 align-middle text-left">
                    <Controller
                      name="Date_Composate"
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
                    <label>?????????????????????????????? : </label>
                  </div>
                  <div className="col-sm-6 align-middle text-left">
                    <Controller
                      name="Date_Normal"
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
                  <div className="col-sm-4 mb-2 mt-2 align-middle text-right">
                    ???????????????????????? :
                  </div>
                  <div className="col-sm-6 mt-2 mb-2 align-middle text-left">
                    <Controller
                      name="Day_Composate"
                      defaultValue=""
                      control={control}
                      variant="outlined"
                      render={({ onChange, value }) => (
                        <select
                          className="form-control"
                          id="addDayComposate"
                          onChange={onChange}
                          value={value}
                        >
                          <option value="" disabled="disabled">
                            ???????????????????????????????????????...
                          </option>
                          <option value={0}>??????????????????????????????</option>
                          <option value={1}>???????????????????????????</option>
                          <option value={2}>???????????????????????????</option>
                          <option value={3}>??????????????????</option>
                          <option value={4}>?????????????????????????????????</option>
                          <option value={5}>????????????????????????</option>
                          <option value={6}>????????????????????????</option>
                        </select>
                      )}
                    />
                  </div>
                  <div className="col-sm-4 mb-2 mt-2 align-middle text-right">
                    <label>??????????????????????????? : </label>
                  </div>
                  <div className="col-sm-6 align-middle text-left">
                    <Controller
                      name="Start_Time_Composate"
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
                          type="time"
                        />
                      )}
                    />
                  </div>
                  <div className="col-sm-4 mb-2 mt-2 align-middle text-right">
                    <label>????????????????????????????????? : </label>
                  </div>
                  <div className="col-sm-6 align-middle text-left">
                    <Controller
                      name="End_Time_Composate"
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
                          type="time"
                          ampm={false}
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="submit"
                  className="btn btn-success"
                  // onClick={() => {
                  //   insertCompensate({ Schedule_ID: schedule.data7 });
                  // }}
                >
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
          </form>
        </div>
      </div>
      {/* <div className="text-center">
          <Calendar />
        </div> */}
      <div className="mb-4">
        <ScheduleComponent
          // height="auto"
          currentView="Month"
          eventSettings={{
            dataSource: dayList
          }}
          // rowAutoHeight={true}
          readonly={true}
          showQuickInfo={false}
          select={e => {
            setDateSelect(e.data);
            console.log("e", e.data);
            // console.log(Date.parse("Thu Sep 02 2021"));
            var timestamp = Date.parse(e.data.StartTime);
            var date = new Date(timestamp);
            // alert(date.getDate());
            var n = Date.now();
            var date_now = new Date(n);

            // alert(date_now.getDate());
            // var x = document.getElementsByName("checkname");

            var hms =
              date.getFullYear.toString() +
              "-" +
              (date.getMonth() + 1).toString() +
              "-" +
              date.getDate().toString() +
              " ";
            var start_time = new Date(hms + e.data.data4);
            var end_time = new Date(hms + e.data.data5);

            console.log("start_time", start_time);
            console.log("end_time", end_time);
            var d_now = -1.0;
            var d_start = -1.0;
            var d_end = -1.0;

            if (date_now.getMinutes() < 10) {
              var s_now =
                date_now.getHours().toString() +
                ".0" +
                date_now.getMinutes().toString();
              d_now = parseFloat(s_now).toFixed(2);
            } else {
              var s_now =
                date_now.getHours().toString() +
                "." +
                date_now.getMinutes().toString();
              d_now = parseFloat(s_now).toFixed(2);
            }

            if (date_now.getMinutes() < 10) {
              var s_start =
                start_time.getHours().toString() +
                ".0" +
                start_time.getMinutes().toString();
              d_start = parseFloat(s_start).toFixed(2);
            } else {
              var s_start =
                start_time.getHours().toString() +
                "." +
                start_time.getMinutes().toString();
              d_start = parseFloat(s_start).toFixed(2);
            }

            if (date_now.getMinutes() < 10) {
              var s_end =
                end_time.getHours().toString() +
                ".0" +
                end_time.getMinutes().toString();
              d_end = parseFloat(s_end).toFixed(2);
            } else {
              var s_end =
                end_time.getHours().toString() +
                "." +
                end_time.getMinutes().toString();
              d_end = parseFloat(s_end).toFixed(2);
            }

            console.log("d_now", d_now);
            console.log("d_start", d_start);
            console.log("d_end", d_end);
            console.log(d_start <= d_now);
            console.log(d_now <= d_end);

            if (
              date.getDate() == date_now.getDate() &&
              date.getMonth() == date_now.getMonth() &&
              date.getFullYear() == date_now.getFullYear() &&
              d_start <= d_now &&
              d_now <= d_end
            ) {
              document.getElementById("checkname").disabled = false;
            } else {
              document.getElementById("checkname").disabled = true;
            }
          }}
        >
          <Inject services={[Day, Week, WorkWeek, Month]} />
        </ScheduleComponent>
      </div>

      {(date => {
        if (date) {
          return (
            <div>
              <table class="table">
                <thead>
                  <tr className={classes.dataCarlendar}>
                    <th width="5%"></th>
                    <th width="50%">???????????????????????????????????????</th>
                    <th colSpan="3" width="40%">
                      ????????????????????????????????????
                    </th>
                    <th width="5%"></th>
                  </tr>
                </thead>
                <tbody>
                  {/* {scheduleAttend.map((variable, index) => {
                    return ();
                  })} */}
                  <tr className={classes.low}>
                    <td></td>
                    <td>
                      ???????????????????????? : {dateSelect.data1}
                      <br />
                      ???????????????????????? : {dateSelect.data2}
                      <br />
                      ?????????????????????????????? : {dateSelect.data3}
                      <br />
                      ??????????????????????????? : {dateSelect.data4}
                      <br />
                      ????????????????????????????????? : {dateSelect.data5}
                      <br />
                      ?????????????????????????????? : {dateSelect.data6}
                    </td>

                    <td style={{ verticalAlign: "middle", width: 120 }}>
                      <Link
                        href={`/teacher/schedule/check?Class_ID=${dateSelect.data8}&Schedule_ID=${dateSelect.data7}`}
                      >
                        <button
                          id="checkname"
                          disabled=""
                          type="button"
                          className="btn btn-success"
                          style={{ height: 40, width: 100 }}
                          onClick={() => {
                            // var d = new Date();
                            // alert(dateSelect.data4);
                          }}
                        >
                          <HowToRegIcon />
                          &nbsp;????????????????????????
                        </button>
                      </Link>
                      <button
                        type="button"
                        className="mt-2 btn btn-info"
                        data-toggle="modal"
                        data-target="#compensate"
                        style={{ height: 40, width: 100 }}
                        // onClick={() => {
                        //   listNameStd({ Class_ID: variable.Class_ID });
                        // }}
                        onClick={() => {
                          setSchedule(dateSelect);
                          // console.log("sc", dateSelect.data7);
                        }}
                      >
                        ????????????????????????
                      </button>
                    </td>
                    <td style={{ verticalAlign: "middle", width: 120 }}>
                      <button
                        type="button"
                        className="btn btn-warning"
                        data-toggle="modal"
                        data-target="#EditSub"
                        style={{ height: 40, width: 100 }}
                        onClick={() => {
                          setDef(dateSelect);
                          console.log("test", dateSelect);
                          reset({
                            Class_IDE: dateSelect.data8
                          });
                        }}
                      >
                        <EditIcon />
                        &nbsp;???????????????&nbsp;
                      </button>
                    </td>
                    <td style={{ verticalAlign: "middle", width: 120 }}>
                      <button
                        type="button"
                        className="btn btn-danger"
                        style={{ height: 40, width: 100 }}
                        onClick={() => {
                          onDel({ Schedule_ID: dateSelect.data7 });
                        }}
                      >
                        <DeleteIcon />
                        &nbsp;??????
                      </button>
                    </td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          );
        }
      })(dateSelect)}

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
                        ???????????????????????????????????????
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
                          ??????????????????????????????????????????????????? :
                        </div>
                        <div className="col-sm-6 mt-2 mb-2 align-middle text-left">
                          <Controller
                            name="Class_IDE"
                            defaultValue={
                              Object.keys(def).length > 0 ? def.data8 : ""
                            }
                            control={control}
                            variant="outlined"
                            render={({ onChange, value }) => (
                              <select
                                className="form-control"
                                id="addSub"
                                onChange={onChange}
                                value={value}
                              >
                                <option value="" disabled="disabled">
                                  ????????????????????????????????????????????????????????????...
                                </option>
                                {sub.map((variable, index) => {
                                  return (
                                    <option
                                      key={index}
                                      value={variable.Class_ID}
                                    >
                                      {variable.Subject_ID}
                                      &nbsp;-&nbsp;
                                      {variable.Subject_NameTH}
                                      &nbsp;&nbsp;&nbsp; (??????????????????????????????&nbsp;
                                      {variable.Group_Study})
                                    </option>
                                  );
                                })}
                              </select>
                            )}
                          />
                        </div>
                        <div className="col-sm-4 mb-2 mt-2 align-middle text-right">
                          ????????????????????????????????? :
                        </div>
                        <div className="col-sm-6 mt-2 mb-2 align-middle text-left">
                          <Controller
                            name="DayE"
                            defaultValue={
                              Object.keys(def).length > 0 ? def.data9 : ""
                            }
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
                                  ????????????????????????????????????????????????...
                                </option>
                                <option value={0}>??????????????????????????????</option>
                                <option value={1}>???????????????????????????</option>
                                <option value={2}>???????????????????????????</option>
                                <option value={3}>??????????????????</option>
                                <option value={4}>?????????????????????????????????</option>
                                <option value={5}>????????????????????????</option>
                                <option value={6}>????????????????????????</option>
                              </select>
                            )}
                          />
                        </div>
                        <div className="col-sm-4 mb-2 mt-2 align-middle text-right">
                          <label>??????????????????????????? : </label>
                        </div>
                        <div className="col-sm-6 align-middle text-left">
                          <Controller
                            name="Start_TimeE"
                            defaultValue={
                              Object.keys(def).length > 0 ? def.data10 : ""
                            }
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
                                type="time"
                              />
                            )}
                          />
                        </div>
                        <div className="col-sm-4 mb-2 mt-2 align-middle text-right">
                          <label>????????????????????????????????? : </label>
                        </div>
                        <div className="col-sm-6 align-middle text-left">
                          <Controller
                            name="End_TimeE"
                            defaultValue={
                              Object.keys(def).length > 0 ? def.data11 : ""
                            }
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
                                type="time"
                              />
                            )}
                          />
                        </div>
                        <div className="col-sm-4 mb-2 mt-2 align-middle text-right">
                          <label>?????????????????????????????? : </label>
                        </div>
                        <div className="col-sm-6 mb-2 mt-2 align-middle text-left">
                          <div className={classes.d}>
                            <Controller
                              name="Subject_TypeE"
                              defaultValue={
                                Object.keys(def).length > 0 ? def.data6 : ""
                              }
                              control={control}
                              variant="outlined"
                              render={({ onChange, value }) => (
                                <select
                                  className="form-control"
                                  id="addSubType"
                                  onChange={onChange}
                                  value={value}
                                >
                                  <option value="" disabled="disabled">
                                    ????????????????????????????????????????????????????????????...
                                  </option>
                                  <option>???????????????</option>
                                  <option>?????????????????????</option>
                                </select>
                              )}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button type="submit" className="btn btn-warning">
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
                </form>
              );
            }
          })()}
        </div>
      </div>
    </TeacherTheme>
  );
}
