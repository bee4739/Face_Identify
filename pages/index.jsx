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
      className="spinner-border text-primary"
      role="status"
      style={{
        backgroundColor: "blue",
        position: "absolute",
        top: "200px",
        left: "200px",
        right: "200px",
        bottom: "200px"
        // justifyContent: "center",
        // alignItems: "center"
      }}
    >
      <span
        className="sr-only"
        // style={{ flex: "1", alignItems: "center", justifyContent: "center" }}
      >
        Loading...
      </span>
    </div>
  );
}
