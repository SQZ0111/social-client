
import axios from "axios";
import showNotification from "../components/ShowNotficationCard/showNotification";
import { getPostFromBackend } from "./getPostsFromDatabaseAndSet";


const addLike = async(id,posts,setCallBackFunc) => {
    //Probiert einmal mit e.prenventDefault und ohne
    
    e.preventDefault();
    const newPosts = await Promise.all(
        posts.map(async(post) => {
            try {
                if(post.id === id) {
                    const token = localStorage.getItem("token");
                    console.log(`Token before request ${token}`);
                    const postId = post.id;
                    const config = {
                        url: `${import.meta.env.VITE_BACKEND_URL}/api/postAction/${postId}/like`,
                        method: "Post",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        },  
                    }
                    console.log(config);
                    const response = await axios(config);
                    console.log(response);
                    showNotification(response.data.message,"normal");
                    getPostFromBackend(setCallBackFunc);
                }

            } catch(error) {
                console.log(localStorage.getItem("token"));
                console.log(`error: ${error.response.data.message}`);
                showNotification(error.response.data.message, "red")
            }
        })
    )
}

const postEventToDatabase = async(token,formData) => {
    try {
        const config = {
            url: `${import.meta.env.VITE_BACKEND_URL}/api/postAction/createEvent`,
            method: "post",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            data: formData
        }
        const response = await axios(config);
        showNotification(response.data.message, "normal")
    } catch(e) {
        showNotification(error.response.data.message, "red")
    }
    
}

export {addLike,postEventToDatabase};