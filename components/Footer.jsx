import React from "react";
import Link from "@material-ui/core/Link";

export default function Footer() {
  return (
    <div
      color="textSecondary"
      align="center"
      style={{
        backgroundColor: "#FFC0CB",
        height: "3vh",
        width: "100vw",
        fontSize: "0.7rem",
        bottom: 0,
        position: "absolute"
      }}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://www.rmuti.ac.th/">
        Rajamangala University of Technology Isan
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </div>
  );
}
