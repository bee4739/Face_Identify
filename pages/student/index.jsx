import React from "react";
import { useRouter } from "next/router";
import StudentTheme from "../../components/StudentTheme";

export default function Teacher(props) {
  const router = useRouter();

  React.useEffect(() => {}, []);

  return (
    <StudentTheme {...props}>
      <div className="spinner-border text-danger" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </StudentTheme>
  );
}
