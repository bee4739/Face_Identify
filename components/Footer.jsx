import React from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

export default function Footer() {
  return (
    <div color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://www.rmuti.ac.th/">
        Rajamangala University of Technology Isan
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </div>
  );
}
