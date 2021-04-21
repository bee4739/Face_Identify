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
  Month,
} from "@syncfusion/ej2-react-schedule";

// BigCalendar.momentLocalizer(moment);
import { useEffect, useState } from "react";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  button: {
    textAlign: "right",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
}));

export default function Teacher(props) {
  console.log(props.userLogin);

  const classes = useStyles();
  const router = useRouter();
  const { control, handleSubmit } = useForm();

  const [sub, setSub] = useState([]);
  const [dayList, setDayList] = useState([]);
  const [dateSelect, setDateSelect] = useState(null);
  const getDay = () => {
    axios
      .post(`${props.env.api_url}/getDay`)
      .then((value) => {
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
                Subject: e.Term,
                StartTime: new Date(i),
                EndTime: new Date(i),
                IsAllDay: true,
                Priority: "High",
                data: "hello",
              });
            }
          });

          setDayList(backup);
        } else {
          setDayList([]);
        }
      })
      .catch((reason) => {
        console.log(reason);
      });
  };

  const getSubject = (data) => {
    axios
      .post(`${props.env.api_url}/dropdownSubSchedule`, JSON.stringify(data))
      .then((value) => {
        setSub(value.data.result);
        console.log("ssss", value.data.result);
      })
      .catch((reason) => {
        console.log(reason);
      });
  };

  const onSubmit = (data) => {
    axios
      .post(`${props.env.api_url}/insertScheduleAttend`, JSON.stringify(data))
      .then((value) => {
        console.log(value.data);
      })
      .catch((reason) => {
        console.log(reason);
      });
    window.location.reload();
    alert("เพิ่มข้อมูลสำเร็จ");
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

  React.useEffect(() => {
    getSubject();
    getDay();
  }, []);

  return (
    <TeacherTheme {...props}>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.button}>
          <button
            type="button"
            className="btn btn-success"
            data-toggle="modal"
            data-target="#AddSub"
          >
            <AddIcon />
            เพิ่มตารางสอน
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
                  เพิ่มตารางสอน
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
                    วิชาและกลุ่มเรียน :
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
                            กรุณาเลือกกลุ่มเรียน...
                          </option>
                          {sub.map((variable, index) => {
                            return (
                              <option key={index} value={variable.Class_ID}>
                                {variable.Subject_ID}
                                &nbsp;-&nbsp;
                                {variable.Subject_NameTH}
                                &nbsp;&nbsp;&nbsp; (กลุ่มเรียน&nbsp;
                                {variable.Group_Study})
                              </option>
                            );
                          })}
                        </select>
                      )}
                    />
                  </div>
                  <div className="col-sm-4 mb-2 mt-2 align-middle text-right">
                    เลือกวันที่ :
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
                          id="addTerm"
                          onChange={onChange}
                          value={value}
                        >
                          <option value="" disabled="disabled">
                            กรุณาเลือกวันที่...
                          </option>
                          <option value={0}>วันอาทิตย์</option>
                          <option value={1}>วันจันทร์</option>
                          <option value={2}>วันอังคาร</option>
                          <option value={3}>วันพุธ</option>
                          <option value={4}>วันพฤหัสบดี</option>
                          <option value={5}>วันศุกร์</option>
                          <option value={6}>วันเสาร์</option>
                        </select>
                      )}
                    />
                  </div>
                  <div className="col-sm-4 mb-2 mt-2 align-middle text-right">
                    <label>เวลาเริ่ม : </label>
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
                    <label>เวลาสิ้นสุด : </label>
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
                    <label>ประเภทวิชา : </label>
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
                              กรุณาเลือกประเภทวิชา...
                            </option>
                            <option>ทฤษฎี</option>
                            <option>ปฏิบัติ</option>
                          </select>
                        )}
                      />
                    </div>
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

        <div className={classes.button}>
          <button
            type="button"
            className="btn btn-info mb-2 mt-2"
            data-toggle="modal"
            data-target="#compensate"
          >
            สอนชดเชย
          </button>
        </div>

        <div
          className="modal fade"
          id="compensate"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  สอนชดเชย
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
                    <label>เลือกวันที่ : </label>
                  </div>
                  <div className="col-sm-6 mb-2 mt-2 align-middle text-left">
                    <input type="date" className="form-control"></input>
                  </div>
                  <div className="col-sm-4 mb-2 mt-2 align-middle text-right">
                    <label>เวลาเริ่ม : </label>
                  </div>
                  <div className="col-sm-6 mb-2 mt-2 align-middle text-left">
                    <input type="time" className="form-control"></input>
                  </div>
                  <div className="col-sm-4 mb-2 mt-2 align-middle text-right">
                    <label>เวลาสิ้นสุด : </label>
                  </div>
                  <div className="col-sm-6 mb-2 mt-2 align-middle text-left">
                    <input type="time" className="form-control"></input>
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
                <button type="button" className="btn btn-success">
                  เพิ่ม
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="text-center">
          <Calendar />
        </div> */}
        <div>
          <ScheduleComponent
            // height="auto"
            currentView="Month"
            eventSettings={{
              dataSource: dayList,
            }}
            // rowAutoHeight={true}
            readonly={true}
            showQuickInfo={false}
            select={(e) => {
              setDateSelect(e.data);
            }}
          >
            <Inject services={[Day, Week, WorkWeek, Month]} />
          </ScheduleComponent>
        </div>
      </form>

      {((date) => {
        if (date) {
          return <div>{JSON.stringify(dateSelect)}</div>;
        }
      })(dateSelect)}
    </TeacherTheme>
  );
}
