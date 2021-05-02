// https://stackoverflow.com/questions/13073647/crop-canvas-export-html5-canvas-with-certain-width-and-height
// https://stackoverflow.com/questions/26015497/how-to-resize-then-crop-an-image-with-canvas

import * as faceapi from "face-api.js";
import { useState, useEffect } from "react";

import React from "react";
import { useRouter } from "next/router";
import StudentTheme from "../../components/StudentTheme";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";

export default function student(props) {
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

  useEffect(() => {
    Webcam();
  }, []);

  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [w, setW] = useState(0);
  const [h, setH] = useState(0);
  const [enable, setEnable] = useState(true);

  const Webcam = () => {
    const video = document.getElementById("video");

    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
      faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
      faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
      faceapi.nets.faceExpressionNet.loadFromUri("/models")
    ]).then(() => {
      startVideo();
    });

    const startVideo = () => {
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
    };

    video.addEventListener("play", e => {
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
      username: props.userLogin.Username
    };

    axios
      .post(`${props.env.api_url}/createImage`, JSON.stringify(data))
      .then(value => {
        console.log(value.data);
      })
      .catch(reason => {
        console.log(reason);
      });
  };

  return (
    <StudentTheme {...props}>
      <div id="main" style={{ position: "relative", height: "320px" }}>
        <div style={{ position: "absolute", zIndex: "-1000" }}>
          <video id="video" height="300" width="300" autoPlay muted />
        </div>
        <div
          id="imageCrop"
          style={{ position: "absolute", zIndex: "1000" }}
        ></div>
      </div>
      <button
        id="takephoto"
        disabled={enable}
        onClick={() => takePhoto()}
        type="button"
        className="btn btn-primary btn-sm"
      >
        ถ่ายรูป
      </button>
    </StudentTheme>
  );
}
