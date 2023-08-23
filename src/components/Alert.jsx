import { useEffect } from "react";

const Alert = ({ msg, bgColor, setAlert }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      setAlert({ ...alert, show: false });
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  return <p className={`alert alert-${bgColor}`}>{msg}</p>;
};
export default Alert;
