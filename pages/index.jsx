import React from "react";
import { useRouter } from "next/router";

export default function Home(props) {
  const router = useRouter();

  React.useEffect(() => {
    if (props.userLogin != null) {
      if (true) {
        router.replace("/teacher");
      } else {
        router.replace("/student");
      }
    } else {
      router.replace("/login");
    }
  }, []);

  return (
    <div className="spinner-border text-primary" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  );
}
