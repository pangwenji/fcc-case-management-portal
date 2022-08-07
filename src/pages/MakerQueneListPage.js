import PortalRootContainer from "../component/PortalRootContainer";
import TitleText from "../component/TitleText";
import React, { useState, useCallback } from "react";
import AlertBox from "../component/AlertBox";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { makerQueueListService } from "../api/listApi";
import useTable from "../utils/useTable";
import { useMakerQueueListColumn } from "../utils/columnHook";

const MakerQueneListPage = () => {
  const navigate = useNavigate();
  const [alertMsg, setAlertMsg] = useState("");
  const [isAlertShown, setIsAlertShown] = useState(false);
  const showAlertPopup = useCallback((message) => {
    setAlertMsg(message);
    setIsAlertShown(true);
  }, []);
  const apiCall = useCallback(async (pageData) => {
    try {
      let body = await makerQueueListService({
        offset: pageData.offset,
        limit: pageData.limit,
      });
      const { totalCount, offset, limit, data } = body;
      showAlertPopup("Data Load Successfully");
      return { totalCount, offset, limit, data };
    } catch (e) {
      showAlertPopup("Failed to get table data");
      throw Error("API CALL ERROR");
    }
  }, [showAlertPopup]);

  const { page, pageSize, tableRow, rowCountState, isLoading, setPage } =
    useTable(apiCall);
  const columns = useMakerQueueListColumn(navigate);

  return (
    <PortalRootContainer>
      <TitleText title="Maker Queue List" />
      <div style={{ height: 550, width: "100%", border: "none" }}>
        <DataGrid
          paginationMode="server"
          className="Shadow"
          style={{ borderRadius: "12px" }}
          rowHeight={70}
          disableColumnMenu
          disableSelectionOnClick
          loading={isLoading}
          rows={tableRow}
          columns={columns}
          onPageChange={(newPage) => {
            setPage(newPage);
          }}
          page={page}
          pageSize={pageSize}
          rowCount={rowCountState}
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
  );
};

export default React.memo(MakerQueneListPage, () => false);
