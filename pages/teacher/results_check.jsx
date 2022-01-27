import React from "react";
import { useRouter } from "next/router";
import TeacherTheme from "../../components/TeacherTheme";
import { makeStyles } from "@material-ui/core/styles";
import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
// import '../node_modules/boostrap/dist/css/boostrap.min.css';
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import TextField from "@material-ui/core/TextField";

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
  // const [scoreTotal, setScoreTotal] = useState({});
  const [scoreSum, setScoreSum] = useState({});

  const [scoreLate, setScoreLate] = useState({});

  const [rsDate, setrsDate] = useState([]);
  const getrsDate = data => {
    axios
      .post(`${props.env.api_url}/rsDate`, JSON.stringify(data))
      .then(value => {
        setrsDate(value.data.result);
        console.log("ssss", value.data.result);
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
        console.log("ssss", value.data.result);
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
              <select
                className="form-control"
                onChange={e => {
                  setddYear(e.target.value);
                }}
                value={ddyear}
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
            {/* <div className="col-sm-5 mt-2 align-middle text-right">
              <label>กำหนดคะแนนมาสาย : </label>
            </div>
            <div className="col-sm-6 mt-2 mb-2 align-middle text-left">
              <select
                className="form-control"
                onChange={e => {
                  setScoreLate(e.target.value);
                }}
                defaultValue={scoreLate}
              >
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div> */}
          </div>
        </div>

        <div className={classes.button}>
          <button
            type="button"
            className="btn btn-success ml-2 mr-2 mb-4 mt-4 "
            onClick={() => {
              getrsStatus({ dds: ddsubject });
              getrsDate({ dds: ddsubject });
              getShowresulte({ dds: ddsubject });
            }}
          >
            ตกลง
          </button>
        </div>
      </form>

      <div className="col-sm-12  mt-4 align-middle">
        <table className="table table-hover align-middle text-center" id="ex">
          <thead>
            <tr style={{ height: "60px" }}>
              <th
                style={{
                  verticalAlign: "middle",
                  backgroundColor: "#DDDDDD"
                }}
              >
                ที่
              </th>
              <th
                style={{ verticalAlign: "middle", backgroundColor: "#DDDDDD" }}
              >
                รหัสนักศึกษา
              </th>
              <th
                style={{ verticalAlign: "middle", backgroundColor: "#DDDDDD" }}
              >
                ชื่อ-นามสกุล
              </th>
              {rsDate.map((variable, index) => {
                return (
                  <th
                    style={{
                      verticalAlign: "middle",
                      backgroundColor: "#DDDDDD"
                    }}
                  >
                    {variable.Date}
                  </th>
                );
              })}
              <th
                style={{
                  verticalAlign: "middle",
                  backgroundColor: "#DDDDDD"
                }}
              >
                รวม
              </th>
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
                  <td>{index + 1}</td>
                  <td>{variable.Std_ID}</td>
                  <td>
                    {variable.Std_Title}
                    {variable.Std_FirstName} {variable.Std_LastName}
                  </td>
                  {rsStatus.map((v, i) => {
                    if (i === rsStatus.length - 1) {
                      console.log(
                        `Sum : `,
                        tmpStd[index]?.reduce((a, b) => a + b, 0)
                      );
                      console.log("i", tmpcount[index].length);
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
                        <td>
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
                  <td>
                    {(tmpStd[index]?.reduce((a, b) => a + b, 0) * 100) /
                      (tmpcount[index].length * 10) /
                      10}
                  </td>
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
          filename="รายชื่อนักศึกษา"
          sheet="Sheet"
          buttonText="Export"
        />
      </div>
    </TeacherTheme>
  );
}
