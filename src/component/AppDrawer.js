import {
  Box,
  Drawer,
  Avatar,
  Chip,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Toolbar,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { stringAvatar } from "../utils/avatarColorGeneration";
import { getDrawerRoutes } from "../route/routes";
import { useDispatch } from "react-redux";
import { logoutSuccess } from "../store/slice/user/userSlice";
const AppDrawer = ({
  user = {},
  drawerWidth = 0,
  mobileOpen = false,
  handleDrawerToggle = () => {},
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const drawer = (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <div
        style={{
          height: 300,
          padding: "20px, 20px",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Avatar {...stringAvatar(user.username ?? "")} />
        <Typography color="text.primary">{user.username ?? ""}</Typography>
        {user.role
          ? user.role.map((e) => (
              <Chip label={e.replace("ROLE_", "")} variant="outlined" />
            ))
          : null}
      </div>
      <div
        className="gradient"
        style={{
          left: 0,
          right: 0,
          bottom: 0,
          height: "4px",
        }}
      />
      <List
        style={{
          flexGrow: 1,
        }}
      >
        {getDrawerRoutes(user?.role ?? []).map((e, index) => (
          <ListItem
            key={index}
            onClick={() => {
              navigate(e.path, { replace: false });
            }}
            button
          >
            {e.icon ? <ListItemIcon>{e.icon}</ListItemIcon> : null}
            <ListItemText primary={e.name} />
          </ListItem>
        ))}
      </List>
      <Toolbar>
        <Button
          style={{
            borderRadius: "20px",
          }}
          onClick={() => {
            dispatch(logoutSuccess);
            navigate("/", { replace: "true" });
          }}
          fullWidth
          variant="contained"
        >
          Logout
        </Button>
      </Toolbar>
    </div>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default AppDrawer;
