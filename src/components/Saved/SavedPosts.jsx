import React from "react";
import { Box,Typography } from "@mui/material";
import { useState,useEffect } from "react";
import HomeIcon from '@mui/icons-material/Home';
import ClickableExtendButtons from "../Buttons/ClickableExtendButtons";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PostCard from "../Cards/PostCard";

//utils
import { getUserInformationName } from "../../utils/getUserInformation";

const SavedPosts = ({handleLogout,posts,setPosts}) => {
    const [expand,setExpand] = useState(true);
    const [username,setUsername] = useState("User");
    const [storedPosts,setStoredPosts] = useState([]);
    useEffect(() => {
        const retrievedPosts = JSON.parse(localStorage.getItem("storedPosts"));
        setStoredPosts(retrievedPosts);
        getUserInformationName(setUsername);
    },[])
    return(
        <>
           <Box 
                sx={{
                    height: "100vh",
                    width: "100vw",
                    overflowY: "scroll",
                    display: "grid",
                    gridTemplateColumns: "10% 90%",
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
                        display: "grid",
                        gridTemplateRows: "10% 10% 80%",
                        justifyContent: "center"
                    }}>
                        <Typography variant="h3" component="h2">
                            Welcome User - {username}
                            </Typography>
                            <Typography variant="h3" component="h3">
                            Here are your saved posts listed
                        </Typography>
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
                                
                                    storedPosts?.map((post) => {
                                        return(
                                            <>
                                                <PostCard key={post.id} id={post.id} pictureUrl={post.pictureUrl} 
                                                title={post.title} place={post.place} instaLink={post.instaLink} cost={post.cost} heart={post.heart} posts={posts} setPosts={setPosts} createdBy={post.createdBy}/>             
                                            </>
                                        )})
                                    
                                }
                        </Box>
                    </Box>
            </Box>
        
        </>
    );

}

export default SavedPosts;