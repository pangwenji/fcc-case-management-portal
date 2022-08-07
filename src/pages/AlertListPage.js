import PortalRootContainer from "../component/PortalRootContainer";
import TitleText from "../component/TitleText";
import React, { useRef, useState, useCallback } from "react";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { alertListService } from "../api/listApi";
import AlertBox from "../component/AlertBox";
import useTable from "../utils/useTable";
import { useAlertListColumn } from "../utils/columnHook";
import SearchBar from "../component/SerachBar";
import { generateUUID } from "../utils/validation";

const AlertListPage = () => {
  // boilerplate code, refactor if have time
  const [randomKey, setRandomKey] = useState(generateUUID());
  const [alertMsg, setAlertMsg] = useState("");
  const [isAlertShown, setIsAlertShown] = useState(false);
  const showAlertPopup = (message) => {
    setAlertMsg(message);
    setIsAlertShown(true);
  };
  const searchValue = useRef();
  const navigate = useNavigate();
  const apiCall = useCallback(async (pageData) => {
    try {
      let body = await alertListService({
        offset: pageData.offset,
        limit: pageData.limit,
        searchValue: searchValue.current,
      });
      const { totalCount, offset, limit, data } = body;
      showAlertPopup("Data Load Successfully");
      return { totalCount, offset, limit, data };
    } catch (e) {
      showAlertPopup("Failed to get table data");
      throw Error("API CALL ERROR");
    }
  }, []);
  const { page, pageSize, tableRow, rowCountState, isLoading, setPage, reset } =
    useTable(apiCall, searchValue);
  const columns = useAlertListColumn(navigate);
  return (
    <PortalRootContainer>
      <TitleText title="Alert List" />
      <SearchBar
        key={randomKey}
        onClick={(value) => {
          if (value.length <= 0) {
            showAlertPopup("Please enter something in search field");
          } else {
            const { searchTerm } = value;
            searchValue.current = searchTerm;
            reset();
          }
        }}
      />
      <Button
        onClick={() => {
          setRandomKey(generateUUID());
          searchValue.current = undefined;
          reset();
        }}
        variant="contained"
        style={{ marginBottom: "20px" }}
      >
        Clear Search
      </Button>
      <div style={{ height: 550, border: "none" }}>
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

export default AlertListPage;
