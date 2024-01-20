import React from "react"
import { DateTime } from 'luxon';
import Box from '@mui/material/Box';
import { TextField } from "@mui/material";
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CommentCard from "../Cards/CommentCard";
import { useRef,useEffect,useState } from "react";
import axios from "axios";
import showNotification from "../ShowNotficationCard/showNotification";
import { getPostFromBackend } from "../../utils/getPostsFromDatabaseAndSet";
const CommentStyles = {
    box: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        height: '90vh',
        width: '90vw',
        display: 'grid',
        gridTemplateRows: '5% 80% 15%',
        justifyItems: 'center',
        gap: '3%',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    },
    commentBox : {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
        overflowX: 'hidden',
        '&::-webkit-scrollbar': {
            display: 'none',
          },
          msOverflowStyle: 'none',  /* IE and Edge */
          scrollbarWidth: 'none',  /* Firefox */
    },


};






const CommentModal = ({open,setOpen,id,posts,setPosts}) => {
    const [token,setToken] = useState("None");
    const [comments,setComments] = useState([]);
    const textfieldRef = useRef();
    const sendComment = async(e) => {
        try {
            e.preventDefault();
            const userComment = textfieldRef.current.commentTextfield.value;
            const commentTime = getTwitterLikeTime();
            const commentData = {
                postId: id,
                comment: userComment,
                time: commentTime
            }
            const config = {
                url: `${import.meta.env.VITE_BACKEND_URL}/api/postAction/comment`,
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                data: commentData
            }
            const response = await axios(config);
            showNotification(response.data.message,"normal");
            getPostFromBackend(setPosts);
        } catch(e) {
            showNotification("post comment did not word","red");
        }
    }
    const filterPostOnId = () => {
        return posts.filter((element) => {
            return element.id == id ? element : false
        })
    }
    const setCommentsOnFilter = () => {
        console.log(filterPostOnId()[0].comments);
        if(filterPostOnId() != false) {
            const postWithComment = filterPostOnId();
            setComments(postWithComment[0].comments);
        }
    
    }
    const stringToColor = (string) => {
        let hash = 0;
        for (let i = 0; i < string.length; i++) {
          hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }
      
        let color = '#';
        for (let i = 0; i < 3; i++) {
          const value = (hash >> (i * 8)) & 0xFF;
          color += ('00' + value.toString(16)).substr(-2);
        }
        return color;
      };
      const getTwitterLikeTime = () => {
        return DateTime.now().toFormat('HH:mm');
      };
    useEffect(() =>{
        setCommentsOnFilter();
        setToken(localStorage.getItem("token"));
    } ,[posts])
    return(
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-comments"
            >
            <Box sx={CommentStyles.box}>
                <Typography id="modal-modal-title" variant="h4" component="h2">
                    Share Your Thoughts🍁
                </Typography>
                <Box sx={CommentStyles.commentBox}>
                    {
                        comments.map((element) => {
                            const color = stringToColor(element.user);
                            return(
                                <CommentCard user={element.user} text={element.commented} color={color} timeStamp={element.timeStamp}/>
                            )
                            
                        })
                    }
                </Box>
                    <Box
                     component='form'
                     ref={textfieldRef} 
                     onSubmit={(e) => sendComment(e)}>
                        <TextField 
                                sx={CommentStyles.textField}
                                required
                                id="comment-textfield"
                                label="Comment Your Thought"
                                defaultValue="Hi y´all"
                                variant="standard"
                                onSubmit
                                name="commentTextfield"
                        />
                    </Box>
            </Box>
        </Modal>
    )
}

export {CommentModal}