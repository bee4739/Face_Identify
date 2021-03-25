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
      <div className="spinner-border text-danger" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </StudentTheme>
  );
}
