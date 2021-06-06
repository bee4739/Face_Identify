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

  const checkName = async username => {
    setStdChecked(prev => {
      return typeof prev == "object"
        ? prev.filter(e => e == username).length > 0
          ? prev
          : [...new Set([`${username}`, ...prev])]
        : [`${username}`];
    });
  };

  useEffect(() => {
    Webcam();
  }, []);

  React.useEffect(() => {
    // API Check name
    const params = new URLSearchParams(window.location.search);
    let data = { username: `${JSON.stringify(stdChecked)}` };

    if (stdChecked.length > 0) {
      axios
        .post(
          `${props.env.api_url}/checkName`,
          JSON.stringify({
            ...data,
            Class_ID: params.get("Class_ID"),
            Schedule_ID: params.get("Schedule_ID")
          })
        )
        .then(value => {
          console.log(value);
          if (value.data.rowCount > 0) {
            setListStudent(value.data.result);
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
      <form>
        <div>
          <table class="table table-borderless">
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
              <td>
                <div className="text-right mb-3">
                  <button type="button" className="btn btn-info btn-sm">
                    &nbsp;สรุปผลเช็คชื่อ&nbsp;
                  </button>
                </div>

                <table class="table table-sm table-borderless">
                  <thead>
                    <tr>
                      <th>ชื่อ - นามสกุล</th>
                      <th>วัน / เวลา</th>
                      <th>สถานะ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {nameStd.map((variable, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            {variable.Std_FirstName}
                            &nbsp;&nbsp;
                            {variable.Std_LastName}
                          </td>
                          <td>
                            {(() => {
                              let std = listStudent.filter(
                                e => `${e.Username}` == `${variable.Username}`
                              );
                              if (std.length > 0) return std[0]["Time"];
                              else return "";
                            })()}
                          </td>
                          <td>
                            {stdChecked.indexOf(`${variable.Username}`) !=
                            -1 ? (
                              <CheckIcon />
                            ) : (
                              <ClearIcon />
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </td>
            </tr>
          </table>
        </div>
      </form>
    </TeacherTheme>
  );
}
