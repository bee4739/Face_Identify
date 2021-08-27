import React from "react";
import { useRouter } from "next/router";

export default function Home(props) {
  const router = useRouter();

  React.useEffect(() => {
    if (props.userLogin != null) {
      console.log();
      if (props.userLogin["Role"] == 0) {
        router.replace("/admin");
      } else if (props.userLogin["Role"] == 1) {
        router.replace("/teacher");
      } else {
        router.replace("/student");
      }
    } else {
      router.replace("/login");
    }
  }, []);

  return (
    <div
      style={
        {
          // position: "absolute",
          // top: "300px",
          // left: "1000px"
          // justifyContent: "center",
          // alignItems: "center"
        }
      }
    >
      {/* <table
        style={{
          height: "100vh",
          width: "100vw",
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
      </table> */}
    </div>
  );
}
