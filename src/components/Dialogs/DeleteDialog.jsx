import React from "react";
import {Dialog,DialogTitle,DialogContent,DialogContentText,DialogActions,Button} from "@mui/material"
import {useState} from "react"
import axios from "axios"

export default function DeleteDialog({open,handleClose,id,posts,setPosts,
canDelete,getPostFromBackend}){
    //Delete func
    const deletePost = async() => {
        const config = {
            url: `${import.meta.env.VITE_BACKEND_URL}/api/postAction/delete/${id}`,
            method: "delete",
            headers: {
                "Content-Type": "application/json"
            }
        }
        const response = await axios(config);
        console.log(response);
        getPostFromBackend(setPosts);
        handleClose();
    }

    return(
        <>
            {canDelete && <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                {"Delete Post?"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Deleting Post will remove it from the feed.
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={deletePost} autoFocus>
                    Delete
                </Button>
                </DialogActions>
            </Dialog> }
            {!canDelete && <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                {"Not your POST?"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    You can´t delete posts of others.Why would you try that out?🤔
                </DialogContentText>
                </DialogContent>
            </Dialog>}
        </>
    );
}