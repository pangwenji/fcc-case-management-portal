import ApiError from "../model/apiError";

const handleErrorHelper = (e) => {
    try{
        let status = e.response.status;
        let body = e.response.data;
        let message = body.message;
        return new ApiError(status, message, body)
    }catch(e){
        return new ApiError();
    }
}

export default handleErrorHelper;