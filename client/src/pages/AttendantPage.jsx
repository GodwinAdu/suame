import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Paper, Stack, TextField } from '@mui/material'
import Layout from '../layout'
import AddAttendant from '../component/AddAttendant'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { useState } from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

const AttendantPage = () => {
    const [ open, setOpen ] = useState(false)

    
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <Layout>
        <Container maxWidth="lg">
            <h1 className='font-bold text-md md:text-2xl text-center py-4 text-blue-500'>Welcome to Attendant forum</h1>
            <div className="flex justify-center items-center">
                <div className="w-full p-2 rounded-lg shadow-2xl lg:flex lg:max-w-lg">
                    <div className="pl-2">
                        <h4 className="text-md md:text-xl font-semibold tracking-tight text-blue-600">
                            Enter Attendees
                        </h4>
                        <p className="mb-2 leading-normal text-sm md:text-lg">
                            <b>Note : </b> Number of Attendants show be counted and
                             recorded 30 minutes to closing 
                            during meeting sessions.. <br />
                            Thank you...
                        </p>
                        <AddAttendant />
                    </div>
                </div>
            </div>
            <Divider className='text-black pb-2 ' />
            <Box sx={{ width: '100%' }}>
                <Stack spacing={2}>
                    <Paper onClick={handleClickOpen} elevation={3} className='py-3 px-2 md:px-6 flex justify-between items-center text-center'>
                        <div className="">
                            <h3 className='font-semibold text-sm md:text-xl text-blue-500'>Midweek</h3>
                        </div>
                        <p className='font-semibold text-xs md:text-md '>09/08/2023</p>
                        <p className='font-semibold text-md'>100</p>
                    </Paper>
                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>Edit Attendant</DialogTitle>
                        <DialogContent>
                        <Box
                            sx={{
                            width: 500,
                            maxWidth: '100%',
                            }}
                        >
                            <TextField 
                            label="Number of Attendant" 
                            fullWidth sx={{ m: 1}} 
                            size="small" 
                            inputProps={{ type: 'number'}} 
                            value=""
                            onChange=""
                            
                            />

                            <LocalizationProvider  dateAdapter={AdapterDayjs}>
                                <DemoContainer fullWidth sx={{ m: 1,pb:2}} size="small" components={['DatePicker']}>
                                    <DatePicker onChange=""  label="Add Date" value="" />
                                </DemoContainer>
                            </LocalizationProvider>

                            <Button onClick="" fullWidth  sx={{ m: 1,}} size="medium" variant="contained">Edit</Button>
                            
                        </Box> 
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                        </DialogActions>
                    </Dialog>
                </Stack>
            </Box>
        </Container>
    </Layout>
  )
}

export default AttendantPage