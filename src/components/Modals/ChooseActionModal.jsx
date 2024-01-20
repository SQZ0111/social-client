import React,{useState} from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import PreviewIcon from '@mui/icons-material/Preview';
import SubmitButton from '../Buttons/SubmitButton';
import AddEventModal from './AddEventModal';
import PreviewEventModal from './PreviewEventModal';




const ChooseActionModal = ({open,onModal,dateValue,day,events,setEvents})  => {
  const [addOpen,setAddOpen] = useState(false);
  const [previewOpen,setPreviewOpen] = useState(false);
  const [dateAccordingEvents,setDateAccordingEvents] = useState([]);
  //Filter function to filter events which are belonging to "clicked" date.
  const filterEventsOnDate = () => {
      const eventsOnDate = events.filter((event) => {
        return event.date == day;
      })
      console.log(eventsOnDate);
      setDateAccordingEvents(eventsOnDate);
  }

  const onAddModal = () => {
      setAddOpen(!addOpen)
  }
  const onPreviewModal = () => {
    setPreviewOpen(!previewOpen);
  }

  const onClickHandle = (e) => { 
    filterEventsOnDate();
    e.target.textContent == "Add Event" ? onAddModal() : onPreviewModal();
    
  }


  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "80%",
    height: "80%",
    display: "grid",
    gridTemplateRows: "40% 60%",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,

  };
    return (
      <>
        <Modal
          open={open}
          onClose={() => onModal()}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Box sx={{
              height: "100%",
              justifySelf: "center",
              width: "70%",
              display: "flex",
              justifyItems: "center",
              alignItems: "flex-end"
            }}>
                <EditCalendarIcon sx={{
                  height: "50%",
                  width: "50%"
                }} />
                <PreviewIcon sx={{
                  height: "50%",
                  width: "50%"
                }} />
            </Box>
            <Box sx={{
              height: "100%",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              gap: "10%",
              alignItems: "center"
            }}>
                <SubmitButton onHandleClick={onClickHandle}  text={"Add Event"} />
                <SubmitButton  text={"Preview Event"} onHandleClick={onClickHandle} />
            </Box>
          </Box>
        </Modal>
        {addOpen ? <AddEventModal addOpen={addOpen} onAddModal={onAddModal} dateValue={dateValue}/> : null}
        {previewOpen ? <PreviewEventModal day={day} previewOpen={previewOpen} onPreviewModal={onPreviewModal} dateAccordingEvents={dateAccordingEvents} setDateAccordingEvents={setDateAccordingEvents}/> : null}
      </>
    );

}
  
  export default ChooseActionModal;