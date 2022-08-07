const isMaker = (roleList = []) => {
    return [...roleList].filter((e) => e === "ROLE_MAKER").length > 0 ? true : false;
}

const isApprover = (roleList = []) => {
    return [...roleList].filter((e) => e === "ROLE_APPROVER").length > 0
}

export {isMaker, isApprover}