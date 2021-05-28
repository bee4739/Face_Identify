import React from "react";
import { useRouter } from "next/router";
import TeacherTheme from "../../../components/TeacherTheme";
import { makeStyles } from "@material-ui/core/styles";
import { useForm, Controller } from "react-hook-form";
import Link from "next/link";
import * as faceapi from "face-api.js";
import * as tf from "@tensorflow/tfjs";
import * as tmImage from "@teachablemachine/image";
import axios from "axios";
import { useState, useEffect } from "react";

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

export default function check(props) {
  const classes = useStyles();
  const router = useRouter();
  const { control, handleSubmit } = useForm();

  const [name, setName] = useState("");

  const [nameStd, setNameStd] = useState([]);
  const getNameStudent = data => {
    console.log(data);
    axios
      .post(
        `${props.env.api_url}/getNameStudent`,
        JSON.stringify({ Class_ID: data })
      )
      .then(value => {
        console.log(value.data);
        setNameStd(value.data.result);
        console.log("zzzz", value.data.result);
      })
      .catch(reason => {
        console.log(reason);
      });
  };

  const checkName = data => {
    data = { ...data, name: name };
    axios
      .post(
        `${props.env.api_url}/checkName`,
        JSON.stringify({ Schedule_ID: data })
      )
      .then(value => {
        console.log("ddd", value.data);
      })
      .catch(reason => {
        console.log(reason);
      });
    // alert("เพิ่มข้อมูลสำเร็จ");
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (params.get("Class_ID")) {
      getNameStudent(params.get("Class_ID"));
    } else {
      alert("ไม่พบข้อมูลห้อง");
      router.back();
    }

    if (params.get("Schedule_ID")) {
      checkName(params.get("Schedule_ID"));
    } else {
      alert("ไม่พบข้อมูลตารางสอน");
      router.back();
    }
    Webcam();
    checkName();
  }, []);

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
        { video: {} },
        stream => (video.srcObject = stream),
        err => console.error(err)
      );
    }
    video.addEventListener("play", () => {
      const canvas = faceapi.createCanvasFromMedia(video);
      document.body.append(canvas);
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
        console.log(detections);
        const resizedDetections = faceapi.resizeResults(
          detections,
          displaySize
        );
        canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
        if (labeledFaceDescriptors) {
          const faceMatcher = new faceapi.FaceMatcher(
            labeledFaceDescriptors,
            0.6
          );
          const results = resizedDetections.map(data =>
            faceMatcher.findBestMatch(data.descriptor)
          );
          results.forEach((result, i) => {
            const box = resizedDetections[i].detection.box;
            setName(result.toString());
            //const drawBox = new faceapi.draw.DrawBox(box, { label: result.toString() })
            //drawBox.draw(canvas)
          });
        }
      }, 100);
    });

    const loadLabeledImages = async () => {
      let listPathName = await axios.get(`${props.env.api_url}/getImageFile`);
      const labels = [...new Set(listPathName.data)];
      console.log(labels);
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
            descriptions.push(detections.descriptor);
          }
          return new faceapi.LabeledFaceDescriptors(label, descriptions);
        })
      );
    };
  }

  return (
    <TeacherTheme {...props}>
      <form className={classes.form}>
        <div>
          <center>
            <table class="table">
              <tr>
                <th width="50%">
                  <div>
                    <video
                      id="video"
                      height="500px"
                      width="500px"
                      autoPlay
                      muted
                    />
                  </div>
                </th>
                <td textAlign="right" width="50%">
                  <table class="table">
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
                            <td>Otto</td>
                            <td>{name}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </td>
              </tr>
            </table>
          </center>
          <div>
            <button type="button" className="btn btn-info">
              &nbsp;สรุปผลเช็คชื่อ&nbsp;
            </button>
          </div>
        </div>
      </form>
    </TeacherTheme>
  );
}
