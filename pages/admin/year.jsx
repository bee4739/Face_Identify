import React from "react";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import { useForm, Controller } from "react-hook-form";
import AdminTheme from "../../components/AdminTheme";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
  button: {
    textAlign: "right",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
}));

export default function Admin(props) {
  const classes = useStyles();
  const router = useRouter();
  const { control, handleSubmit } = useForm();

  const onSubmit = (data) => {
    axios
      .post(`${props.env.api_url}/login`, JSON.stringify(data))
      .then((value) => {
        console.log(value.data);
        if (value.data.success) {
          props.setUserLogin(value.data.data);
          router.replace("/");
        } else {
          alert(value.data.message);
        }
      })
      .catch((reason) => {
        console.log(reason);
      });
  };

  React.useEffect(() => {}, []);

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
                  <div className="col-sm-5 mb-2 mt-2 align-middle text-right">
                    <label>ปีการศึกษา : </label>
                  </div>
                  <div className="col-sm-6 mb-2 mt-2 align-middle text-left">
                    <input type="text" className="form-control"></input>
                  </div>
                  <div className="col-sm-5 mb-2 mt-2 align-middle text-right">
                    <label>ภาคเรียน : </label>
                  </div>
                  <div className="col-sm-6 mt-2 align-middle text-left">
                    <div class="form-group">
                      <select class="form-control" id="addTerm">
                        <option>ภาคเรียนที่ 1</option>
                        <option>ภาคเรียนที่ 2</option>
                        <option>ภาคฤดูร้อน</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-sm-5 mb-2 mt-2 align-middle text-right">
                    <label>วันเริ่มต้นปีการศึกษา : </label>
                  </div>
                  <div className="col-sm-6 mb-2 mt-2 align-middle text-left">
                    <input type="date" className="form-control"></input>
                  </div>
                  <div className="col-sm-5 mb-2 mt-2 align-middle text-right">
                    <label>วันสิ้นสุดปีการศึกษา : </label>
                  </div>
                  <div className="col-sm-6 mb-2 mt-2 align-middle text-left">
                    <input type="date" className="form-control"></input>
                  </div>
                  <div className="col-sm-5 mb-2 mt-2 align-middle text-right">
                    <label>เริ่มต้นวันสอบกลางภาค : </label>
                  </div>
                  <div className="col-sm-6 mb-2 mt-2 align-middle text-left">
                    <input type="date" className="form-control"></input>
                  </div>
                  <div className="col-sm-5 mb-2 mt-2 align-middle text-right">
                    <label>สิ้นสุดวันสอบกลางภาค : </label>
                  </div>
                  <div className="col-sm-6 mb-2 mt-2 align-middle text-left">
                    <input type="date" className="form-control"></input>
                  </div>
                  <div className="col-sm-5 mb-2 mt-2 align-middle text-right">
                    <label>เริ่มต้นวันสอบปลายภาค : </label>
                  </div>
                  <div className="col-sm-6 mb-2 mt-2 align-middle text-left">
                    <input type="date" className="form-control"></input>
                  </div>
                  <div className="col-sm-5 mb-2 mt-2 align-middle text-right">
                    <label>สิ้นสุดวันสอบปลายภาค : </label>
                  </div>
                  <div className="col-sm-6 mb-2 mt-2 align-middle text-left">
                    <input type="date" className="form-control"></input>
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

        <div className="col-sm-12  mt-4 align-middle">
          <table className="table table-striped align-middle text-center">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">ปีการศึกษา</th>
                <th scope="col">ภาคเรียน</th>
                <th scope="col">วันเริ่มต้นปีการศึกษา</th>
                <th scope="col">วันสิ้นสุดปีการศึกษา</th>
                <th scope="col">วันสอบกลางภาค</th>
                <th scope="col">วันสอบปลายภาค</th>
                <th scope="col">จัดการ</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>@mdo</td>
                <td>@mdo</td>
                <td>@mdo</td>
                <td>
                  <button type="button" className="btn btn-warning mr-2">
                    <EditIcon />
                  </button>
                  <button type="button" className="btn btn-danger">
                    <DeleteIcon />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </form>
    </AdminTheme>
  );
}
