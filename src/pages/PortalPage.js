import * as React from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import ApplicationBar from "../component/ApplicationBar";
import AppDrawer from "../component/AppDrawer";
import { getPrivateRoutes } from "../route/routes";
import BaseContainer from "../component/BaseContainer";
import NotFound from "./NotFoundPage";
import CmsRootPage from "./CmsRootPage";

const drawerWidth = 240;

export default function ResponsiveDrawer(props) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const user = useSelector((state) => state.user);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  return (
    <BaseContainer>
      <ApplicationBar
        handleDrawerToggle={handleDrawerToggle}
        drawerWidth={drawerWidth}
      />
      <AppDrawer
        user={user}
        drawerWidth={drawerWidth}
        handleDrawerToggle={handleDrawerToggle}
        mobileOpen={mobileOpen}
      />
      <Routes>
        {getPrivateRoutes(user.role ?? []).map((e) => {
          return (
            <Route
              key={e.name}
              path={e.path.replace("/cms", "")}
              element={e.component}
            />
          );
        })}
        <Route path="/" element={<CmsRootPage />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to={"/cms/404"} replace />} />
      </Routes>
    </BaseContainer>
  );
}
