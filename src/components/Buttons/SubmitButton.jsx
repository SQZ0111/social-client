import React from 'react'
import { Button } from "@mui/material";

export default function SubmitButton({text,heightVal,widthVal,postionVal,onHandleClick,justifySelf,alignSelf,type}) {
    return(
    <Button
        onClick={onHandleClick}
        variant='text'
        type={type}
        sx={{
        width: widthVal ? widthVal : "20vw",
        height: heightVal ? heightVal : "20vh",
        backgroundColor: "success.main",
        color: "text.primary",
        borderRadius: "15%",
        top: "10%",
        position: postionVal ? postionVal : "relative",
        justifySelf: justifySelf ? justifySelf : null,
        alignSelf: alignSelf ? alignSelf : null
    }}

    >{text}</Button>
    )
}