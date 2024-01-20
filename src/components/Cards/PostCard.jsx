import React, { useEffect } from "react";
import { useState } from "react";
import { Box } from "@mui/material";
import Headline from "../Headers/Headline";
import ClickableExtendButtons from "../Buttons/ClickableExtendButtons.jsx";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';
import SavingsOutlinedIcon from '@mui/icons-material/SavingsOutlined';
import SubmitButton from "../Buttons/SubmitButton.jsx";
import Diversity2OutlinedIcon from '@mui/icons-material/Diversity2Outlined';
import StarBorderIcon from '@mui/icons-material/StarBorder';

//custom components
import DeletePostButton from "../Buttons/DeletePostButton.jsx";
import { CommentModal } from "../Modals/CommentModal.jsx";
import showNotification from "../ShowNotficationCard/showNotification.js";
import axios from "axios";
//utils
import { getPostFromBackend } from "../../utils/getPostsFromDatabaseAndSet.js";
import { checkLocalStorageOnPostId,storePost } from "../../utils/storePostsInLocalStorage.js";
export default function PostCard({id,pictureUrl,title,place,instaLink,cost,heart,posts,setPosts,createdBy}) {
    const [open,setOpen] = useState(false);
    const [post,setPost] = useState({
        id: id,
        pictureUrl: pictureUrl,
        title: title,
        place: place,
        instaLink: instaLink,
        cost: cost,
        createdBy: createdBy,
        heart: heart
    });
    const [storedPost,setStoredPost] = useState("unstored");
    const onModal = () => {
        setOpen(!open)
    }
    const addLike = async(id,posts,setPosts) => {
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
                        getPostFromBackend(setPosts);
                    }
   
                } catch(error) {
                    console.log(localStorage.getItem("token"));
                    console.log(`error: ${error.response}`);
                    showNotification(error.response.data.message, "red")
                }
            })
        )
    }

    useEffect(() => {
        const storedPosts = JSON.parse(localStorage.getItem("storedPosts"));
        console.log(storedPosts);
        checkLocalStorageOnPostId(storedPosts,id,setStoredPost);
    },[JSON.parse(localStorage.getItem("storedPosts"))])
    return(
        <>
            <Box sx={{
                height: "45vh",
                width: "80%",
                backgroundColor: "primary.main",
                display: "grid",
                gridTemplateRows: "30% 70%"

            }}>
            <img style={{
                    width: "auto",
                    height: "100%", 
                    justifySelf: "center"
                }}
                alt="Some Picture of post"
                src={pictureUrl}/>
                <Box sx={{
                    display: "grid",
                    gridTemplateRows: "25% 75%",
                }}>
                    <Headline  weight={"28px"} text={title}/>
                    <Box sx={{
                        height: "100%",
                        width: "100%",
                        display: "grid",
                        gridTemplateColumns: "60% 40%"
                    }}>
                        <Box sx={{
                            height: "100%",
                            width: "100%",
                            display: "flex",
                            flexDirection:"column",
                            alignItems: "flex-start",
                            justifyContent: "center"
                        }}>
                                <ClickableExtendButtons element={<LocationOnOutlinedIcon sx={{                        
                                    display: "block",
                                    width: "32px",
                                    height: "32px",
                                    color: "text.primary",
                                    borderRadius: "15%"}}/>} text={place}/>
                                <ClickableExtendButtons element={<LinkOutlinedIcon sx={{                        
                                    display: "block",
                                    width: "32px",
                                    height: "32px",
                                    color: "text.primary",
                                    borderRadius: "15%"}}/>} text={instaLink}/>
                                <ClickableExtendButtons element={<SavingsOutlinedIcon sx={{                        
                                    display: "block",
                                    width: "32px",
                                    height: "32px",
                                    color: "text.primary",
                                    borderRadius: "15%"}}/>} text={cost}/>
                            
                        </Box>
                        <Box sx={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-start",
                            rowGap: "7%",
                            alignItems: "center"
                        }}>
                            
                            <Box sx={{
                                height: "100%",
                                width: "100%",
                           
                                display: "grid",
                                gridTemplateColumns: "80% 20%",
                                
                                
                            }}>

                            
                                <SubmitButton text={"Info 💡"} heightVal={"70%"} widthVal={"60%"} justifySelf={"flex-end"}
                                onHandleClick = {onModal}
                                />
                                <StarBorderIcon 
                                onClick = {(e) => storePost(e,id,setStoredPost,post)}
                                sx={{
                                    height: "auto",
                                    width: "100%",
                                    color: storedPost == "stored" ? "#ffd700" : "#808080",
                                   
                                }}/>
                            </Box>
                            <ClickableExtendButtons handleClick={addLike} id={id} posts={posts} setPosts={setPosts} element={
                                <Diversity2OutlinedIcon sx={{                        
                                    display: "block",
                                    width: "32px",
                                    height: "32px",
                                    color: "text.primary",
                                    borderRadius: "15%"}}/>} text={`${heart} Bonds`}/>
                            {/* Euer Button zum Liken von Posts */}
                            {/* <Button onClick=(e) => {addLike(e,id,posts,setPosts)}*/}
                            <DeletePostButton createdBy={createdBy} id={id} posts={posts} setPosts={setPosts} getPostFromBackend={getPostFromBackend}/>
  
                        </Box>
                    </Box>
                </Box>
                {open ? <CommentModal setPosts={setPosts} posts={posts} open={open} setOpen={setOpen} id={id}/> : null}
            </Box>
        </>
    );
}