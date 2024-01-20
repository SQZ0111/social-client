import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import {Button} from "@mui/material"
import DeleteDialog from '../Dialogs/DeleteDialog';
import axios from "axios"
import {useState} from "react"

export default function DeletePostButton({id,posts,setPosts,createdBy,getPostFromBackend}) {
    //const [continueDelete,setContinueDelete] = useState(false);
    const [canDelete,setCanDelete] = useState(false);
    const [open,setOpen] = useState(false);
    
    const handleDeleteCheck = async() => {
        try {
            const config = {
                url: `${import.meta.env.VITE_BACKEND_URL}/api/postAction/check`,
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
            }
    
                const response = await axios(config);

                console.log(response.data.userId, createdBy);
                if(response.data.userId == createdBy) {
                    setCanDelete(true);
                } else {
                    setCanDelete(false);
                }
        } catch(e) {
            console.log(response.data.message);
        }

        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    return(
        <>
            <Button onClick={handleDeleteCheck} variant="contained"><DeleteIcon/></Button>
            <DeleteDialog open={open} handleClose={handleClose} id={id} posts={posts} getPostFromBackend={getPostFromBackend}  setPosts={setPosts} canDelete={canDelete} />
        </>
    )
}