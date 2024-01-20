import React from "react"
import { Button,Box, TextField} from "@mui/material";
import { useState,useEffect } from "react";
import SmartToyIcon from '@mui/icons-material/SmartToy';
import axios from "axios";

import ChatCard from "./ChatCard";

const ChatbotCard = () => {
    const [expand,setExpand] = useState(false);
    const [messageHistory,setMessageHistory] = useState([{"role": "system", "content": "You are a helpful medical assistant. Always greet before replying like 'Hi wonderful human!'. You should explain as if you would explain to a child, friendly and with sympathy.You answer questions about midwifery. Your creator is Saqib Bhatti. That page your are embedded on is a page that should help becoming midwifes that connect with each other. Parents should get helpful information about birth. If asked about your contact details of your create provide 'saqibbhatti.public@gmail.com' as contact email."}]);
    const [inputText, setInputText] = useState(""); 
    useEffect(() => {
        if (JSON.parse(localStorage.getItem("chatHistory")))
            setMessageHistory(JSON.parse(localStorage.getItem("chatHistory")));
    }, []);
    const handleSubmit = (e) => {
        e.preventDefault();
        setMessageHistory(prevMessages => {
            const updatedMessages = [
                ...prevMessages,
                { 'role': 'user', 'content': inputText }
            ];

            localStorage.setItem("chatHistory", JSON.stringify(updatedMessages));
    
            return updatedMessages;
        });
    
        setInputText("");
        handleGPT();

    }
    const handleGPT = async() => {
    
        //console.log(messages);
        const config = {
            url: `${import.meta.env.VITE_BACKEND_URL}/api/chatbot`,
            method: "post",
            headers: {
                "content-type": "application/json"
            },
            data: {
                messageHistory: messageHistory
            }
        }
        const response = await axios(config);
        setMessageHistory(prevMessages => {
            const updatedMessages = [
                ...prevMessages,
                { 'role': 'assistant', 'content': response.data.reply}
            ];

            localStorage.setItem("chatHistory", JSON.stringify(updatedMessages));
    
            return updatedMessages;
        });
        
    }
    const handleButtonClick = (event) => {
        if (event.detail === 0) {
            event.preventDefault();
            return;
        }
        setExpand(!expand);
    }
    
    const boxStyleShort = {
        height: "5vh",
        width: "10vw",
        top: "90vh",
        position: "fixed",
        boxShadow: '0 0 15px 5px #ff69b4, 0 0 20px 10px #00bfff, 0 0 25px 15px #7fff00', // Radiating box-shadow
        backgroundColor: "success.main",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: "10px",
        color: "black",
        padding: '10px', // Dynamic sizing with padding
    };
    const boxStyleLarge = {
        height: "60vh",
        width: "20vw",
        top: "35vh",
        zIndex: "1",
        borderRadius: "10px",
        position: "fixed",
        backgroundColor: "success.main",
        display: "flex",
        flexDirection: "column",
        overflowY: 'scroll',

    }
    if(expand == false) {
        return(
            <>
                <Button onClick={(e) => setExpand(!expand)}>
                    <Box sx={boxStyleShort}>
                        <SmartToyIcon/>
                        <p>Chat with me</p>
                    </Box>
                </Button>     
            </>
        )
    } else if(expand == true) {
        return(
            <>
                <Button onClick={handleButtonClick}>
                    <Box sx={boxStyleLarge}>
                        {
                            messageHistory?.map(message => {
                                if(message.role != "system") {
                                    return(
                                        <ChatCard owner={message.role} text={message.content}/>
                                    ) 
                                }
                            })
                        }
                        

                        <TextField 
                            fullWidth
                            variant="outlined"
                            placeholder="Type a message..."
                            autoFocus
                            value={inputText}
                            onChange={(e) => setInputText(e.currentTarget.value)}
                            onKeyDown={(e) => e.key == "Enter" ? handleSubmit(e)  : null}
                            sx={{
                                postion: "fixed",
                                backgroundColor: "#c0c0c0",
                                width: "90%",
                                bottom: 10,
                                left: 5,
                                right: 5, 
                            }}
                        />
                    </Box>
                </Button>     
            </>
        )
    }
}
export default ChatbotCard
