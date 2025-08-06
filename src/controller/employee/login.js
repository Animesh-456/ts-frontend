import axios from "axios"
import { useSetAtom } from "jotai";
import useratom from "../../jotai/atom";
import { backendURL } from "../../common/links";
const URL = 'http://localhost:4000';

const login = async (user) => {

    try {
        const resp = await axios.post(`${backendURL}/login`, user);
        const usrstatus = JSON.stringify(resp.data.resp);
        let data = JSON.stringify(resp.data.usr);
        let obj = {
            id: `${String(resp.data.usr._id)}`,
            fname: `${String(resp.data.usr.fname)}`,
            lname: `${String(resp.data.usr.lname)}`,
            email: `${String(resp.data.usr.email)}`,
            account_type: `${String(resp.data.usr.account_type)}`,
            token: `${String(resp.data.token)}`
        }
        localStorage.setItem("empdetails", JSON.stringify(obj))
        // useratom = useSetAtom(JSON.stringify(obj));
        //useratom.write(JSON.stringify(obj))
        return data
    } catch (error) {
        throw error
    }
}

export default login