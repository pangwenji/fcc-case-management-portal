import React, { useState } from "react";
import { Button, Toolbar, Typography } from "@mui/material";
import { FileUpload } from "../component/FileUpload";
import PortalRootContainer from "../component/PortalRootContainer";
import Axios from "../api/baseAxios";
import AlertBox from "../component/AlertBox";
const SheetUploadPage = (props) => {
  const [alertMsg, setAlertMsg] = useState("");
  const [isAlertShown, setIsAlertShown] = useState(false);
  const [file, setFile] = useState();

  const showAlertPopup = (message) => {
    setAlertMsg(message);
    setIsAlertShown(true);
  };

  const uploadFile = async () => {
    try {
      let data = new FormData();
      data.append("file", file);
      var config = {
        method: "post",
        url: "/api/v1/upload",
        data: data,
      };
      await Axios(config);
      showAlertPopup("Upload Success");
      setFile();
    } catch (e) {
      showAlertPopup("Upload Failed");
    }
  };

  const handleFileUpload = (event) => {
    try {
      if (event.target.files[0].type !== "text/csv") {
        showAlertPopup("Please upload an csv file");
        return;
      }
      setFile(event.target.files[0]);
    } catch (e) {
      showAlertPopup("Failed to upload the file");
    }
  };

  return (
    <PortalRootContainer>
      <Toolbar />
      <FileUpload onDrop={handleFileUpload} onChange={handleFileUpload} />
      {file ? (
        <Typography variant="h6">File Name: {file["name"]}</Typography>
      ) : null}
      {file ? (
        <Button
          onClick={() => {
            uploadFile();
          }}
          variant="contained"
        >
          Upload
        </Button>
      ) : null}
      <AlertBox
        message={alertMsg}
        isShow={isAlertShown}
        onClose={() => {
          setIsAlertShown(false);
        }}
      />
    </PortalRootContainer>
  );
};

export default SheetUploadPage;
