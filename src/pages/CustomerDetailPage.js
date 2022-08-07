import React, { useCallback, useEffect, useMemo } from "react";
import { Typography } from "@mui/material";
import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { useNavigate, useParams } from "react-router-dom";
import BasicCard from "../component/BasicCard";
import PortalRootContainer from "../component/PortalRootContainer";
import TitleText from "../component/TitleText";
import { useSelector } from "react-redux";
import {
  useApprovalRequestColumn,
  useCaseListColumn,
} from "../utils/columnHook";
import {
  handleApprovalRequest,
  approvalRequestListService,
  buttonStatusService,
  customerInfoService,
  openCaseListService,
  closeCaseListService,
  confirmApprovalRequest,
} from "../api/customerDetailApi";
import useTable from "../utils/useTable";
import { pickCase } from "../api/customerDetailApi";
import { isApprover, isMaker } from "../utils/userRoleHelper";
import AlertBox from "../component/AlertBox";
import { debounce } from "debounce";
import MakerDialog from "../component/MakerDialog";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField } from "@mui/material";

const CustomerDetailPage = (props) => {
  const [alertMsg, setAlertMsg] = useState("");
  const [isAlertShown, setIsAlertShown] = useState(false);
  const [isMakerDialogShow, setIsMakerDialogShow] = useState(false);
  const [isApproverDialogShow, setIsApproverDialogShow] = useState(false);
  const [isAccept, setIsAccept] = useState(false);
  const showAlertPopup = useMemo(() => {
    return debounce((message) => {
      setAlertMsg(message);
      setIsAlertShown(true);
    }, 800);
  }, [setAlertMsg, setIsAlertShown]);
  const [comment, setComment] = useState("");

  const user = useSelector((state) => state.user);
  const { id } = useParams();
  const navigate = useNavigate();
  const [customerInfo, setCustomerInfo] = useState({});
  const [buttonStatus, setButtonStatus] = useState({});

  const showSubmitApprovalBtn = useCallback(() => {
    return (
      (buttonStatus?.showSubmitApprovalBtn ?? false) &&
      isMaker(user?.role ?? [])
    );
  }, [user, buttonStatus]);

  const showAcceptBtn = useCallback(() => {
    return (
      (buttonStatus?.showAcceptBtn ?? false) && isApprover(user?.role ?? [])
    );
  }, [user, buttonStatus]);

  const getUserInfo = async () => {
    const body = await customerInfoService(id);
    setCustomerInfo(body.data);
  };
  const getButtonState = async () => {
    const body = await buttonStatusService(id);
    setButtonStatus(body.data);
  };

  const closeCaseApiCall = useCallback(
    async (pageData) => {
      try {
        let body = await closeCaseListService({
          offset: pageData.offset,
          limit: pageData.limit,
          customerId: id,
        });
        const { totalCount, offset, limit, data } = body;
        showAlertPopup("Table Loaded Successfully");
        return { totalCount, offset, limit, data };
      } catch (e) {
        showAlertPopup("Failed to get Open Case Table");
        throw Error("API CALL ERROR");
      }
    },
    [id, showAlertPopup]
  );

  const closeCaseTable = useTable(closeCaseApiCall);

  const openCaseApiCall = useCallback(
    async (pageData) => {
      try {
        let body = await openCaseListService({
          offset: pageData.offset,
          limit: pageData.limit,
          customerId: id,
        });
        const { totalCount, offset, limit, data } = body;
        showAlertPopup("Table Loaded Successfully");
        return { totalCount, offset, limit, data };
      } catch (e) {
        showAlertPopup("Failed to get Open Case Table");
        throw Error("API CALL ERROR");
      }
    },
    [id, showAlertPopup]
  );

  const openCaseTable = useTable(openCaseApiCall);

  const approvalRequestApiCall = useCallback(
    async (pageData) => {
      try {
        let body = await approvalRequestListService({
          offset: pageData.offset,
          limit: pageData.limit,
          customerId: id,
        });
        const { totalCount, offset, limit, data } = body;
        showAlertPopup("Table Loaded Successfully");
        return { totalCount, offset, limit, data };
      } catch (e) {
        showAlertPopup("Failed to get Approval Request Table");
        throw Error("API CALL ERROR");
      }
    },
    [id, showAlertPopup]
  );
  const approvalRequestTable = useTable(approvalRequestApiCall);

  useEffect(() => {
    if (!id) {
      navigate(-1);
    } else {
      getUserInfo();
      getButtonState();
    }
  }, []);
  const caseListColumns = useCaseListColumn();
  const approvalListColumn = useApprovalRequestColumn();

  const pickCaseHandler = async () => {
    await pickCase(id);
    getButtonState();
    openCaseTable.refresh();
    approvalRequestTable.refresh();
  };

  const handleMakerDialogConfirm = async (e) => {
    try {
      setIsMakerDialogShow(false);
      await confirmApprovalRequest({
        customerId: id,
        approverId: e.approverId,
        makerComment: e.remarks?.length > 0 ? e.remarks : null,
        makerUrl: e.urlLink?.length > 0 ? e.urlLink : null,
      });
      showAlertPopup("Successfully Submited approval");
      getButtonState();
      openCaseTable.refresh();
      approvalRequestTable.refresh();
    } catch (error) {
      showAlertPopup("Failed to submit for approval");
    }
  };
  const handleMakerDialogClose = () => {
    setIsMakerDialogShow(false);
  };

  const handleApproverDialogOnClose = () => {
    setIsApproverDialogShow(false);
    setComment("");
  };

  const handleApprovalBtnOnClick = (bool) => {
    setIsAccept(bool);
    setIsApproverDialogShow(true);
  };

  const handleApproverDialogConfirm = async () => {
    try {
      const approverComment = comment
        ? comment.length > 0
          ? comment
          : null
        : null;
      const customerId = id;
      const isUserAccept = isAccept;
      await handleApprovalRequest({
        customerId,
        approverComment,
        isAccept: isUserAccept,
      });
      showAlertPopup("Success");
      getButtonState();
      openCaseTable.refresh();
      approvalRequestTable.refresh();
      closeCaseTable.refresh();
    } catch (e) {
      showAlertPopup("Failed to accept/reject");
    } finally {
      handleApproverDialogOnClose();
    }
  };

  const showInvestigationBtn = useCallback(() => {
    return (
      (buttonStatus?.showInvestigationBtn ?? false) &&
      isMaker(user?.role ?? []) &&
      openCaseTable.rowCountState > 0
    );
  }, [user, buttonStatus, openCaseTable]);

  return (
    <>
      <PortalRootContainer>
        <TitleText title="Customer Info" />
        <Typography variant="p" gutterBottom component="div">
          <BasicCard userData={customerInfo} />
        </Typography>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TitleText title={"Approval Request"} />
          {showSubmitApprovalBtn() ? (
            <div>
              <Button
                onClick={() => {
                  setIsMakerDialogShow(true);
                }}
              >
                {"Submit for approval"}
              </Button>
            </div>
          ) : null}
          {showAcceptBtn() ? (
            <div>
              <Button onClick={() => handleApprovalBtnOnClick(true)}>
                {"Accpet"}
              </Button>
              <Button onClick={() => handleApprovalBtnOnClick(false)}>
                {"Reject"}
              </Button>
            </div>
          ) : null}
        </div>
        <div style={{ height: 450, width: "100%" }}>
          <DataGrid
            paginationMode="server"
            className="Shadow"
            style={{ borderRadius: "12px" }}
            rowHeight={70}
            disableColumnMenu
            disableSelectionOnClick
            loading={approvalRequestTable.isLoading}
            rows={approvalRequestTable.tableRow}
            columns={approvalListColumn}
            onPageChange={(newPage) => {
              approvalRequestTable.setPage(newPage);
            }}
            page={approvalRequestTable.page}
            pageSize={approvalRequestTable.pageSize}
            rowCount={approvalRequestTable.rowCountState}
            rowsPerPageOptions={[20]}
            pagination
          />
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <TitleText title={"Open Case List"} />
          {showInvestigationBtn() ? (
            <Button onClick={() => pickCaseHandler()}>
              {"Start Investigation"}
            </Button>
          ) : null}
        </div>

        <div style={{ height: 450, width: "100%" }}>
          <DataGrid
            style={{ borderRadius: "12px" }}
            paginationMode="server"
            className="Shadow"
            rowHeight={70}
            disableColumnMenu
            disableSelectionOnClick
            rows={openCaseTable.tableRow}
            columns={caseListColumns}
            onPageChange={(newPage) => {
              openCaseTable.setPage(newPage);
            }}
            page={openCaseTable.page}
            pageSize={openCaseTable.pageSize}
            rowCount={openCaseTable.rowCountState}
            rowsPerPageOptions={[20]}
            pagination
          />
        </div>

        <TitleText title={"Closed Case List"} />
        <div style={{ height: 450, width: "100%" }}>
          <DataGrid
            paginationMode="server"
            className="Shadow"
            style={{ borderRadius: "12px" }}
            rowHeight={70}
            disableColumnMenu
            disableSelectionOnClick
            loading={closeCaseTable.isLoading}
            rows={closeCaseTable.tableRow}
            columns={caseListColumns}
            onPageChange={(newPage) => {
              closeCaseTable.setPage(newPage);
            }}
            page={closeCaseTable.page}
            pageSize={closeCaseTable.pageSize}
            rowCount={closeCaseTable.rowCountState}
            rowsPerPageOptions={[20]}
            pagination
          />
        </div>
        <AlertBox
          message={alertMsg}
          isShow={isAlertShown}
          onClose={() => {
            setIsAlertShown(false);
          }}
        />
      </PortalRootContainer>

      <Dialog
        open={isApproverDialogShow}
        onClose={handleApproverDialogOnClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {isAccept ? "Accept approval" : "Reject approval"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div style={{ padding: "10px 10px" }}>
              <TextField
                style={{ minWidth: "500px" }}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                margin="normal"
                id="outlined-basic"
                fullWidth
                variant="outlined"
              />
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleApproverDialogOnClose}>Cancel</Button>
          <Button onClick={handleApproverDialogConfirm}>Confirm</Button>
        </DialogActions>
      </Dialog>

      {isMakerDialogShow ? (
        <MakerDialog
          open={isMakerDialogShow}
          handleClose={handleMakerDialogClose}
          handleConfirm={handleMakerDialogConfirm}
        />
      ) : null}
    </>
  );
};

export default CustomerDetailPage;
