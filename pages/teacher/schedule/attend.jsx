import React from "react";
import { useRouter } from "next/router";
import TeacherTheme from "../../../components/TeacherTheme";
import { makeStyles } from "@material-ui/core/styles";
import { useForm, Controller } from "react-hook-form";
import AddIcon from "@material-ui/icons/Add";
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

const useStyles = makeStyles(theme => ({
  button: {
    textAlign: "right"
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  }
}));

export default function Teacher(props) {
  const classes = useStyles();
  const router = useRouter();
  const { control, handleSubmit } = useForm();

  const onSubmit = data => {
    axios
      .post(`${props.env.api_url}/login`, JSON.stringify(data))
      .then(value => {
        console.log(value.data);
        if (value.data.success) {
          props.setUserLogin(value.data.data);
          router.replace("/");
        } else {
          alert(value.data.message);
        }
      })
      .catch(reason => {
        console.log(reason);
      });
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

  React.useEffect(() => {}, []);

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
                  <div className="col-sm-6 mb-2 mt-2 align-middle text-left">
                    <div className={classes.d}>
                      <select class="form-control form-control-sm">
                        <option>เลือกวิชาและกลุ่มเรียน</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-sm-4 mb-2 mt-2 align-middle text-right">
                    เลือกวันที่ :
                  </div>
                  <div className="col-sm-6 mb-2 mt-2 align-middle text-left">
                    <div className={classes.d}>
                      <select class="form-control form-control-sm">
                        <option>เลือกวันที่</option>
                        <option>วันจันทร์</option>
                        <option>วันอังคาร</option>
                        <option>วันพุธ</option>
                        <option>วันพฤหัสบดี</option>
                        <option>วันศุกร์</option>
                        <option>วันเสาร์</option>
                        <option>วันอาทิตย์</option>
                      </select>
                    </div>
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
                  <div className="col-sm-4 mb-2 mt-2 align-middle text-right">
                    <label>ประเภทวิชา : </label>
                  </div>
                  <div className="col-sm-6 mb-2 mt-2 align-middle text-left">
                    <input type="text" className="form-control"></input>
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
          // currentView="Month"
          // eventSettings={{ dataSource: this.state.data }}
          // rowAutoHeight={true}
          >
            <Inject services={[Day, Week, WorkWeek, Month]} />
          </ScheduleComponent>
        </div>
      </form>
    </TeacherTheme>
  );
}
