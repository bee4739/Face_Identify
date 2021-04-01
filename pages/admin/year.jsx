import React from "react";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import { useForm, Controller } from "react-hook-form";
import AdminTheme from "../../components/AdminTheme";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
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
      .post(`${props.env.api_url}/insertYear`, JSON.stringify(data))
      .then(value => {
        console.log(value.data);
      })
      .catch(reason => {
        console.log(reason);
      });
    window.location.reload();
  };

  const onDel = data => {
    axios
      .post(`${props.env.api_url}/delYear`, JSON.stringify(data))
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
        "http://localhost/face_identify/api/index.php/getYear"
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
            เพิ่มปีการศึกษา
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
                  เพิ่มปีการศึกษา
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
                  <div className="col-sm-5 mt-3 align-middle text-right">
                    <label>ปีการศึกษา : </label>
                  </div>
                  <div className="col-sm-6 mb-2 align-middle text-left">
                    <Controller
                      name="Year"
                      control={control}
                      defaultValue=""
                      render={({ onChange, value }) => (
                        <TextField
                          variant="outlined"
                          size="small"
                          margin="normal"
                          required
                          fullWidth
                          label="ปีการศึกษา"
                          onChange={onChange}
                          value={value}
                          type="text"
                        />
                      )}
                    />
                  </div>
                  <div className="col-sm-5 mt-2 align-middle text-right">
                    <label>ภาคเรียน : </label>
                  </div>
                  <div className="col-sm-6 mt-2 mb-2 align-middle text-left">
                    <Controller
                      name="Term"
                      control={control}
                      defaultValue=""
                      variant="outlined"
                      render={({ onChange, value }) => (
                        <select
                          className="form-control"
                          id="addTerm"
                          onChange={onChange}
                          value={value}
                        >
                          <option>ภาคเรียนที่ 1</option>
                          <option>ภาคเรียนที่ 2</option>
                          <option>ภาคฤดูร้อน</option>
                        </select>
                      )}
                    />
                  </div>
                  <div className="col-sm-5 mt-3 align-middle text-right">
                    <label>วันเริ่มต้นปีการศึกษา : </label>
                  </div>
                  <div className="col-sm-6 align-middle text-left">
                    <Controller
                      name="Start_SchYear"
                      control={control}
                      defaultValue=""
                      render={({ onChange, value }) => (
                        <TextField
                          variant="outlined"
                          size="small"
                          margin="normal"
                          required
                          fullWidth
                          onChange={onChange}
                          value={value}
                          type="date"
                        />
                      )}
                    />
                  </div>
                  <div className="col-sm-5 mt-3 align-middle text-right">
                    <label>วันสิ้นสุดปีการศึกษา : </label>
                  </div>
                  <div className="col-sm-6 align-middle text-left">
                    <Controller
                      name="End_SchYear"
                      control={control}
                      defaultValue=""
                      render={({ onChange, value }) => (
                        <TextField
                          variant="outlined"
                          size="small"
                          margin="normal"
                          required
                          fullWidth
                          onChange={onChange}
                          value={value}
                          type="date"
                        />
                      )}
                    />
                  </div>
                  <div className="col-sm-5 mt-3 align-middle text-right">
                    <label>เริ่มต้นวันสอบกลางภาค : </label>
                  </div>
                  <div className="col-sm-6 align-middle text-left">
                    <Controller
                      name="Start_Midterm"
                      control={control}
                      defaultValue=""
                      render={({ onChange, value }) => (
                        <TextField
                          variant="outlined"
                          size="small"
                          margin="normal"
                          required
                          fullWidth
                          onChange={onChange}
                          value={value}
                          type="date"
                        />
                      )}
                    />
                  </div>
                  <div className="col-sm-5 mt-3 align-middle text-right">
                    <label>สิ้นสุดวันสอบกลางภาค : </label>
                  </div>
                  <div className="col-sm-6 align-middle text-left">
                    <Controller
                      name="End_Midterm"
                      control={control}
                      defaultValue=""
                      render={({ onChange, value }) => (
                        <TextField
                          variant="outlined"
                          size="small"
                          margin="normal"
                          required
                          fullWidth
                          onChange={onChange}
                          value={value}
                          type="date"
                        />
                      )}
                    />
                  </div>
                  <div className="col-sm-5 mt-3 align-middle text-right">
                    <label>เริ่มต้นวันสอบปลายภาค : </label>
                  </div>
                  <div className="col-sm-6 align-middle text-left">
                    <Controller
                      name="Start_Final"
                      control={control}
                      defaultValue=""
                      render={({ onChange, value }) => (
                        <TextField
                          variant="outlined"
                          size="small"
                          margin="normal"
                          required
                          fullWidth
                          onChange={onChange}
                          value={value}
                          type="date"
                        />
                      )}
                    />
                  </div>
                  <div className="col-sm-5 mt-3 align-middle text-right">
                    <label>สิ้นสุดวันสอบปลายภาค : </label>
                  </div>
                  <div className="col-sm-6 align-middle text-left">
                    <Controller
                      name="End_Final"
                      control={control}
                      defaultValue=""
                      render={({ onChange, value }) => (
                        <TextField
                          variant="outlined"
                          size="small"
                          margin="normal"
                          required
                          fullWidth
                          onChange={onChange}
                          value={value}
                          type="date"
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="close"
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
                <th>ปีการศึกษา</th>
                <th>ภาคเรียน</th>
                <th>วันเริ่มต้นปีการศึกษา</th>
                <th>วันสิ้นสุดปีการศึกษา</th>
                <th>วันสอบกลางภาค</th>
                <th>วันสอบปลายภาค</th>
                <th>จัดการ</th>
              </tr>
            </thead>
            <tbody>
              {process.env.api_url}
              {data.map((variable, index) => {
                return (
                  <tr key={variable.Year_ID}>
                    <td>{variable.Year}</td>
                    <td>{variable.Term}</td>
                    <td>{variable.Start_SchYear}</td>
                    <td>{variable.End_SchYear}</td>
                    <td>
                      {variable.Start_Midterm}
                      &nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;
                      {variable.End_Midterm}
                    </td>
                    <td>
                      {variable.Start_Final}
                      &nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;{variable.End_Final}
                    </td>
                    <td>
                      <button type="button" className="btn btn-warning mr-2">
                        <EditIcon />
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => {
                          onDel({ year: variable.Year_ID });
                        }}
                      >
                        <DeleteIcon />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </form>
    </AdminTheme>
  );
}
