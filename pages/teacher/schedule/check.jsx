import React from "react";
import { useRouter } from "next/router";
import TeacherTheme from "../../../components/TeacherTheme";
import { makeStyles } from "@material-ui/core/styles";
import { useForm, Controller } from "react-hook-form";
import * as faceapi from "face-api.js";
import axios from "axios";
import { useState, useEffect } from "react";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import Swal from "sweetalert2";
import Link from "next/link";

const useStyles = makeStyles(theme => ({
  form: {
    marginTop: theme.spacing(1),
    alignItems: "center",
    textAlign: "center"
  },
  cam: {
    marginTop: theme.spacing(1),
    alignItems: "left",
    textAlign: "left"
  }
}));

async function delay(ms) {
  return await new Promise(resolve => setTimeout(resolve, ms));
}

export default function check(props) {
  const classes = useStyles();
  const router = useRouter();
  const { control, handleSubmit } = useForm();
  const [nameStd, setNameStd] = useState([]);
  const [stdChecked, setStdChecked] = useState([]);
  const [listStudent, setListStudent] = useState([]);
  const [time, setTime] = useState("");
  var [a] = "";
  const [start_Time, setStart_Time] = useState("");
  const [end_Time, setEnd_Time] = useState("");

  const [summarySub, setSummarySub] = useState([]);
  const getSummarySub = data => {
    const params = new URLSearchParams(window.location.search);

    axios
      .post(
        `${props.env.api_url}/getSummarySub`,
        JSON.stringify({
          ...data,
          Class_ID: params.get("Class_ID"),
          Schedule_ID: params.get("Schedule_ID")
        })
      )
      .then(value => {
        console.log("summarySub", value.data.result);
        setSummarySub(value.data.result);
      })
      .catch(reason => {
        console.log(reason);
      });
  };

  const [summary, setSummary] = useState([]);
  const getSummary = data => {
    const params = new URLSearchParams(window.location.search);

    var n = Date.now();
    var date_now = new Date(n);
    var dd = "";
    if (date_now.getMonth() + 1 < 10 && date_now.getDate() < 10) {
      dd =
        date_now.getFullYear() +
        "-0" +
        (date_now.getMonth() + 1) +
        "-0" +
        date_now.getDate();
    } else if (date_now.getMonth() + 1 < 10) {
      dd =
        date_now.getFullYear() +
        "-0" +
        (date_now.getMonth() + 1) +
        "-" +
        date_now.getDate();
    } else if (date_now.getDate() < 10) {
      dd =
        date_now.getFullYear() +
        "-" +
        (date_now.getMonth() + 1) +
        "-0" +
        date_now.getDate();
    } else {
      dd =
        date_now.getFullYear() +
        "-" +
        (date_now.getMonth() + 1) +
        "-" +
        date_now.getDate();
    }
    console.log("dd", dd);

    axios
      .post(
        `${props.env.api_url}/getSummary`,
        JSON.stringify({
          ...data,
          Class_ID: params.get("Class_ID"),
          Schedule_ID: params.get("Schedule_ID"),
          date: dd
        })
      )
      .then(value => {
        console.log("summary", value.data.result);
        setSummary(value.data.result);
      })
      .catch(reason => {
        console.log(reason);
      });
  };

  const [timeCheck, setTimeCheck] = useState([]);
  const getTimeCheck = data => {
    const params = new URLSearchParams(window.location.search);

    axios
      .post(
        `${props.env.api_url}/getTimeCheck`,
        JSON.stringify({
          ...data,
          Class_ID: params.get("Class_ID"),
          Schedule_ID: params.get("Schedule_ID")
        })
      )
      .then(value => {
        console.log("setTimeCheck", value.data.result);
        setTimeCheck(value.data.result);
      })
      .catch(reason => {
        console.log(reason);
      });
  };

  const checkName = async username => {
    setStdChecked(prev => {
      return typeof prev == "object"
        ? prev.filter(e => e == username).length > 0
          ? prev
          : [...new Set([`${username}`, ...prev])]
        : [`${username}`];
    });
  };

  const hmsTime = times => {
    var n = Date.now();
    var date_now = new Date(n);

    if (times == "0") {
      var hms =
        date_now.getFullYear.toString() +
        "-" +
        (date_now.getMonth() + 1).toString() +
        "-" +
        date_now.getDate().toString() +
        " ";
      var hms_time = new Date(hms);
    } else {
      var hms =
        date_now.getFullYear.toString() +
        "-" +
        (date_now.getMonth() + 1).toString() +
        "-" +
        date_now.getDate().toString() +
        " ";
      var hms_time = new Date(hms + times);
    }
    return hms_time;
  };

  const hhmms = hhmm => {
    var d_hms = -1.0;

    if (hhmm.getMinutes() < 10) {
      var s_now =
        hhmm.getHours().toString() + ".0" + hhmm.getMinutes().toString();
      d_hms = parseFloat(s_now).toFixed(2);
    } else {
      var s_now =
        hhmm.getHours().toString() + "." + hhmm.getMinutes().toString();
      d_hms = parseFloat(s_now).toFixed(2);
    }
    // console.log("hms", d_hms);
    return d_hms;
  };

  useEffect(() => {
    const gettime = data => {
      const params = new URLSearchParams(window.location.search);
      axios
        .post(
          `${props.env.api_url}/gettime`,
          JSON.stringify({
            ...data,
            Class_ID: params.get("Class_ID"),
            Schedule_ID: params.get("Schedule_ID")
          })
        )
        .then(value => {
          console.log("getTime", value.data.result);
          // setDatatime(value.data.result);
          [a] = value.data.result;

          // alert(a.Start_Time);
          // alert(a.End_Time);
          setStart_Time(a.Start_Time);
          setEnd_Time(a.End_Time);
          // alert(datatime);
        })
        .catch(reason => {
          console.log(reason);
        });
    };

    (async () => {
      const { value: lateTime } = await Swal.fire({
        title: "กรุณากำหนดเวลามาสาย",
        html:
          '<center><input id="input-lateTime" class="swal2-input" type="time" style="width:200px"></center>',
        focusConfirm: false,
        confirmButtonText: `ตกลง`,
        preConfirm: () => {
          return [document.getElementById("input-lateTime").value];
        }
      });

      var n = Date.now();
      var date_now = new Date(n);

      var selectTime = hmsTime(lateTime);
      var endTime = hmsTime(end_Time);
      // var currentTime = hmsTime("date_now");

      var selectTimes = hhmms(selectTime);
      var currentTimes = hhmms(date_now);
      var endTimes = hhmms(endTime);

      console.log(hhmms(date_now));
      console.log(hhmms(selectTime));
      console.log(endTimes);

      if (selectTimes < currentTimes) {
        Swal.fire({
          icon: "error",
          title: "เวลาไม่ถูกต้อง!",
          text: "กรุณากำหนดเวลาใหม่",
          confirmButtonText: `ตกลง`
        }).then(() => {
          window.location.reload();
        });
      } else if (endTimes < selectTimes) {
        Swal.fire({
          icon: "error",
          title: "เวลาไม่ถูกต้อง!",
          text: "กรุณากำหนดเวลาใหม่",
          confirmButtonText: `ตกลง`
        }).then(() => {
          window.location.reload();
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "เวลาที่เข้าสายคือ" + " : " + lateTime + " " + "น.",
          // text: lateTime,
          confirmButtonText: `ตกลง`
        }).then(() => {
          setTime(lateTime);
          Webcam();
        });
      }

      // if (lateTime) {
      //   Swal.fire("เวลาที่เข้าสายคือ" + "\n" + lateTime).then(() => {
      //     setTime(lateTime);
      //     Webcam();
      //   });
      // }
    })();

    gettime();

    getSummarySub();
    getSummary();
    getTimeCheck();
  }, [end_Time]);
  // console.log(time);

  useEffect(() => {
    // API Check name
    const params = new URLSearchParams(window.location.search);
    let data = { username: `${JSON.stringify(stdChecked)}` };
    console.log(start_Time);

    //if status
    var n = Date.now();
    var date_now = new Date(n);

    console.log("date_now", date_now);

    var hms =
      date_now.getFullYear.toString() +
      "-" +
      (date_now.getMonth() + 1).toString() +
      "-" +
      date_now.getDate().toString() +
      " ";

    var start_time = new Date(hms + start_Time);
    var end_time = new Date(hms + end_Time);
    var late_time = new Date(hms + time);

    console.log("start_time", start_time);
    console.log("end_time", end_time);
    var d_now = -1.0;
    var d_start = -1.0;
    var d_end = -1.0;
    var d_late = -1.0;

    if (date_now.getMinutes() < 10) {
      var s_now =
        date_now.getHours().toString() +
        ".0" +
        date_now.getMinutes().toString();
      d_now = parseFloat(s_now).toFixed(2);
    } else {
      var s_now =
        date_now.getHours().toString() + "." + date_now.getMinutes().toString();
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
        end_time.getHours().toString() + "." + end_time.getMinutes().toString();
      d_end = parseFloat(s_end).toFixed(2);
    }

    if (date_now.getMinutes() < 10) {
      var s_late =
        late_time.getHours().toString() +
        ".0" +
        late_time.getMinutes().toString();
      d_late = parseFloat(s_late).toFixed(2);
    } else {
      var s_late =
        late_time.getHours().toString() +
        "." +
        late_time.getMinutes().toString();
      d_late = parseFloat(s_late).toFixed(2);
    }

    console.log("now", d_now);
    console.log("start", d_start);
    console.log("end", d_end);
    console.log("late", d_late);

    var checkstatus = "";
    if (d_late <= d_now && d_now <= d_end) {
      checkstatus = "สาย";
    } else {
      checkstatus = "ปกติ";
    }

    if (stdChecked.length > 0) {
      axios
        .post(
          `${props.env.api_url}/checkName`,
          JSON.stringify({
            ...data,
            Class_ID: params.get("Class_ID"),
            Schedule_ID: params.get("Schedule_ID"),
            Status: checkstatus
          })
        )
        .then(value => {
          console.log(value);
          if (value.data.rowCount > 0) {
            Swal.fire({
              title: "บันทึกการเข้าเรียนสำเร็จ!",
              text: "",
              icon: "success",
              showConfirmButton: false,
              timer: 1000
            });
            setListStudent(value.data.result);
            console.log("setListStudent", value.data.result);
          }
        })
        .catch(reason => {
          console.log(reason);
        });
    }
  }, [stdChecked]);

  async function Webcam() {
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri(
        `${props.env.basePath}/static/models`
      ),
      faceapi.nets.faceLandmark68Net.loadFromUri(
        `${props.env.basePath}/static/models`
      ),
      faceapi.nets.faceRecognitionNet.loadFromUri(
        `${props.env.basePath}/static/models`
      ),
      faceapi.nets.ssdMobilenetv1.loadFromUri(
        `${props.env.basePath}/static/models`
      )
    ]).then(startVideo);
    const video = document.getElementById("video");
    function startVideo() {
      navigator.getUserMedia(
        {
          video: {
            width: 300,
            height: 300
          }
        },
        stream => (video.srcObject = stream),
        err => console.error(err)
      );
    }
    video.addEventListener("play", () => {
      const canvas = faceapi.createCanvasFromMedia(video);
      window.document.getElementById("canvasCreate").append(canvas);
      const displaySize = { width: video.width, height: video.height };
      faceapi.matchDimensions(canvas, displaySize);

      let labeledFaceDescriptors;
      (async () => {
        labeledFaceDescriptors = await loadLabeledImages();
      })();

      setInterval(async () => {
        const detections = await faceapi
          .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceDescriptors();
        // console.log(detections);
        const resizedDetections = faceapi.resizeResults(
          detections,
          displaySize
        );

        let username = null;

        canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
        if (labeledFaceDescriptors) {
          const faceMatcher = new faceapi.FaceMatcher(
            labeledFaceDescriptors,
            0.5
          );
          const results = resizedDetections.map(data =>
            faceMatcher.findBestMatch(data.descriptor)
          );

          if (resizedDetections[0]) {
            username = results[0].toString().split(/[ ,]+/)[0];

            if (username !== "unknown") {
              const box = resizedDetections[0].detection.box;
              const drawBox = new faceapi.draw.DrawBox(box, {
                label: `${username}`
              });
              drawBox.draw(canvas);
              checkName(username);
            } else {
              username = null;
              const box = resizedDetections[0].detection.box;
              const drawBox = new faceapi.draw.DrawBox(box, {
                label: "unknown"
              });
              drawBox.draw(canvas);
            }
          }
        }
      }, 100);
    });

    const loadLabeledImages = async () => {
      let listPathName = [];
      const params = new URLSearchParams(window.location.search);

      if (params.get("Class_ID")) {
        if (params.get("Schedule_ID")) {
          listPathName = await axios.post(
            `${props.env.api_url}/getNameStudent`,
            JSON.stringify({
              Class_ID: params.get("Class_ID"),
              Schedule_ID: params.get("Schedule_ID")
            })
          );
          setNameStd(listPathName.data.result);
        } else {
          alert("ไม่พบข้อมูลตารางสอน");
          router.back();
        }
      } else {
        alert("ไม่พบข้อมูลห้อง");
        router.back();
      }

      const labels = [
        ...new Set(listPathName.data.result.map(e => e.Username))
      ];

      return Promise.all(
        labels.map(async label => {
          const descriptions = [];
          for (let i = 1; i <= 7; i++) {
            const img = await faceapi.fetchImage(
              `${props.env.imageStudentPath}/${label}/${i}.jpg`
            );
            const detections = await faceapi
              .detectSingleFace(img)
              .withFaceLandmarks()
              .withFaceDescriptor();
            if (detections) descriptions.push(detections.descriptor);
          }
          return new faceapi.LabeledFaceDescriptors(label, descriptions);
        })
      );
    };
  }

  return (
    <TeacherTheme {...props}>
      <div>
        <table class="table table-borderless" style={{ width: "100%" }}>
          <tr>
            <th style={{ minWidth: "300px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "300px"
                }}
              >
                <div
                  style={{
                    position: "relative",
                    maxWidth: "300px",
                    maxHeight: "300px"
                  }}
                ></div>
                <div
                  style={{
                    position: "absolute",
                    zIndex: "1000"
                  }}
                >
                  <video
                    id="video"
                    height="300px"
                    width="300px"
                    autoPlay
                    muted
                  />
                </div>
                <div
                  id={`canvasCreate`}
                  style={{
                    position: "absolute",
                    zIndex: "20000",
                    width: "300px",
                    height: "300px"
                  }}
                ></div>
              </div>
            </th>
            <td style={{ width: "50%" }}>
              {/* <Link href="/teacher/summaryCheck/"> </Link> */}
              <div className="text-right mb-3">
                <button
                  type="button"
                  className="btn btn-info btn-sm"
                  data-toggle="modal"
                  data-target="#summarycheck"
                  //    onClick={() => {
                  //   insertCompensate({ Schedule_ID: schedule.data7 });
                  // }}
                >
                  สรุปผลเช็คชื่อ
                </button>
              </div>

              <form>
                <table
                  class="table table-sm table-hover"
                  style={{ width: "100%" }}
                >
                  <thead>
                    <tr>
                      <th
                        style={{
                          width: "5%",
                          textAlign: "center",
                          verticalAlign: "middle",
                          backgroundColor: "#DDDDDD"
                        }}
                      >
                        ลำดับ
                      </th>
                      <th
                        style={{
                          width: "50%",
                          textAlign: "center",
                          verticalAlign: "middle",
                          backgroundColor: "#DDDDDD"
                        }}
                      >
                        ชื่อ - นามสกุล
                      </th>
                      <th
                        style={{
                          width: "40%",
                          textAlign: "center",
                          verticalAlign: "middle",
                          backgroundColor: "#DDDDDD"
                        }}
                      >
                        วัน / เวลา
                      </th>
                      <th
                        style={{
                          width: "5%",
                          textAlign: "center",
                          verticalAlign: "middle",
                          backgroundColor: "#DDDDDD"
                        }}
                      >
                        สถานะ
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {nameStd.map((variable, index) => {
                      return (
                        <tr key={index}>
                          <td
                            style={{
                              textAlign: "center",
                              verticalAlign: "middle"
                            }}
                          >
                            {index + 1}
                          </td>
                          <td
                            style={{
                              verticalAlign: "middle"
                            }}
                          >
                            {variable.Std_Title}
                            {variable.Std_FirstName} {variable.Std_LastName}
                          </td>
                          <td
                            style={{
                              verticalAlign: "middle"
                            }}
                          >
                            {(() => {
                              let std = listStudent.filter(
                                e => `${e.Username}` == `${variable.Username}`
                              );
                              if (std.length > 0) {
                                return std[0]["Time"];
                              } else {
                                let tc = timeCheck.filter(
                                  e => `${e.Username}` == `${variable.Username}`
                                );
                                if (tc.length > 0) return tc[0]["Time"];
                                else return "";
                              }
                            })()}
                          </td>
                          <td
                            style={{
                              textAlign: "center",
                              verticalAlign: "middle"
                            }}
                          >
                            {(() => {
                              let std = listStudent.filter(
                                e => `${e.Username}` == `${variable.Username}`
                              );
                              if (std.length > 0) {
                                return <CheckIcon />;
                              } else {
                                let tc = timeCheck.filter(
                                  e => `${e.Username}` == `${variable.Username}`
                                );
                                if (tc.length > 0) return <CheckIcon />;
                                else return <ClearIcon />;
                              }
                            })()}
                            {/* {stdChecked.indexOf(`${variable.Username}`) !=
                            -1 ? (
                              <CheckIcon />
                            ) : (
                              <ClearIcon />
                            )} */}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </form>
            </td>
          </tr>
        </table>

        <div
          class="modal fade"
          id="summarycheck"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  สรุปผลเช็คชื่อ
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
                <center>
                  <table
                    className="table table-striped align-middle text-center"
                    style={{ width: "100%" }}
                  >
                    <thead>
                      <tr>
                        <th
                          style={{ width: "5%", backgroundColor: "#F7D9D9" }}
                        ></th>
                        <th style={{ backgroundColor: "#F7D9D9" }}>
                          ข้อมูลรายวิชา
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {summarySub.map((variable, index) => {
                        return (
                          <tr
                            key={variable.Schedule_ID}
                            style={{ backgroundColor: "#F9F3F3" }}
                          >
                            <td style={{ width: "5%" }}></td>
                            <td style={{ textAlign: "left" }}>
                              รหัสวิชา : {variable.Subject_ID}
                              <br />
                              ชื่อวิชา : {variable.Subject_NameTH}
                              <br />
                              กลุ่มเรียน : {variable.Group_Study}
                              <br />
                              ประเภทวิชา : {variable.Subject_Type}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>

                  <table
                    className="table table-hover align-middle text-center"
                    style={{ width: "100%" }}
                  >
                    <thead className="">
                      <tr>
                        <th
                          style={{
                            verticalAlign: "middle",
                            backgroundColor: "#DDDDDD",
                            width: "5%"
                          }}
                        >
                          ลำดับ
                        </th>
                        <th
                          style={{
                            verticalAlign: "middle",
                            backgroundColor: "#DDDDDD",
                            width: "55%"
                          }}
                        >
                          ชื่อ - นามสกุล
                        </th>
                        <th
                          style={{
                            verticalAlign: "middle",
                            backgroundColor: "#DDDDDD",
                            width: "35%"
                          }}
                        >
                          วัน - เวลา
                        </th>
                        <th
                          style={{
                            verticalAlign: "middle",
                            backgroundColor: "#DDDDDD",
                            width: "5%"
                          }}
                        >
                          สถานะ
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {summary.map((variable, index) => {
                        return (
                          <tr>
                            <td
                              style={{
                                verticalAlign: "middle"
                              }}
                            >
                              {index + 1}
                            </td>
                            <td
                              style={{
                                verticalAlign: "middle",
                                textAlign: "left"
                              }}
                            >
                              {variable.Std_Title}
                              {variable.Std_FirstName} {variable.Std_LastName}
                            </td>
                            <td
                              style={{
                                verticalAlign: "middle"
                              }}
                            >
                              {variable.Time == null ? "-" : variable.Time}
                            </td>
                            <td
                              style={{
                                verticalAlign: "middle"
                              }}
                            >
                              {variable.Status == null
                                ? "ขาด"
                                : variable.Status}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </center>
              </div>
              <div class="modal-footer">
                <button type="button" className="btn btn-success">
                  บันทึก
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  ปิด
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TeacherTheme>
  );
}
