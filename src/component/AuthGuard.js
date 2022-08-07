import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AuthGuard = ({ redirectPath = "/", children }) => {
  const isLogin = useSelector((state) => state.user.isLogin);
  if (isLogin === false) {
    return <Navigate to={redirectPath} replace />;
  }
  return children ? children : <div></div>;
};

export default AuthGuard;
