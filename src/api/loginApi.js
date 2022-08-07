import Axios from "./baseAxios";
import handleErrorHelper from "./helper/handleErrorHelper";

const loginService = async ({username, password}) => {      
      var config = {
        method: 'post',
        url: '/login',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : JSON.stringify({
            "username": username,
            "password": password
          })
      };
      try{
        let response = await Axios(config);
        let data = response.data;
        return data;
      }catch(e){
         throw handleErrorHelper(e);
      }
}

export {loginService};
