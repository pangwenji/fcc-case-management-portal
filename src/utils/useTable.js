import { useState, useEffect, useCallback } from "react";

const useTable = (apiCall) => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [tableRow, setTableRow] = useState(0);
  const [rowCountState, setRowCountState] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const apiCallMem = useCallback(
    async ({ dataOffset, dataLimit }) => {
      try {
        setIsLoading(true);
        const body = await apiCall({ offset: dataOffset, limit: dataLimit });
        const { totalCount, data } = body;
        setRowCountState(totalCount ?? 0);
        setTableRow(data ?? []);
      } catch (e) {
      } finally {
        setIsLoading(false);
      }
    },
    [apiCall, setPage, setRowCountState, setTableRow]
  );

  const refresh = useCallback(() => {
    const dataOffset = page * pageSize;
    const dataLimit = pageSize;
    apiCallMem({ dataOffset, dataLimit });
  }, [apiCallMem, page, pageSize]);

  const reset = useCallback(() => {
    setPage(0);
    setPageSize(20);
    setTableRow(0);
    setRowCountState(0);
    const dataOffset = 0;
    const dataLimit = 20;
    apiCallMem({ dataOffset, dataLimit });
  }, [setPage, setPageSize, apiCallMem]);

  useEffect(() => {
    const dataOffset = page * pageSize;
    const dataLimit = pageSize;
    apiCallMem({ dataOffset, dataLimit });
  }, [pageSize, page]);

  return {
    page,
    pageSize,
    tableRow,
    rowCountState,
    isLoading,
    setPage,
    setPageSize,
    refresh,
    reset,
  };
};

export default useTable;
