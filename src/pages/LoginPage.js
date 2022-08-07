import React, { useState } from "react";
import "../styles/loginPage.css";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { loginService } from "../api/loginApi";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../store/slice/user/userSlice";
import AlertBox from "../component/AlertBox";

const LoginPage = (props) => {
  const [alertMsg, setAlertMsg] = useState("");
  const [isAlertShown, setIsAlertShown] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const showAlertPopup = (message) => {
    setAlertMsg(message);
    setIsAlertShown(true);
  };
  const handleLogin = async () => {
    try {
      if (username?.length === 0 || password?.length === 0) {
        showAlertPopup("Username and password can not be empty");
        return;
      }
      let data = await loginService({ username, password });
      dispatch(
        loginSuccess({
          token: data.accessToken,
          role: data.authorities,
          email: data.email,
          id: data.id,
          username: data.username,
        })
      );
      navigate("/cms", { replace: true });
    } catch (e) {
      showAlertPopup(e.message ?? "LOGIN FAILED");
    }
  };
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: `url(${
          process.env.PUBLIC_URL + "/image/background-image-login.jpg"
        }) no-repeat center center fixed`,
        backgroundSize: "cover",
        overflow: "hidden",
      }}
    >
      <Box
        className="Shadow"
        sx={{
          width: "450px",
          borderRadius: "20px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            background: `url(${
              process.env.PUBLIC_URL + "/image/welab-bank-logo.png"
            }) no-repeat 50% 50% `,
            backgroundSize: "450px ",
            width: "450px",
            height: "225px",
            position: "relative",
          }}
        >
          <div
            className="gradient"
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              height: "4px",
            }}
          />
        </div>
        <div className="glass-effect" style={{ padding: "0px 20px 30px 20px" }}>
          <TextField
            size="medium"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            margin="normal"
            id="outlined-basic"
            fullWidth
            label="Username/Email"
            variant="outlined"
          />
          <TextField
            size="medium"
            type={"password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            id="outlined-basic"
            fullWidth
            label="Password"
            variant="outlined"
          />
          <div
            style={{
              marginTop: "16px",
              borderRadius: "20px",
              overflow: "hidden",
            }}
          >
            <Button
              size="large"
              fullWidth
              onClick={handleLogin}
              variant="contained"
            >
              Login
            </Button>
          </div>
        </div>
      </Box>
      <AlertBox
        message={alertMsg}
        isShow={isAlertShown}
        onClose={() => {
          setIsAlertShown(false);
        }}
      />
    </div>
  );
};

export default LoginPage;
