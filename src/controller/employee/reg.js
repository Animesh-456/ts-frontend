import axios from "axios"
import { backendURL } from "../../common/links";
const add = async (user) => {


    try {

        const response = await axios.post(`${backendURL}/register`, user);
        var usr = JSON.stringify(user);
        localStorage.setItem("empdetails", usr)
        return response
    } catch (error) {
        throw error
    }

}

export default add