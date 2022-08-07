class ApiError {
    constructor(status, message, detail){
        this.message= message;
        this.status = status;
        this.detail = detail
    }
}

export default ApiError;