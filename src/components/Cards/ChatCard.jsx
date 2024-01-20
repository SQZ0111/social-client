import React from 'react';
import { Box } from "@mui/material";

const ChatCard = ({ text,owner }) => {
    return (
        <Box sx={{
            width: '80%', 
            minHeight: '30%',
            maxHeight: '50%',
            overflowY: 'auto',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
            msOverflowStyle: 'none', 
            scrollbarWidth: 'none',  
            backgroundColor: owner == "user" ? 'white' : "#00008b", 
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            alignSelf: owner == "user" ? 'flex-start' : 'flex-end',
            justifyContent: 'center', 
            fontSize: "10px",
            fontFamily: 'cursive',
            maxWidth: "100ch",
            padding: '10px', 
            borderRadius: '10px', 
            margin: '10px 0',
            color: owner == "user" ? 'black' : "white"

        }}>
            {text}
        </Box>
    );
};

export default ChatCard;