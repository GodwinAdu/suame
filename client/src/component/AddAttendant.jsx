import { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axios from 'axios'
import toast from 'react-hot-toast'

export default function AddAttendant() {

  const [open, setOpen] = useState(false);
  const [attendants, setAttendants] = useState(0)
  const [selectedDate, setSelectedDate] = useState(null)

  const handleBookQuantity = (event) => {
    setAttendants(event.target.value);
  };

  
  const handleBookDate = (date) => {
    setSelectedDate(date);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleBookSubmit = async () =>{

    try{
      if(attendants < 1){
        toast.error("enter number of book type");
        return;
      }

      if(selectedDate === null){
        toast.error("Enter current date");
        return;
      }

      const load = toast.loading('please wait...')
      const bookData = {
        _type: 'book',
      // Add your book data properties here
   
        quantity: +attendants,
        date: selectedDate.toISOString().slice(0, 10),
      };
      
      const response = await client.create(bookData);
      toast.dismiss(load)
      setAttendants(0)
      setSelectedDate(null)
      console.log(response);
      toast.success("Book added successfully")

    }catch(error){
      console.error(error)
    }
  }

  return (
    <div className='px-15 py-15'>
      <Button className="px-4 py-2 text-sm text-blue-100 bg-blue-500 rounded shadow" variant="outlined" onClick={handleClickOpen}>
       Add
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Today Attendant</DialogTitle>
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
              value={attendants}
              onChange={handleBookQuantity}
              
            />

            <LocalizationProvider  dateAdapter={AdapterDayjs}>
              <DemoContainer fullWidth sx={{ m: 1,pb:2}} size="small" components={['DatePicker']}>
                <DatePicker onChange={handleBookDate}  label="Add Date" value={selectedDate} />
              </DemoContainer>
            </LocalizationProvider>

            <Button onClick={handleBookSubmit} fullWidth  sx={{ m: 1,}} size="medium" variant="contained" >Add Record</Button>
            
          </Box> 
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}