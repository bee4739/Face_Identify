import React from "react";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import { useForm, Controller } from "react-hook-form";
import AdminTheme from "../../components/AdminTheme";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import { useEffect, useState } from "react";

const useStyles = makeStyles(theme => ({
  button: {
    textAlign: "right"
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  }
}));

export default function Admin(props) {
  const classes = useStyles();
  const router = useRouter();
  const { control, handleSubmit } = useForm();

  const onSubmit = data => {
    axios
      .post(`${props.env.api_url}/insertSubject`, JSON.stringify(data))
      .then(value => {
        console.log(value.data);
      })
      .catch(reason => {
        console.log(reason);
      });
    window.location.reload();
  };

  const [data, setData] = useState([]);
  const getData = async () => {
    try {
      const resp = await axios.post(
        "http://localhost/face_identify/api/index.php/getSubject"
      );
      console.log(resp.data.result);
      setData(resp.data.result);
    } catch (error) {}
  };

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <AdminTheme {...props}>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.button}>
          <button
            type="button"
            className="btn btn-success"
            data-toggle="modal"
            data-target="#AddSub"
          >
            <AddIcon />
            เพิ่มรายวิชา
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
                  เพิ่มรายวิชา
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
                  <div className="col-sm-4 mb-2 mt-3 align-middle text-right">
                    <label>รหัสวิชา : </label>
                  </div>
                  <div className="col-sm-7 mb-2 align-middle text-left">
                    <Controller
                      name="Subject_ID"
                      control={control}
                      defaultValue=""
                      render={({ onChange, value }) => (
                        <TextField
                          variant="outlined"
                          size="small"
                          margin="normal"
                          required
                          fullWidth
                          label="รหัสวิชา"
                          onChange={onChange}
                          value={value}
                          type="text"
                        />
                      )}
                    />
                  </div>
                  <div className="col-sm-4 mb-2 mt-3 align-middle text-right">
                    <label>ชื่อวิชาภาษาไทย : </label>
                  </div>
                  <div className="col-sm-7 mb-2 align-middle text-left">
                    <Controller
                      name="Subject_NameTH"
                      control={control}
                      defaultValue=""
                      render={({ onChange, value }) => (
                        <TextField
                          variant="outlined"
                          size="small"
                          margin="normal"
                          required
                          fullWidth
                          label="ชื่อวิชาภาษาไทย"
                          onChange={onChange}
                          value={value}
                          type="text"
                        />
                      )}
                    />
                  </div>
                  <div className="col-sm-4 mb-2 mt-3 align-middle text-right">
                    <label>ชื่อวิชาภาษาอังกฤษ : </label>
                  </div>
                  <div className="col-sm-7 mb-2 align-middle text-left">
                    <Controller
                      name="Subject_NameEN"
                      control={control}
                      defaultValue=""
                      render={({ onChange, value }) => (
                        <TextField
                          variant="outlined"
                          size="small"
                          margin="normal"
                          required
                          fullWidth
                          label="ชื่อวิชาภาษาอังกฤษ"
                          onChange={onChange}
                          value={value}
                          type="text"
                        />
                      )}
                    />
                  </div>
                  <div className="col-sm-4 mb-2 mt-3 align-middle text-right">
                    <label>วิชาทฤษฎี : </label>
                  </div>
                  <div className="col-sm-7 mb-2 align-middle text-left">
                    <Controller
                      name="Subject_Theory"
                      control={control}
                      defaultValue=""
                      render={({ onChange, value }) => (
                        <TextField
                          variant="outlined"
                          size="small"
                          margin="normal"
                          required
                          fullWidth
                          label="จำนวนชั่วโมงวิชาทฤษฎี"
                          onChange={onChange}
                          value={value}
                          type="text"
                        />
                      )}
                    />
                  </div>
                  <div className="col-sm-4 mb-2 mt-3 align-middle text-right">
                    <label>วิชาปฏิบัติ : </label>
                  </div>
                  <div className="col-sm-7 mb-2 align-middle text-left">
                    <Controller
                      name="Subject_Practice"
                      control={control}
                      defaultValue=""
                      render={({ onChange, value }) => (
                        <TextField
                          variant="outlined"
                          size="small"
                          margin="normal"
                          required
                          fullWidth
                          label="จำนวนชั่วโมงวิชาปฏิบัติ"
                          onChange={onChange}
                          value={value}
                          type="text"
                        />
                      )}
                    />
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

        <div className="col-sm-12  mt-4 align-middle">
          <table className="table table-striped align-middle text-center">
            <thead>
              <tr>
                <th>รหัสวิชา</th>
                <th>ชื่อวิชาภาษาไทย</th>
                <th>ชื่อวิชาภาษาอังกฤษ</th>
                <th>ทฤษฎี (จำนวนชั่วโมง)</th>
                <th>ปฏิบัติ (จำนวนชั่วโมง)</th>
                <th>จัดการ</th>
              </tr>
            </thead>
            <tbody>
              {process.env.api_url}
              {data.map((variable, index) => {
                return (
                  <tr key={variable.Subject_PK}>
                    <td>{variable.Subject_ID}</td>
                    <td>{variable.Subject_NameTH}</td>
                    <td>{variable.Subject_NameEN}</td>
                    <td>{variable.Subject_Theory}</td>
                    <td>{variable.Subject_Practice}</td>
                    <td>
                      <button type="button" className="btn btn-warning mr-2">
                        <EditIcon />
                      </button>
                      <button type="button" className="btn btn-danger">
                        <DeleteIcon />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div></div>
        </div>
      </form>
    </AdminTheme>
  );
}
