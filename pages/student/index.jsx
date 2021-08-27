import React from "react";
import { useRouter } from "next/router";
import StudentTheme from "../../components/StudentTheme";

export default function Student(props) {
  const router = useRouter();

  React.useEffect(() => {
    router.replace("/student/study_group");
  }, []);

  return (
    <StudentTheme {...props}>
      <div>
        <table
          style={{
            height: "70vh",
            width: "80vw",
            verticalAlign: "middle",
            textAlign: "center",
            backgroundColor: "#F9F3F3",
            position: "absolute"
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
    </StudentTheme>
  );
}
