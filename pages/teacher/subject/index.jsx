import React from "react";
import { useRouter } from "next/router";
import TeacherTheme from "../../../components/TeacherTheme";

export default function Teacher(props) {
  const router = useRouter();

  React.useEffect(() => {}, []);

  return (
    <TeacherTheme {...props}>
      <form>
        <button>Add</button>
      </form>
    </TeacherTheme>
  );
}
