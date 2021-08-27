import React from "react";
import { useRouter } from "next/router";
import TeacherTheme from "../../components/TeacherTheme";

export default function Teacher(props) {
  const router = useRouter();

  React.useEffect(() => {
    router.replace("/teacher/study_group");
  }, []);

  return (
    <TeacherTheme {...props}>
      <div>
        <table
          style={{
            height: "70vh",
            width: "80vw",
            verticalAlign: "middle",
            textAlign: "center",
            backgroundColor: "#F9F3F3"
          }}
        >
          <tr>
            <td>
              <button
                className="btn"
                type="button"
                disabled
                style={{
                  backgroundColor: "#F25287",
                  color: "#000000",
                  width: "150px",
                  height: "40px"
                }}
              >
                <span
                  className="spinner-grow spinner-grow-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                กำลังโหลด...
              </button>
            </td>
          </tr>
        </table>
      </div>
    </TeacherTheme>
  );
}
