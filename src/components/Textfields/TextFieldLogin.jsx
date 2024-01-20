import React from 'react'
import { Box } from "@mui/material";
import TextField from '@mui/material/TextField';
import {Button} from "@mui/material";
import { useState, } from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';


export default function TextfieldLogin({valueEmail,valuePassword}) {

    const [fieldType,setFieldType] = useState(true);
    const navigator = useNavigate();
    const handleNavigate = () => {
        navigator("/register");
    }
    const handleNavigateForgotPassword = () => {
        navigator("/reset/askEmail");
    }
    return(
        <Box
        component="form"
        autoComplete="off"
        sx={{
            display: "flex",
            flexDirection:"column",
            width: "80%",
            height: "100%",
            alignItems:"flex-end",
            justifyContent:"center"
        }}
        >

            <TextField
            sx={{
                width: "30%",
                marginBottom: "10%",
      
            }}
                required
                type="email"
                id="outlined-required"
                label="💌Email"
                defaultValue="email"
                name = "email"
                inputRef={valueEmail}
                />
            
            <TextField
                inputRef={valuePassword}
                sx={{
                    width: "30%",
                  
                    
                }}
                required
                //make typed password hidden
                type={fieldType ? "password" : "text"}
                id="outlined-required"
                label="🔑password"
                defaultValue="password"
                name = "password"
                    // inputRef={valueEmail}
            /><VisibilityIcon onClick={(e) => setFieldType(!fieldType)}/>
            <Box sx={{
                width: "30%",
                display: "flex",
                gap: "30%",
                justifyContent: "start"
            }}>
                <Button 
                onClick = {(e) => handleNavigate()}
                sx={{
                    width: "30%",
                    color:  "text.primary"
     
                }}>Register</Button>
                <Button
                onClick = {(e) => handleNavigateForgotPassword()}
                sx={{
                    width: "30%",
                    color:  "text.primary"
                }}>Forgot Password?</Button>
            </Box>
        </Box>
    )
}