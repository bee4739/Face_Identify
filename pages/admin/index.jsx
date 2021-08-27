import React from "react";
import { useRouter } from "next/router";
import AdminTheme from "../../components/AdminTheme";

export default function Admin(props) {
  const router = useRouter();

  React.useEffect(() => {
    router.replace("/admin/year");
  }, []);

  return (
    <AdminTheme {...props}>
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
    </AdminTheme>
  );
}
