import React, { useEffect,useState } from 'react';
import { Box, Typography } from '@mui/material';

const CommentCard = ({ user, text, color, timeStamp }) => {
  const [formattedText,setFormattedText] = useState(text);
  // const setMaximumCharacterAtLine = (text) => {
  //     return text.replace(/(.{60})/g, '$1\n');
  // }
  const styles = {
    card: {
      height: '20%',
      width: '100%',
      backgroundColor: color,
      color: '#ffffff',
      border: '1px solid #ff33cc',
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
      padding: 2,
      borderRadius: 2,
      margin: 2,
      display: 'grid',
      gridTemplateAreas: `
        'user timeStamp'
        'text text'
      `,
      gridTemplateColumns: '1fr auto',
      alignItems: 'start',
    },
    userText: {
      gridArea: 'user',
      padding: '2px',
      fontSize: '14px',
      
    },
    commentText: {
      gridArea: 'text',
      width: '60%',
      padding: '1px',
      fontSize: '14px',
      maxHeight: '200px',
      overflowY: 'auto',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
      msOverflowStyle: 'none',  /* IE and Edge */
      scrollbarWidth: 'none',  /* Firefox */
    },
    timeStampText: {
      gridArea: 'timeStamp',
      fontSize: '12px',
      textAlign: 'right',
    }
  };
  // useEffect(() => {
  //   const updatedText = setMaximumCharacterAtLine(text);
  //   setFormattedText(updatedText);
  // },
  // [])

  return (
    <Box sx={styles.card}>
      <Typography sx={styles.userText} variant="body1">
        {user}
      </Typography>
      <Typography sx={styles.commentText} variant="body1">
        {formattedText}
      </Typography>
      <Typography sx={styles.timeStampText} variant='body1'>
        {timeStamp}
      </Typography>
    </Box>
  );
}

export default CommentCard;
