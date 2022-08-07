import { Typography } from "@mui/material";
import PortalRootContainer from "../component/PortalRootContainer";

const NotFound = () => {
  return (
    <PortalRootContainer>
      <Typography variant={"h5"} style={{ textAlign: "center" }}>
        404 NotFound
      </Typography>
    </PortalRootContainer>
  );
};

export default NotFound;
