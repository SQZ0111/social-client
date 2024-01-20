import React from 'react'
import customTheme from "../../customTheme/customTheme";
import Headline from "../Headers/Headline";
import { Box, ThemeProvider } from "@mui/material";
import WelcomePicture from "../Pictures/WelcomePicture";
import SubmitButton from "../Buttons/SubmitButton";
import { useNavigate } from 'react-router-dom';

export default function WelcomeScreen(){
    const navigator = useNavigate();
    const handleNavigate = () => {
        navigator("/login");
    }
    return(

        <Box sx={{
            height: "100vh",
            fontSize: "32px",
            width: "100vw",
            display: "flex",
            rowGap: "5%",
            flexDirection: "column",
            alignItems:"center",
        }}>
          <Headline weight={"200%"}/>
          <WelcomePicture/>     
          <SubmitButton onHandleClick={(e) => handleNavigate()} text="Continue"/>
        </Box>   

    )
}