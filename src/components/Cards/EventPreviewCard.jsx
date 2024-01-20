import React,{useState,Fragment} from "react"
import { Box,Typography } from "@mui/material"


const EventPreviewCard = ({dateAccordingEvents,eventName,timeTo,timeFrom,setDateAccordingEvents,owner,additionalInfo,participants}) => {
    const [showSingleEvent,setShowSingleEvent] = useState(false);
    const [singleEvent,setSingleEvent] = useState(null);
    const filterEventToShow = (e) => {
        const choosenEvent = dateAccordingEvents.filter((event) => {
            return e.target.textContent == event.eventName;
        });
        console.log(choosenEvent);
        setSingleEvent(choosenEvent);
        setShowSingleEvent(true);
        setDateAccordingEvents(choosenEvents);
    }
    if(showSingleEvent) {
        return(
            <>
                            <Box sx={{
                            backgroundColor: "success.main",
                            height: "40%",
                            width: "100%",
                            color: "text.primary",
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gridTemplateRows: "1fr 1fr",
                            justifyContent: "center",
                            alignItems: "center",
                            textAlign: "center"
                            
                        
                        }}>
                            <Typography>{singleEvent[0].eventName}</Typography>
                            <Typography>{singleEvent[0].owner}</Typography>
                            <Typography>{singleEvent[0].timeFrom}</Typography>
                            <Typography>{singleEvent[0].timeTo}</Typography>
                        </Box>
                        <Box sx={{
                                backgroundColor: "success.main",
                                height: "30%",
                                width: "100%",
                                color: "text.primary",
                                display: "flex",
                                gap: "5%",
                                flexWrap: "wrap",
                                justifyContent: "center",
                                alignItems: "center"
                        }}>
                            {
                                singleEvent[0].participants.map(element => {
                                    return(
                                        <Fragment key={singleEvent[0]._id}>
                                            <Typography>{element}</Typography>
                                        </Fragment>
                                    )
                                })
                            }
                        </Box>
                        <Box sx={{
                                backgroundColor: "success.main",
                                height: "30%",
                                width: "100%",
                                color: "text.primary",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                        }}>{singleEvent[0].additionalInfo}</Box>
                     
                    </>
        )
    }
    return(
        <>
            <Box sx={{
                backgroundColor: "success.main",
                height: "20%",
                width: "100%",
                color: "text.primary",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Typography onClick={(e) => filterEventToShow(e)}>
                    {eventName}
                </Typography>
            </Box>
        </>
    )
}

export default EventPreviewCard;