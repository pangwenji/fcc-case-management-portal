const passwordTempStorage = { // as a temp solution, pass the username and password to every protected role
    "username": "",
    "password": ""
}

const credentialsHelper = {
    getUserCredentials(){
        return passwordTempStorage;
    },
    setUserCredentials({password, username}){
        passwordTempStorage.password = password;
        passwordTempStorage.username = username;
    }
}
