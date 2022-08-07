import Axios from "./baseAxios";
import handleErrorHelper from "./helper/handleErrorHelper";

const alertListService = async ({
  offset = 0,
  limit = 10,
  searchValue = undefined,
}) => {
  let config = {};
  if (
    searchValue !== undefined &&
    searchValue !== null &&
    searchValue.length > 0
  ) {
    config = {
      method: "get",
      url: `/api/v1/list/alertList?offset=${offset}&limit=${limit}&customerId=${searchValue}`,
    };
  } else {
    config = {
      method: "get",
      url: `/api/v1/list/alertList?offset=${offset}&limit=${limit}`,
    };
  }
  try {
    let response = await Axios(config);
    let data = response.data;
    return data;
  } catch (e) {
    throw handleErrorHelper(e);
  }
};

const makerQueueListService = async ({ offset = 0, limit = 10 }) => {
  var config = {
    method: "get",
    url: `/api/v1/list/makerQueueList?offset=${offset}&limit=${limit}`,
  };
  try {
    let response = await Axios(config);
    let data = response.data;
    return data;
  } catch (e) {
    throw handleErrorHelper(e);
  }
};

const approverQueueListService = async ({ offset = 0, limit = 10 }) => {
  var config = {
    method: "get",
    url: `/api/v1/list/approverQueueList?offset=${offset}&limit=${limit}`,
  };
  try {
    let response = await Axios(config);
    let data = response.data;
    return data;
  } catch (e) {
    throw handleErrorHelper(e);
  }
};

export { alertListService, makerQueueListService, approverQueueListService };
