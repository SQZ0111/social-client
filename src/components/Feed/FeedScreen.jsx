import React from 'react'

import { Box } from "@mui/material"
import HomeIcon from '@mui/icons-material/Home';
import ClickableExtendButtons from "../Buttons/ClickableExtendButtons";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useState,useEffect } from "react";
import PostCard from "../Cards/PostCard";
import SubmitButton from "../Buttons/SubmitButton";
import PostModal from "../Modals/PostModal";
import ChatbotCard from '../Cards/ChatbotCard';
//utils
import { getPostFromBackend } from '../../utils/getPostsFromDatabaseAndSet';

export default function Feed({handleLogout,posts,setPosts}) {
    const [open,setOpen] = useState(false);

    const onModal = () => {
        setOpen(!open)
    }
    const [expand,setExpand] = useState(true);
    // const [posts,setPosts] = useState([]);
      
    // useEffect(() => {
    //     getPostFromBackend(setPosts);
    // }, []);

    return(
        <>
            <Box 
            sx={{
                height: "100vh",
                width: "100vw",
                overflowY: "scroll",
                display: "grid",
                gridTemplateColumns: "10% 65% 25%",
                fontSize: "32px"

            }}> 
                <Box sx={{
                    alignItems: "flex-start",
                    flexWrap: "wrap",
                    height: "100%",
                    width: "100%"
                }}>
                    <ClickableExtendButtons element={<HomeIcon sx={{
                        display: "block",
                        width: "32px",
                        height: "32px",
                        color: "text.primary",
                        borderRadius: "15%"
                    }}
                    />}/>
                    <ClickableExtendButtons element= {expand ? <ExpandMoreIcon sx={{
                        display: "block",
                        width: "32px",
                        height: "32px",
                        color: "text.primary",
                        borderRadius: "15%"
                    }}
                    /> : <KeyboardArrowUpIcon sx={{
                        display: "block",
                        width: "32px",
                        height: "32px",
                        color: "text.primary",
                        borderRadius: "15%"
                    }}/>
                    } handleLogout={handleLogout} handleParam={!expand} handleClick={setExpand}/>
                </Box>
                <Box sx={{
                    height: "100%",
                    width: "100%",
                    rowGap: "10vh",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "flex-start"
                }}>
                    {
                
             
                    posts.map((post) => {
                        return(
                            <>
                                <PostCard key={post.id} id={post.id} pictureUrl={post.pictureUrl} 
                                title={post.title} place={post.place} instaLink={post.instaLink} cost={post.cost} heart={post.heart} posts={posts} setPosts={setPosts} createdBy={post.createdBy}/>             
                            </>
                        )})
                    }


                </Box>
                
                <Box sx={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
        
                    rowGap: "20%"
                }}>
                    <SubmitButton text={"Make new Bond ➕"} postionVal={"sticky"} onHandleClick={onModal}/>
                    {/* add the modal when the button is clicked else nothing*/}
                    <ChatbotCard/>

                </Box>
                    {open ? <PostModal open={open} setOpen={setOpen} posts={posts} setPosts={setPosts}/> : null}
 

            </Box>
        </>
    );
}