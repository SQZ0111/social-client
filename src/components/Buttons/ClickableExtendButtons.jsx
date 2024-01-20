import { Button } from "@mui/material";
import { Box } from "@mui/system";
import NavigateBar from "../Bars/NavigateBar";
import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function ClickableExtendButtons({element,text,handleClick,handleParam,id,posts,setPosts,handleLogout,navigateUrl}) {
  const navigator = useNavigate();
  return (
    <>
      <Box sx={{
        display: "flex"
      }}>
        
          <Button onClick={(e) => {
            if(navigateUrl) {
              console.log(navigateUrl);
              navigator(navigateUrl);
            } 
             else if(handleParam) {
              handleClick(handleParam);
            }
             else {
              handleClick(id,posts,setPosts);
            }}
          }>
            {element}
          </Button>
          {text && <p style={{
            fontSize: "50%",
            color: "text.primary",
            textAlign: "center"
          }}>{text}</p>}
      </Box>
        {handleParam && <NavigateBar handleLogout={handleLogout}/>}
    </>
  );
}