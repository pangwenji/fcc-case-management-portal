import React, { useEffect, useState } from "react";
import { approverListService } from "../api/customerDetailApi";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import { TextField, FormHelperText } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { Button } from "@mui/material";
import Select from "@mui/material/Select";
import { validURL } from "../utils/validation";
const MakerDialog = (props) => {
  const [makerList, setMakerList] = useState([]);
  const [approver, setApprover] = useState("");
  const [remarks, setRemarks] = useState("");
  const [urlLink, setUrlLink] = useState("");
  const [approverError, setApproverError] = useState();
  const [urlError, setUrlError] = useState();

  const validateError = () => {
    setUrlError();
    setApproverError();
    let hasError = false;
    if (approver !== 0 && !approver) {
      setApproverError("Please Choose an approver");
      hasError = true;
    }
    if (urlLink.length > 0 && !validURL(urlLink)) {
      setUrlError("Please enter a valid URL");
      hasError = true;
    }

    return hasError;
  };

  const handleChange = (e) => {
    setApprover(e.target.value);
  };
  useEffect(() => {
    approverListService().then((e) => {
      setMakerList(e.data);
    });
  }, []);

  return (
    <Dialog
      open={props.open ?? true}
      onClose={props.handleClose ? props.handleClose : () => {}}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Submit For Approval</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <div style={{ padding: "10px 10px" }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Approver</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={approver ?? ""}
                label="Set Approver"
                onChange={handleChange}
                error={true}
              >
                {makerList.map((e, i) => {
                  return (
                    <MenuItem key={e.id} value={e.id}>
                      {e.username}
                    </MenuItem>
                  );
                })}
              </Select>
              <FormHelperText style={{ color: "red" }}>
                {approverError}
              </FormHelperText>
            </FormControl>
            <TextField
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              margin="normal"
              id="outlined-basic"
              fullWidth
              label="Comment"
              variant="outlined"
            />
            <TextField
              error={urlError}
              helperText={urlError}
              value={urlLink}
              onChange={(e) => setUrlLink(e.target.value)}
              margin="normal"
              id="outlined-basic"
              fullWidth
              label="Attachment Url"
              variant="outlined"
            />
          </div>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose ? props.handleClose : () => {}}>
          Cancel
        </Button>
        <Button
          onClick={
            props.handleConfirm
              ? () => {
                  if (validateError()) {
                    return;
                  }
                  props.handleConfirm({
                    approverId: approver,
                    remarks,
                    urlLink,
                  });
                  props.handleClose();
                }
              : () => {}
          }
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MakerDialog;
