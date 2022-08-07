import Axios from "./baseAxios";
import handleErrorHelper from "./helper/handleErrorHelper";

const customerInfoService = async (customerId) => {
    var config = {
        method: 'get',
        url: `/api/v1/customerDetails/customerInfo/${customerId}`,
    };
    try {
        let response = await Axios(config);
        let data = response.data;
        return data;
    } catch (e) {
        throw handleErrorHelper(e);
    }
}

const approverListService = async () => {
    var config = {
        method: 'get',
        url: `/api/v1/getApproverList`,
    };
    try {
        let response = await Axios(config);
        let data = response.data;
        return data;
    } catch (e) {
        throw handleErrorHelper(e);
    }
}

const buttonStatusService = async (customerId) => {
    var config = {
        method: 'get',
        url: `/api/v1/customerDetails/customerInfo/renderButton/${customerId}`,
    };
    try {
        let response = await Axios(config);
        let data = response.data;
        return data;
    } catch (e) {
        throw handleErrorHelper(e);
    }
}

const approvalRequestListService = async ({ offset = 0, limit = 10, customerId }) => {
    var config = {
        method: 'get',
        url: `api/v1/customerDetails/approvalList/${customerId}?offset=${offset}&limit=${limit}`,
    };
    try {
        let response = await Axios(config);
        let data = response.data;
        return data;
    } catch (e) {
        throw handleErrorHelper(e);
    }
}

const openCaseListService = async ({ offset = 0, limit = 10, customerId }) => {
    var config = {
        method: 'get',
        url: `api/v1/customerDetails/openList/${customerId}?offset=${offset}&limit=${limit}`,
    };
    try {
        let response = await Axios(config);
        let data = response.data;
        return data;
    } catch (e) {
        throw handleErrorHelper(e);
    }
}

const closeCaseListService = async ({ offset = 0, limit = 10, customerId }) => {
    var config = {
        method: 'get',
        url: `api/v1/customerDetails/closeList/${customerId}?offset=${offset}&limit=${limit}`,
    };
    try {
        let response = await Axios(config);
        let data = response.data;
        return data;
    } catch (e) {
        throw handleErrorHelper(e);
    }
}

const pickCase = async (customerId ) => {
    var config = {
        method: 'get',
        url: `api/v1/customerDetails/pickCase/${customerId}`,
    };
    try {
        let response = await Axios(config);
        let data = response.data;
        return data;
    } catch (e) {
        throw handleErrorHelper(e);
    }
}

const confirmApprovalRequest = async ({customerId, approverId, makerComment, makerUrl}) => {
    var config = {
        method: 'post',
        url: `api/v1/customerDetails/confirmApprovalRequest`,
        data : {customerId, approverId, makerComment, makerUrl}
    };
    try {
        let response = await Axios(config);
        let data = response.data;
        return data;
    } catch (e) {
        throw handleErrorHelper(e);
    }
}

const handleApprovalRequest  = async ({customerId, approverComment, isAccept}) => {
    var config = {
        method: 'post',
        url: `api/v1/customerDetails/handleApprovalRequest`,
        data : {customerId, approverComment, isAccept: isAccept ? 1 : 0}
    };
    try {
        let response = await Axios(config);
        let data = response.data;
        return data;
    } catch (e) {
        throw handleErrorHelper(e);
    }
} 

export {
    buttonStatusService,
    customerInfoService,
    approvalRequestListService,
    openCaseListService,
    closeCaseListService,
    pickCase,
    confirmApprovalRequest,
    handleApprovalRequest,
    approverListService
};
