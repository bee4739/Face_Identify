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
      <div className="spinner-border text-danger" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </TeacherTheme>
  );
}
