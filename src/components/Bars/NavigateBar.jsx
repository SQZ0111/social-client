import LoginIcon from '@mui/icons-material/Login';
import ClickableExtendButtons from '../Buttons/ClickableExtendButtons';
import { Box } from '@mui/system';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import StarsIcon from '@mui/icons-material/Stars';
import React from "react";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';



export default function NavigateBar({handleLogout}) {

    return(
        <>
         <Box sx={{
             height: "30%",
             width: "100%",
             display: "flex",
             flexDirection: "column",
             justifyContent: "flex-start",
             backGroundColor: "success.main"
         }}>
            <ClickableExtendButtons element={<LoginIcon
            sx={{
                display: "block",
                width: "32px",
                height: "32px",
                color: "text.primary",
                borderRadius: "15%"
            }}
            />} handleClick={handleLogout} text={"Logout"}/>
            
            <ClickableExtendButtons navigateUrl={"/feed"} element={<ChatOutlinedIcon sx={{
                width: "32px",
                height: "32px",
                color: "text.primary",
                borderRadius: "15%"
            }}
            />} text={"Feed"}/>
            <ClickableExtendButtons element={<AccountCircleOutlinedIcon sx={{
                width: "32px",
                height: "32px",
                color: "text.primary",
                borderRadius: "15%"
            }}
            />} text={"Profil"}/>
                <ClickableExtendButtons navigateUrl={"/savedPosts"}  element={
                <StarsIcon  sx={{
                    width: "32px",
                    height: "32px",
                    color: "text.primary",
                    borderRadius: "15%"
                }}
                />} text={"Saved"}/>
                <ClickableExtendButtons navigateUrl={"/calendar"} element={<CalendarMonthIcon
                sx={{
                    display: "block",
                    width: "32px",
                    height: "32px",
                    color: "text.primary",
                    borderRadius: "15%"
                }}
                />}  text={"Calendar"}/>
         </Box>
        </>
    );
}