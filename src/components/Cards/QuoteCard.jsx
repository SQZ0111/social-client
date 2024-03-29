import React from 'react'
import { Box } from "@mui/material";
import { useState } from "react";
import {Button} from "@mui/material";
import axios from "axios"

const handleLoad = async(handleAuthor,handleQuote) => {

    const resp = await axios("https://api.quotable.io/random");
    handleAuthor(resp.data.author);
    handleQuote(resp.data.content);
    console.log(resp.data);

}

export default function QuoteCard() {
    const [author,setAuthor] = useState("Unknown");
    const [quote,setQuote] = useState("Birth is a new Bond");

    return(
        <Box 
        component="form" 
        sx={{
            width: "40%",
            height: "80%",
            backgroundColor: "background.paper",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "50%",
            textAlign: "center",
            boxShadow: "box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;"
            
        }}>
            <p>{`${quote} - ${author}`}</p>
            <Button onClick={() => handleLoad(setAuthor,setQuote)}>Inspire me</Button>
        </Box> 
    )
}