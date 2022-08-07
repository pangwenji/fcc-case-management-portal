import LoginPage from "../pages/LoginPage";
import MakerQueneListPage from "../pages/MakerQueneListPage";
import ApproverListPage from "../pages/ApproverListPage";
import CmsRootPage from "../pages/CmsRootPage";
import SheetUploadPage from "../pages/SheetUploadPage";
import CustomerDetailPage from "../pages/CustomerDetailPage";
import AlertListPage from "../pages/AlertListPage";

const publicRoutes = [
  {
    name: "Login",
    path: "/",
    component: <LoginPage />,
  },
];

const drawerRoutes = [
  {
    name: "Alert List Page",
    path: "/cms/alertlistpage",
    component: <AlertListPage />,
    role: ["maker", "approver"],
  },
  {
    name: "Maker Queue List",
    path: "/cms/makerQueueList",
    component: <MakerQueneListPage />,
    role: ["maker"],
  },
  {
    name: "Approval Queue List",
    path: "/cms/approverList",
    component: <ApproverListPage />,
    role: ["approver"],
  },
  {
    name: "Upload CSV",
    path: "/cms/upload",
    component: <SheetUploadPage />,
    role: ["uploader"],
  },
];

const privateRoutes = [
  ...drawerRoutes,
  {
    name: "Cms Root",
    path: "/",
    component: <CmsRootPage />,
    role: ["approver", "maker"],
  },
  {
    name: "Customer Details",
    path: "/cms/customerDetail/:id",
    component: <CustomerDetailPage />,
    role: ["approver", "maker"],
  },
];

const getDrawerRoutes = (role) => {
  return drawerRoutes.filter((e, i) => {
    const roleList = e.role;
    const targetList = role.map((e) => e.replace("ROLE_", "").toLowerCase());
    return roleList.some((e) => targetList.includes(e));
  });
};

const getPrivateRoutes = (role) => {
  return privateRoutes.filter((e, i) => {
    const roleList = e.role;
    const targetList = role.map((e) => e.replace("ROLE_", "").toLowerCase());
    return roleList.some((e) => targetList.includes(e));
  });
};

export {
  publicRoutes,
  drawerRoutes,
  privateRoutes,
  getDrawerRoutes,
  getPrivateRoutes,
};
