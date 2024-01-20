import React,{useState,useRef,useEffect} from "react";
import axios from "axios";
import { TextField,Modal,Box,Autocomplete } from "@mui/material";
import SubmitButton from "../Buttons/SubmitButton";
import {io} from "socket.io-client";
import { postEventToDatabase } from "../../utils/postActionsDatabase";
import { getUserNames } from "../../utils/getUserInformation";

const AddEventModal = ({addOpen,onAddModal,dateValue}) => {
    //Listen on event 'new-user-registered of backend, when event is fired then do smth
    const formRef = useRef(null);
    const [allUsers,setAllUsers] = useState([]);
    const [selectedUsers,setSelectedUsers] = useState([]);
    const [token,setToken] = useState(null);


    const socket = io(`${import.meta.env.VITE_BACKEND_URL}`);

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
        gap: 2,
        p:2 
      
    };

    useEffect(() => {
        socket.on('new-user-registered', () => {
            console.log('Über Socket!');
            setToken(localStorage.getItem("token"));
            getUserNames(setAllUsers);
        })
    },[])

    const handleSubmit = (event) => {
      event.preventDefault();
      const formData = {
        eventName: formRef.current.eventName.value,
        timeFrom: formRef.current.eventTimeFrom.value,
        timeTo: formRef.current.eventTimeTo.value,
        date: dateValue,
        participants: selectedUsers,
        additionalInfo: formRef.current.additionalInfo.value
      }
      postEventToDatabase(token,formData);
      onAddModal();
    };
    const handleUserChange = (event,newValue) => {
        setSelectedUsers(newValue);
    };

    useEffect(() => {
        setToken(localStorage.getItem("token"));
        getUserNames(setAllUsers);
    },[])


    return(
        <>
            <Modal
            open={addOpen}
            onClose={() => onAddModal()}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box
            component="form"
            ref={formRef}
            onSubmit={handleSubmit}
            sx={style}
            >
            <TextField
                name="eventName"
                label="Event Name"
                variant="outlined"
            />

            <TextField
                name="eventTimeFrom"
                label="When (Time FROM HH:MM)"
                variant="outlined"
                type="time"
            />
            <TextField
                name="eventTimeTo"
                label="When (Time TO HH:MM)"
                variant="outlined"
                type="time"
            />

            <Autocomplete
                multiple={true}
                options={allUsers}
                value={selectedUsers}
                onChange={handleUserChange}
                renderInput={(params) => (
                <TextField {...params} label="Who" />
                )}
                
            />

            <TextField
                name="additionalInfo"
                label="Additional Information"
                variant="outlined"
                multiline
                rows={4}
            />
            <SubmitButton  heightVal={"10%"} alignSelf={"center"} type={"submit"} text={"Create"}/>
            </Box>
        </Modal>
        </>
    )
}

export default AddEventModal;