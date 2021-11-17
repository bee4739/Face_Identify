import React from "react";
import { useRouter } from "next/router";
import TeacherTheme from "../../components/TeacherTheme";
import { makeStyles } from "@material-ui/core/styles";
import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
// import '../node_modules/boostrap/dist/css/boostrap.min.css';
import ReactHTMLTableToExcel from "react-html-table-to-excel";

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
  const { control, handleSubmit, handleChange } = useForm();
  const [ddyear, setddYear] = useState("");
  const [ddsubject, setddSubject] = useState("");

  const [year, setYear] = useState([]);
  const getYear = data => {
    axios
      .post(`${props.env.api_url}/resultcheck`, JSON.stringify(data))
      .then(value => {
        setYear(value.data.result);
        console.log("ssss", value.data.result);
      })
      .catch(reason => {
        console.log(reason);
      });
  };

  const [subject, setSubject] = useState([]);
  const getSubject = data => {
    axios
      .post(`${props.env.api_url}/resultchecksubject`, JSON.stringify(data))
      .then(value => {
        setSubject(value.data.result);
        console.log("ssss", value.data.result);
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
        console.log("ssss", value.data.result);
      })
      .catch(reason => {
        console.log(reason);
      });
  };

  React.useEffect(() => {
    getYear();
    getSubject();
    // getShowresulte();
  }, []);

  return (
    <TeacherTheme {...props}>
      <form
      //className={classes.form}
      //onSubmit={handleSubmit(getShowresulte)}
      >
        <div className={classes.form}>
          <div className="row">
            <div className="col-sm-5 mt-2 align-middle text-right">
              <label>ปีการศึกษา : </label>
            </div>
            <div className="col-sm-6 mt-2 mb-2 align-middle text-left">
              <Controller
                name="Year_ID"
                defaultValue=""
                control={control}
                variant="outlined"
                // onChange={setddYear(value)}
                render={({ onChange, value }) => (
                  <select
                    className="form-control"
                    onChange={onChange}
                    //onSelect={() => {
                    //  setddYear(value);
                    //}}
                    value={value}
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
                )}
              />
            </div>
            <div className="col-sm-5 mt-2 align-middle text-right">
              <label>วิชา : </label>
            </div>
            <div className="col-sm-6 mt-2 mb-2 align-middle text-left">
              <Controller
                name="Subject_ID"
                defaultValue=""
                control={control}
                variant="outlined"
                //onChange={setddSubject(value)}
                render={({ onChange, value }) => (
                  <select
                    className="form-control"
                    onChange={onChange}
                    //onSelect={() => {
                    //  setddSubject(value);
                    //}}
                    value={value}
                  >
                    <option value="" disabled="disabled">
                      กรุณาเลือกวิชา...
                    </option>
                    {subject.map((s, index) => {
                      return (
                        <option key={index} value={s.Subject_PK}>
                          {s.Subject_ID} - {s.Subject_NameTH} ({s.Group_Study})
                        </option>
                      );
                    })}
                  </select>
                )}
              />
            </div>
          </div>
        </div>
        <div className={classes.button}>
          <button
            type="submit"
            className="btn btn-success ml-2 mr-2 mb-4 mt-4 "
            data-toggle="modal"
            data-target="#AddSub"
          >
            ตกลง
          </button>
        </div>
      </form>

      <div className="col-sm-12  mt-4 align-middle">
        <table className="table table-striped align-middle text-center" id="ex">
          <thead>
            <tr style={{ height: "60px" }}>
              <th
                style={{ verticalAlign: "middle", backgroundColor: "#DDDDDD" }}
              >
                ชื่อ-นามสกุล
              </th>
              <th
                style={{ verticalAlign: "middle", backgroundColor: "#DDDDDD" }}
              >
                วันที่
              </th>
              <th
                style={{ verticalAlign: "middle", backgroundColor: "#DDDDDD" }}
              >
                สถานะ
              </th>
            </tr>
          </thead>
          <tbody>
            {showresulte.map((variable, index) => {
              return (
                <tr key={index}>
                  <td>
                    {variable.Std_Title}
                    {variable.Std_FirstName} {variable.Std_LastName}
                  </td>
                  <td>{variable.Date}</td>
                  <td>{variable.Status}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className={classes.button}>
        <ReactHTMLTableToExcel
          className="btn btn-info mt-4"
          table="ex"
          filename="Emp"
          sheet="Sheet"
          buttonText="Export"
        />
      </div>
    </TeacherTheme>
  );
}
