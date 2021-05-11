// https://stackoverflow.com/questions/13073647/crop-canvas-export-html5-canvas-with-certain-width-and-height
// https://stackoverflow.com/questions/26015497/how-to-resize-then-crop-an-image-with-canvas

import * as faceapi from "face-api.js";
import { useState, useEffect } from "react";
import React from "react";
import { useRouter } from "next/router";
import StudentTheme from "../../components/StudentTheme";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import zIndex from "@material-ui/core/styles/zIndex";
import Swal from "sweetalert2";

const useStyles = makeStyles((theme) => ({
  videoTake: {
    marginLeft: "350px",
  },
  buttonTake: {
    marginLeft: "480px",
  },
  tableImg: {
    alignItems: "center",
    textAlign: "left",
  },
}));

let imageListArr = [];

export default function student(props) {
  const classes = useStyles();
  const router = useRouter();
  const { control, handleSubmit } = useForm();
  const [listImg, setListImg] = useState([]);

  useEffect(() => {
    Webcam();
    for (let i = 1; i < 8; i++) {
      imageListArr.push({
        src: `${props.env.imageStudentPath}/${props.userLogin.Username}/${i}.jpg`,
        index: i,
      });
    }
    setListImg(imageListArr);
  }, []);

  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [w, setW] = useState(0);
  const [h, setH] = useState(0);
  const [enable, setEnable] = useState(true);

  const Webcam = () => {
    const video = document.getElementById("video");

    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri(`${props.env.basePath}/models`),
      faceapi.nets.faceLandmark68Net.loadFromUri(
        `${props.env.basePath}/models`
      ),
      faceapi.nets.faceRecognitionNet.loadFromUri(
        `${props.env.basePath}/models`
      ),
      faceapi.nets.faceExpressionNet.loadFromUri(
        `${props.env.basePath}/models`
      ),
    ]).then(() => {
      startVideo();
    });

    const startVideo = () => {
      navigator.getUserMedia(
        {
          video: {
            width: 300,
            height: 300,
          },
        },
        (stream) => (video.srcObject = stream),
        (err) => console.error(err)
      );
    };

    video.addEventListener("play", (e) => {
      e.preventDefault();
      if (document.getElementById("imageCropPreview") === null) {
        const canvas = faceapi.createCanvasFromMedia(video);
        canvas.id = "imageCropPreview";
        document.getElementById("imageCrop").appendChild(canvas);
        const displaySize = { width: 300, height: 300 };
        faceapi.matchDimensions(canvas, displaySize);
        setInterval(async () => {
          const detections = await faceapi
            .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks()
            .withFaceExpressions();
          const resizedDetections = faceapi.resizeResults(
            detections,
            displaySize
          );
          canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
          canvas.getContext("2d").drawImage(video, 0, 0);
          faceapi.draw.drawDetections(canvas, resizedDetections);
          // faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
          if (resizedDetections[0] !== undefined) {
            // console.log(resizedDetections[0]["detection"]["_box"]);
            setX(
              resizedDetections[0]["detection"]["_box"]["_x"] > 39
                ? resizedDetections[0]["detection"]["_box"]["_x"] - 40
                : 0
            );
            setY(
              resizedDetections[0]["detection"]["_box"]["_y"] > 59
                ? resizedDetections[0]["detection"]["_box"]["_y"] - 60
                : 0
            );
            setW(resizedDetections[0]["detection"]["_box"]["_width"] + 80);
            setH(resizedDetections[0]["detection"]["_box"]["_height"] + 80);
            var x = resizedDetections[0]["detection"]["_score"];
            if (x >= 0.8) {
              setEnable(false);
            }
          } else {
            setEnable(true);
          }
        }, 100);
      }
    });
  };

  const takePhoto = async () => {
    var canvas = document.getElementById("video");
    var tempCanvas = document.createElement("canvas"),
      tCtx = tempCanvas.getContext("2d");
    tempCanvas.width = w;
    tempCanvas.height = h;
    tCtx.drawImage(canvas, x, y, w, h, 0, 0, w, h);
    // tempCanvas.toDataURL("image/jpeg")
    let data = {
      image: tempCanvas.toDataURL("image/jpeg"),
      username: props.userLogin.Username,
    };

    axios
      .post(`${props.env.api_url}/createImage`, JSON.stringify(data))
      .then((value) => {
        console.log(value.data);
        if (value.data.success) {
          Swal.fire({
            title: "บันทึกรูปสำเร็จ",
            text: "",
            icon: "success",
            showConfirmButton: false,
          });
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      })
      .catch((reason) => {
        console.log(reason);
      });
  };

  const onDel = (data) => {
    data = { imageName: `${data}.jpg`, username: props.userLogin.Username };
    Swal.fire({
      title: "ยืนยันการลบ?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ตกลง",
      cancelButtonText: "ยกเลิก",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("hello");
        axios
          .post(
            `${props.env.api_url}/delImageinformation`,
            JSON.stringify(data)
          )
          .then((value) => {
            console.log(value.data);
            if (value.data.success) {
              Swal.fire({
                title: "ลบสำเร็จ!",
                text: "",
                icon: "success",
                showConfirmButton: false,
              });
              setTimeout(() => {
                window.location.reload();
              }, 1000);
            }
          })
          .catch((reason) => {
            console.log(reason);
          });
      }
    });
  };

  return (
    <StudentTheme {...props}>
      <div className={classes.videoTake}>
        <div id="main" style={{ position: "relative", height: "320px" }}>
          <div
            style={{
              position: "absolute",
              zIndex: "-1000",
            }}
          >
            <video id="video" height="300" width="300" autoPlay muted />
          </div>
          <div
            id="imageCrop"
            style={{ position: "absolute", zIndex: "1000" }}
          ></div>
        </div>
      </div>
      <div className={classes.buttonTake}>
        <div>
          <button
            id="takephoto"
            disabled={enable}
            onClick={() => takePhoto()}
            type="button"
            className="btn btn-primary btn-sm mb-4"
          >
            ถ่ายรูป
          </button>
        </div>
      </div>

      <div className={classes.tableImg}>
        <table className="table">
          <tbody>
            <tr>
              {listImg.map((e, i) => {
                return (
                  <td key={i}>
                    <div
                      style={{
                        width: "100px",
                        height: "100px",
                        overflow: "hidden",
                        boxShadow:
                          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                      }}
                      key={i}
                    >
                      <div
                        style={{
                          position: "relative",
                        }}
                        key={i}
                        onMouseOver={() => {
                          window.$(`#btnImageDel${i}`).css("display", "block");
                        }}
                        onMouseLeave={() => {
                          window.$(`.btnImageDel`).css("display", "none");
                        }}
                      >
                        <img
                          src={e.src}
                          key={i}
                          alt={`ยังไม่ถ่ายรูปที่ ${e.index}`}
                          width={"105px"}
                          style={{ position: "absolute", zIndex: "100" }}
                        />
                        <button
                          type="button"
                          className="btn btn-light btn-sm text-danger btnImageDel"
                          onClick={() => onDel(e.index)}
                          id={`btnImageDel${i}`}
                          style={{
                            position: "absolute",
                            right: 5,
                            top: 65,
                            zIndex: "200",
                            padding: "3px 5px",
                            display: "none",
                          }}
                        >
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </div>
                    </div>
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>
    </StudentTheme>
  );
}
