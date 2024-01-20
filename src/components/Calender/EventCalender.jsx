import React, { useState,useEffect } from 'react';
import { LocalizationProvider, DatePicker,StaticDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Box  } from '@mui/material';
import dayjs from 'dayjs';
import {io} from "socket.io-client";
import HomeIcon from '@mui/icons-material/Home';
import ClickableExtendButtons from "../Buttons/ClickableExtendButtons";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ChooseActionModal from '../Modals/ChooseActionModal';

//utils
import { getEvents } from '../../utils/getUserInformation';



const EventCalendar = ({handleLogout}) => {

    const [value, setValue] = useState(dayjs());
    const [open,setOpen] = useState(false);
    const [events,setEvents] = useState([]);
    const [day,setDay] = useState();
    const onModal = () => {
        setOpen(!open)
    }
    const [expand,setExpand] = useState(true);

    const socket = io(`${import.meta.env.VITE_BACKEND_URL}`);

    const handleDayClick = (newValue) => {
        setDay(newValue.format("YYYY-MM-DD"));
    };
    useEffect(() => {
        socket.on('new-event-created', () => {
            getEvents(setEvents);
            console.log("from socket communication");
        })
    },[])
    useEffect(() => {
        getEvents(setEvents);
    },[]);
    useEffect(() => {
        if (day) {
            console.log("Day selected:", day);
            onModal(); 
        }
    }, [day]);

    return (
        <Box sx={{
            width: "100vw",
            height: "100vh",
            display: "grid",
            gridTemplateColumns: "10% 90%",
   
        }}>
            <Box sx={{
                    alignItems: "flex-start",
                    flexWrap: "wrap",
                    height: "100%",
                    width: "10%",
                    
                }}>
                    <ClickableExtendButtons element={<HomeIcon sx={{
                        display: "block",
                        width: "32px",
                        height: "32px",
                        color: "text.primary",
                        borderRadius: "15%"
                    }}
                    />}/>
                    <ClickableExtendButtons element= {expand ? <ExpandMoreIcon sx={{
                        display: "block",
                        width: "32px",
                        height: "32px",
                        color: "text.primary",
                        borderRadius: "15%"
                    }}
                    /> : <KeyboardArrowUpIcon sx={{
                        display: "block",
                        width: "32px",
                        height: "32px",
                        color: "text.primary",
                        borderRadius: "15%"
                    }}/>
                    } handleLogout={handleLogout} handleParam={!expand} handleClick={setExpand}/> 
                    {/* check that later */}
            </Box>
            <Box sx={{
                width:"60%",
                height: "90%",
                display: "flex",
                flexDirection: "column",
                alignSelf: "center",
                justifySelf: "center"


            }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <StaticDatePicker
                        label="Controlled calendar"
                        value={value}
                        onChange={(newValue) => {setValue(newValue);  handleDayClick(newValue)}}
                        slotProps={{ textField: { variant: 'outlined' } }}
                    />
                </LocalizationProvider>
            </Box>
            {open ? <ChooseActionModal day={day} open={open} onModal={onModal} dateValue={value} events={events} setEvents={setEvents} /> : null}
        </Box>
    );
};

export default EventCalendar;
