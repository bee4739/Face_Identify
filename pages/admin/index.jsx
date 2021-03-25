import React from "react";
import { useRouter } from "next/router";
import AdminTheme from "../../components/AdminTheme";

export default function Admin(props) {
  const router = useRouter();

  React.useEffect(() => {
    router.replace("/admin/year");
  }, []);

  return (
    <AdminTheme {...props}>
      <div className="spinner-border text-danger" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </AdminTheme>
  );
}
