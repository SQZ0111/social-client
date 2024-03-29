import React from 'react'
import axios from 'axios';
import { Box } from '@mui/system';
import { v4 as uuidv4 } from 'uuid';
import { useState,useRef } from 'react';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import showNotification from '../ShowNotficationCard/showNotification';
import { useNavigate } from 'react-router-dom';
export default function Register() {
    const navigator = useNavigate();

    const [equal,setEqual] = useState(false);
    const formRef = useRef();
    const checkPassword = () => { 
        // console.log(formRef.current);  
        const form = formRef.current;
        form.password.value === form.confirmPassword.value ? setEqual(true) : setEqual(false);
    }
    const registerUser = async(e) => {
        e.preventDefault();
        const form = formRef.current;
        const formData = {
            id: uuidv4(),
            fullname: form.fullname.value,
            email: form.email.value,
            password: form.password.value,
            role: 'student'
        }
        const config = {
            url: `${import.meta.env.VITE_BACKEND_URL}/api/register`,
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify(formData)
        }
        
        try {
            const response = await axios(config);
            showNotification(response.data.message,"normal");
            navigator("/login");
        } catch(error) {
            showNotification(error.response.data.message,"red");
        }

    }
    return (
        <>
            <Box sx={{
                height: '100vh',
                width: '100vw',
                display: 'grid',
                gridTemplateColumns: '45% 55%'
            }}>
                {/* //Here comes the box component for the picture */}
                <Box 
                component='img'
                sx={{
                    marginLeft: '1%',
                    justifySelf: 'center',
                    alignSelf: 'center',
                    height: '70%',
                    width: '90%',
                    borderRadius: '15%',
                    
                }}
                src='/students.png'
                alt='two students working together'
                >
                </Box>
                {/* //Here comes the box component for the form */}
                <Box
                component='form'     
                ref={formRef}
                onSubmit={(e) => {registerUser(e)}}    
                sx={{
                    height: '100%',
                    width: '100%',
                    display: 'grid',
                    gridTemplateRows: '60% 25% 15%',
                }}>
                    <Box            
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '80%',
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        rowGap: '5%'
                    }}>
                        <TextField  required id="outlined-basic" label="fullname"
                        InputLabelProps={{
                            style: { color: 'black' },
                        }}
                        name= "fullname" variant="standard" />
                        <TextField required id="outlined-basic" 
                        InputLabelProps={{
                            style: { color: 'black' },
                        }}
                        label="email" name="email" variant="standard" />
                        <TextField required id="outlined-basic" 
                        InputLabelProps={{
                            style: { color: 'black' },
                        }}                        
                        label="username" name="username" variant="standard" />
                        <TextField required id="outlined-basic" 
                        InputLabelProps={{
                            style: { color: 'black' },
                        }}                        
                        label="password"
                        name="password" variant="standard"/>
                        <TextField required
                        onChange={checkPassword}
                        id="outlined-basic"
                        InputLabelProps={{
                            style: { color: 'black' },
                        }}     
                        name='confirmPassword'                   
                        label={equal ? "💚 Equal" : "❗Password not equal"} variant="standard"/>
                    </Box>
                    <Box
                    sx={{
                        height: '100%',
                        width: '50%',
                        backgroundColor: 'success.main',
                        justifySelf: 'center',
                        alignSelf: 'center',
                        borderRadius: '10%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        cursor: 'pointer'

                    }}>
                        <p>Upload Matriculation file <UploadFileIcon/></p>
                        <Button
                            variant="contained"
                            component="label"

                            >
                            Upload File
                            <input
                                type="file"
                                accept="application/pdf"
                                hidden
                                name="matriculationFile"
                                // onChange={(e) => {setImage(e.target.files[0])}}
                            />
                            </Button>

                    </Box>
                    <Box
                    sx={{
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        cursor: 'pointer'
                    }}>
                    <Button
                    type='submit'
                    sx={{
                        height: '50%',
                        width: '30%',
                        backgroundColor: 'success.main',
                    
                    }}
                    variant='contained'
                    >Register</Button>
                    </Box>
                </Box>
                    
            </Box>    
        </>
    );
}

