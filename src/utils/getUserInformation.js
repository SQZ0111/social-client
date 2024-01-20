import axios from "axios"
import showNotification from "../components/ShowNotficationCard/showNotification";
//get all user to assign to calender task
const getUserInformationName = async(setCallBack) => {
    const token = localStorage.getItem('token');
    const config = {
        url: `${import.meta.env.VITE_BACKEND_URL}/api/userInformation`,
        method: "get",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }
    const response = await axios(config);
    showNotification(response.data.message,"normal");
    setCallBack(response.data.username);
}

const getUserNames = async(setCallBack) => {
    const config = {
        url: `${import.meta.env.VITE_BACKEND_URL}/api/userInformation/usernames`,
        method: "get",
        headers: {
            "content-type": "application/json"
        }
    }
    const response = await axios(config);
    console.log(response);
    setCallBack(response.data.users);
}

const getEvents = async(setCallBack) => {
    const config = {
        url: `${import.meta.env.VITE_BACKEND_URL}/api/userInformation/getEvents`,
        method: "get",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        }
    };
    const response = await axios(config);

    setCallBack(response.data.events);

}


export {getUserInformationName,getUserNames,getEvents};