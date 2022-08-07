import React, { useMemo } from 'react'
import { Chip, Button } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { validURL } from "./validation";
const useMakerQueueListColumn = (navigate) => {
    const columns = useMemo(() => [
        // { field: 'id', headerName: 'ID', minWidth: 70, sortable: false },
        {
            field: 'customerId',
            headerName: 'Customer Id',
            minWidth: 130,
            flex: 1,
            sortable: false,
            align: "center",
            headerAlign: 'center',
        },
        {
            field: 'dayOld',
            headerName: 'Day Old',
            minWidth: 130,
            flex: 1,
            sortable: false,
            align: "center",
            headerAlign: 'center',
        },
        {
            field: 'openDate', 
            headerName: 'Case Open Date',
            headerAlign: 'center',
            align: "center",
            flex: 1,
            minWidth: 300,
            valueGetter: (params) => params.row?.openDate ? new Date(params.row.openDate) : "",
            sortable: false
        },
        // { field: 'name', flex: 1, headerName: 'Name', minWidth: 130, sortable: false },
        {
            field: 'priority',
            flex: 1,
            align: "center",
            headerAlign: 'center',
            headerName: 'Priority',
            minWidth: 130,
            renderCell: (params) => {
                return (
                    <Chip label={params?.row?.priority ?? "Low"} variant="outlined" />
                )
            },
            sortable: false
        },
        {
            field: 'status',
            flex: 1,
            headerAlign: 'center',
            align: "center",
            headerName: 'Status',
            minWidth: 130,
            renderCell: (params) => {
                return (
                    <Chip label={params?.row?.status ?? "Open"} variant="outlined" />
                )
            },
            sortable: false
        },
        {
            field: 'followUp',
            headerName: 'Follow Up',
            align: "center",
            headerAlign: 'center',
            flex: 1,
            minWidth: 150,
            sortable: false
        },
        {
            field: 'actionButton',
            headerName: 'Action',
            align: "center",
            headerAlign: 'center',
            flex: 1,
            minWidth: 140,
            renderCell: (params) => {
                return (
                    <Button
                        onClick={() => navigate(`/cms/customerDetail/${params.row.customerId}`)}
                        style={{ borderRadius: "20px" }}
                        variant="contained"
                        endIcon={<SendIcon />}>
                        Details
                    </Button>
                )
            },
        },
    ], [navigate]);
    return columns
}

const useAlertListColumn = (navigate) => {
    const columns = useMemo(() => [
        {
            field: 'customerId',
            headerName: 'Customer Id',
            minWidth: 130,
            sortable: false,
            headerAlign: 'center',
            align: "center"
        },
        {
            field: 'fcmAlertId',
            headerName: 'Alert ID',
            minWidth: 200,
            sortable: false,
            headerAlign: 'center',
            align: "center"
        },
        {
            field: 'fcmCaseId',
            headerName: 'Case Id',
            minWidth: 200,
            sortable: false,
            headerAlign: 'center',
            align: "center"
        },
        {
            field: 'status',
            headerAlign: 'center',
            headerName: 'Status',
            minWidth: 130,
            renderCell: (params) => {
                return (
                    <Chip label={params?.row?.status ?? "Open"} variant="outlined" />
                )
            },
            sortable: false,
            align: "center"
        },
        {
            field: 'alertDate', headerName: 'Alert Date',
            flex: 1,
            headerAlign: 'center',
            minWidth: 300,
            sortable: false,
            align: "center",
            valueGetter: (params) => new Date(params.row.alertDate)
        },
        {
            field: 'actionButton',
            headerName: 'Action',
            headerAlign: 'center',
            minWidth: 200,
            align: "center",
            renderCell: (params) => {
                return (
                    <Button
                        onClick={() => navigate(`/cms/customerDetail/${params.row.customerId}`)}
                        style={{ borderRadius: "20px" }}
                        variant="contained"
                        endIcon={<SendIcon />}>
                        Details
                    </Button>
                )
            },
        },
    ], [navigate]);
    return columns
}

const useApproverQueueListColumn = (navigate) => {
    const columns = useMemo(() => [
        { field: 'customerId', flex: 1, headerName: 'Customer Id', minWidth: 150, sortable: false, align: "center" },
        { field: 'actualMaker', flex: 1, headerName: 'Actual Maker', minWidth: 150, sortable: false, align: "center" },
        { field: 'assignedMaker', flex: 1, headerName: 'Assigned Maker', minWidth: 150, sortable: false, align: "center" },
        {
            field: 'status', headerName: 'Status', minWidth: 150,
            renderCell: (params) => {
                return (
                    <Chip label={params?.row?.status ?? "Open"} variant="outlined" />
                )
            },
            sortable: false,
            align: "center"
        },
        { field: 'makerComment', flex: 1, headerName: 'Comment', minWidth: 200, sortable: false, align: "center" },
        {
            field: 'makerAttachmentUrl',
            flex: 1, headerName: 'Link',
            minWidth: 200,
            sortable: false,
            align: "center",
            renderCell: (params) => {
                if (validURL(params.row.makerAttachmentUrl)) {
                    return <a href={params.row.makerAttachmentUrl}>{params.row.makerAttachmentUrl}</a>
                }
                return (
                    <div>{params.row.makerAttachmentUrl}</div>
                )
            },
        },
        {
            field: 'requestDate', headerName: 'Request Create Date',
            minWidth: 200,
            sortable: false,
            align: "center",
            valueGetter: (params) => params.row?.openDate ? new Date(params.row.openDate) : "",
        },
        {
            field: 'actionButton',
            headerName: 'Action',
            align: "center",
            width: 140,
            renderCell: (params) => {
                return (
                    <Button
                        style={{ borderRadius: "20px" }}
                        onClick={() => {

                            navigate(`/cms/customerDetail/${params.row.customerId}`)
                        }}
                        size="small"
                        variant="contained"
                        endIcon={<SendIcon />}>
                        Details
                    </Button>
                )
            },
        },
    ], [navigate]);
    return columns;
}

const useCaseListColumn = () => {
    const columns = React.useMemo(() => {
        return [
            // { field: 'id', headerName: 'ID', minWidth: 70, sortable: false },
            {
                field: 'fcmAlertId',
                headerName: 'Alert ID',
                minWidth: 130,
                sortable: false,
                headerAlign: 'center',
                align: "center",
            },
            {
                field: 'fcmCaseId',
                headerName: 'Case Id',
                minWidth: 130,
                sortable: false,
                headerAlign: 'center',
                align: "center",
            },
            // { field: 'name', flex: 1, headerName: 'Name', minWidth: 130, sortable: false },
            {
                field: 'alertDate', headerName: 'Alert Date',
                flex: 1.5,
                headerAlign: 'center',
                minWidth: 200,
                sortable: false,
                align: "center",
                valueGetter: (params) => params.row?.openDate ? new Date(params.row.openDate) : "",
            },
            {
                field: 'dayOld',
                headerName: 'Day Old',
                minWidth: 130,
                flex: 1,
                sortable: false,
                headerAlign: 'center',
                align: "center",
            },
            {
                field: 'status',
                headerAlign: 'center',
                headerName: 'Status',
                minWidth: 130,
                renderCell: (params) => {
                    let status = params?.row?.status ?? "Open";
                    if (status.toUpperCase() === "OPEN" && params?.row?.rejected === true) {
                        status = "REJECT"
                    }
                    return (
                        <Chip label={params?.row?.status ?? "Open"} variant="outlined" />
                    )
                },
                sortable: false,
                align: "center"
            },
            // {
            //     field: 'dueDate',
            //     headerName: 'Due Date',
            //     minWidth: 130,
            //     flex: 1,
            //     sortable: false,
            //     headerAlign: 'center',
            // },
            {
                field: 'ruleId',
                headerName: 'Rule Id',
                minWidth: 130,
                flex: 1,
                sortable: false,
                headerAlign: 'center',
                align: "center",
            },
            {
                field: 'ruleName',
                headerName: 'Rule Name',
                minWidth: 130,
                flex: 1,
                sortable: false,
                headerAlign: 'center',
                align: "center",
            },
        ];
    }, [])
    return columns
}

const useApprovalRequestColumn = () => {
    const column = useMemo(() => {
        return [
            {
                field: 'status',
                flex: 1,
                headerAlign: 'center',
                headerName: 'Status',
                minWidth: 130,
                renderCell: (params) => {
                    return (
                        <Chip label={params?.row?.status ?? "Open"} variant="outlined" />
                    )
                },
                sortable: false,
                align: "center",
            },
            {
                field: 'caseList',
                headerName: 'Case List',
                minWidth: 250,
                flex: 1,
                sortable: false,
                headerAlign: 'center',
                valueGetter: (params) => params.row.caseList.replace(/;/g, " ")
            },
            // { field: 'id', headerName: 'ID', minWidth: 70, sortable: false },
            {
                field: 'assignedMaker',
                headerName: 'Assigned Maker',
                minWidth: 130,
                sortable: false,
                headerAlign: 'center',
                align: "center",
            },
            {
                field: 'actualMaker',
                headerName: 'Actual Maker',
                minWidth: 130,
                sortable: false,
                headerAlign: 'center',
                align: "center",
            },
            // { field: 'name', flex: 1, headerName: 'Name', minWidth: 130, sortable: false },
            {
                field: 'assignedApprover',
                headerName: 'Assigned Approver',
                flex: 1.5,
                headerAlign: 'center',
                minWidth: 150,
                sortable: false,
                align: "center",
            },
            {
                field: 'actualApprover',
                headerName: 'Actual Approver',
                flex: 1.5,
                headerAlign: 'center',
                minWidth: 130,
                sortable: false,
                align: "center",
            },
            {
                field: 'makerAttachmentUrl',
                flex: 1, 
                headerName: 'Link',
                headerAlign:"center",
                minWidth: 200,
                sortable: false,
                align: "center",
                renderCell: (params) => {
                    if (validURL(params.row.makerAttachmentUrl)) {
                        return <a href={params.row.makerAttachmentUrl}>{params.row.makerAttachmentUrl}</a>
                    }
                    return (
                        <div>{params.row.makerAttachmentUrl}</div>
                    )
                },
            },
            {
                field: 'makerComment',
                headerName: 'Maker Comment',
                minWidth: 180,
                flex: 1,
                sortable: false,
                headerAlign: 'center',
                align: "center",
            },
            {
                field: 'approverComment',
                headerName: 'Approver Comment',
                minWidth: 180,
                flex: 1,
                sortable: false,
                headerAlign: 'center',
                align: "center",
            },
            // {
            //     field: 'investigationResult',
            //     headerName: 'Investigation Result',
            //     minWidth: 180,
            //     flex: 1,
            //     sortable: false,
            //     headerAlign: 'center',
            //     align: "center",
            // },
            // {
            //     field: 'reviewResult',
            //     headerName: 'Review Result',
            //     minWidth: 130,
            //     flex: 1,
            //     sortable: false,
            //     headerAlign: 'center',
            //     align: "center",
            // },
            {
                field: 'requestDate',
                headerName: 'Request Datetime',
                minWidth: 180,
                flex: 1,
                sortable: false,
                headerAlign: 'center',
                align: "center",
                valueGetter: (params) => params.row?.requestDate ? new Date(params.row.requestDate) : "",
            },
            {
                field: 'approverActionDate',
                headerName: 'Approver Datetime',
                minWidth: 180,
                flex: 1,
                sortable: false,
                headerAlign: 'center',
                align: "center",
                valueGetter: (params) => params.row?.approverActionDate ? new Date(params.row.approverActionDate) : "",
            }

        ];
    }, [])
    return column;
}

export { useMakerQueueListColumn, useAlertListColumn, useApproverQueueListColumn, useCaseListColumn, useApprovalRequestColumn }