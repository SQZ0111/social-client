import React,{Fragment,useState} from "react"
import { Modal,Box } from "@mui/material"
import EventPreviewCard from "../Cards/EventPreviewCard";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "60%",
    height: "90%",
    display: "flex",
    flexDirection: "column",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    gap: "5%",
    overflowY: 'auto',
    overflowX: 'hidden',
    '&::-webkit-scrollbar': {
        display: 'none',
      },
    msOverflowStyle: 'none',
    scrollbarWidth: 'none', 
  
}; 

const PreviewEventModal = ({day,previewOpen,onPreviewModal,dateAccordingEvents,setDateAccordingEvents}) => {


    return(
        <>
            <Modal            
            open={previewOpen}
            onClose={() => onPreviewModal()}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
                <Box sx={style}>
                    {
                        dateAccordingEvents?.map((event) => {
                            return(
                                <Fragment key={event._id}>
                                    <EventPreviewCard dateAccordingEvents={dateAccordingEvents} eventName={event.eventName}
                                    owner={event.owner} timeFrom={event.timeFrom} timeTo={event.timeTo} participants={event.participants} additionalInfo={event.additionalInfo} setDateAccordingEvents={setDateAccordingEvents}/>
                                </Fragment>
                            )
                        })
                    }
                </Box>
            </Modal>
        </>
    )
}

export default PreviewEventModal;