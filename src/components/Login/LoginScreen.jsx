import React from 'react'
import { Box } from "@mui/material";
import Headline from "../Headers/Headline";
import TextfieldLogin from "../Textfields/TextFieldLogin";
import QuoteCard from "../Cards/QuoteCard";
import SubmitButton from "../Buttons/SubmitButton";
import SmallHelperText from "../Texts/SmallHelperText";
import {GoogleButton, AppleButton} from "../Buttons/SsoButtons";
import { useRef } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import showNotification from '../ShowNotficationCard/showNotification';

export default function LoginScreen({handleLogin}) {
    const navigator = useNavigate();
    const valueEmail = useRef();
    const valuePassword = useRef();
    const handleClick = async(e) => {
        //1. Schritt: Reload des Browser verhindern (event)
        e.preventDefault();
        const data = {
            email: valueEmail.current.value,
            password: valuePassword.current.value
        };
        const config = {
            url: `${import.meta.env.VITE_BACKEND_URL}/api/login`,
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            data: data
        }
        try{
            const response = await axios(config);
            localStorage.setItem("token",response.data.token);
            handleLogin();
            showNotification(response.data.message,"normal");
            //navigator
            navigator("/feed");
        } catch(error) {
            showNotification(error.response.data.message,"red");
        }
    }
    return(
        <Box sx={{
            width: "100vw",
            height: "100vh",
            display: "grid",
            gridTemplateRows: "15% 65% 20%",
            fontSize: "32px"
        }}>
        <Headline weight={"200%"}/>
        <Box sx={{
            width: "100%",
            height: "100%",
            display: "grid",
            gridTemplateColumns: "50% 50%",
            // border: "2px solid red"
        }}>
            <Box sx={{
            width: "100%",
            height: "100%",
            
            // border: "2px solid green"
        }}>
            <TextfieldLogin valueEmail={valueEmail} valuePassword={valuePassword}/>
        </Box>
        <Box sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // border: "2px solid yellow"
        }}>
        
            <QuoteCard/>
        </Box>
        </Box>
        <Box sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            rowGap: "10%",
            // border: "2px solid blue"
        }}>
            <SubmitButton onHandleClick={(e) => handleClick(e)} text={"Login"} heightVal={"20%"}/>
            <SmallHelperText text={"or continue with"}/>
            <Box 
            sx={{
                width: "80vw",
                display: "flex",
                gap: "1%",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <GoogleButton/>
                <AppleButton/>
            </Box>
        </Box>
        </Box>
    )
}