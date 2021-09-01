import React from "react";
import Link from "@material-ui/core/Link";

export default function Footer() {
  return (
    <div
      className="footer_content"
      color="textSecondary"
      style={{
        backgroundColor: "#F7D9D9",
        height: "45px",
        width: "100vw",
        fontSize: "1rem"
      }}
    >
      <div className="footer_text">
        {"Copyright © "}
        <Link color="inherit" href="https://www.rmuti.ac.th/">
          Rajamangala University of Technology Isan
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </div>
    </div>
  );
}
