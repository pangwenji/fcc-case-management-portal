import Snackbar from "@mui/material/Snackbar";

const AlertBox = (props) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={props.isShow ?? false}
      message={props.message ?? ""}
      onClose={props.onClose ? props.onClose : () => {}}
      autoHideDuration={2500}
    />
  );
};

export default AlertBox;
