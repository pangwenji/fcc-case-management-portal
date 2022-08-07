import { useState } from "react";

const openCaseListMock = [

    {   
        "id":'1',
        "customerId": "1000000001", // Customer A
        "alertId": "100004",
        "caseId": "200004",
        "status": "OPEN", //OPEN PENDING CLOSED
        "openDate": "17th-MAY",
        "dayOld":"1",
        "dueDate":"29th-MAY",
        "ruleId":"14",
        "ruleName":"Pass Through"
    },

    {
        "id":'2',
        "customerId": "1000000001",
        "alertId": "100003",
        "caseId": "200003",
        "status": "OPEN", //OPEN PENDING CLOSED
        "openDate": "16th-MAY",
        "dayOld":"2",
        "dueDate":"29th-MAY",
        "ruleId":"23",
        "ruleName":"Similar Amount Transactions"
    },
]

export default openCaseListMock;
