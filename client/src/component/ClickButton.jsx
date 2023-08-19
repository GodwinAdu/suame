
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import { cloneElement, forwardRef, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { useSpring, animated } from '@react-spring/web';
import { Paper, TextField } from '@mui/material';
import { FaMinus, FaPlus } from 'react-icons/fa';
import TimeUserPicker from './TimeUserPicker';
import toast from 'react-hot-toast'
import { useStateContext } from '../contexts/createContext'
import { fetchUser } from '../utils/fetchMainUser'

import { createOrUpdateReport } from '../helper/helper'

const Fade = forwardRef(function Fade(props, ref) {
  const {
    children,
    in: open,
    onClick,
    onEnter,
    onExited,
    ownerState,
    ...other
  } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null, true);
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {cloneElement(children, { onClick })}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element.isRequired,
  in: PropTypes.bool,
  onClick: PropTypes.any,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
  ownerState: PropTypes.any,
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%', // Adjust the width as needed
  maxWidth: 400, // Optional: set a maximum width if required
  bgcolor: 'rgba(0,0,0,.7)',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4, //
  // Media query for mobile screens
  '@media (max-width: 600px)': {
    p: 2, // Adjust the padding for mobile screens (modify as needed)
    width: '90%', // Adjust the width for mobile screens (modify as needed)
  },
};

const textFieldStyle = {
  '& .MuiInputBase-root': {
    color: 'white', // Change the text color here
  },
  '& .MuiInput-underline:before': {
    borderBottomColor: 'blue', // Change the underline color when the field is not focused
  },
  '& .MuiInput-underline:hover:before': {
    borderBottomColor: 'green', // Change the underline color on hover
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'purple', // Change the underline color when the field is focused
  },
  '& ::-webkit-datetime-edit-ampm-field': {
    display: 'none',
  },
  '& input[type="time"]::-webkit-clear-button': {
    WebkitAppearance: 'none',
    MozAppearance: 'none',
    OAppearance: 'none',
    msAppearance: 'none',
    appearance: 'none',
    margin: '-10px',
  },
};

const ClickButton = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [hour, setHour] = useState('00');
    const [minute, setMinute] = useState('00');
    const [ brochure, setBrochure ] = useState('');
    const [ magazine, setMagazine ] = useState('');
    const [ book, setBook ] = useState('');
    const [ tracts, setTracts ] = useState('');
    const [ video, setVideo ] = useState('');
    const [ returnVisit, setReturnVisit ] = useState('');
    const [ study, setStudy ] = useState('')
    const [ comment, setComment ] = useState('')

    const userData  = fetchUser();
    
    console.log("user",userData)
  
    const handleMinus = (e) => {
      e.preventDefault();
      // Convert the time string to minutes
      const timeInMinutes = parseInt(hour) * 60 + parseInt(minute);
      const newTimeInMinutes = Math.max(0, timeInMinutes - 1); // Decrease by 1 second
      const newHour = String(Math.floor(newTimeInMinutes / 60)).padStart(2, '0');
      const newMinute = String(newTimeInMinutes % 60).padStart(2, '0');
      setHour(newHour);
      setMinute(newMinute);
    };
  
    const handlePlus = (e) => {
      e.preventDefault();
      // Convert the time string to minutes
      const timeInMinutes = parseInt(hour) * 60 + parseInt(minute);
      const newTimeInMinutes = timeInMinutes + 1; // Increase by 1 minute
      const newHour = String(Math.floor(newTimeInMinutes / 60)).padStart(2, '0');
      const newMinute = String(newTimeInMinutes % 60).padStart(2, '0');
      setHour(newHour);
      setMinute(newMinute);
    };
  
    // magazines buttons handles
    const handleMagMinus =(e)=>{
      e.preventDefault()
      if(magazine <= 0) return;
      setMagazine((prev) => parseInt(prev - 1));
    }

    const handleMagPlus =(e)=>{
      e.preventDefault()
      // if(magazine <= 0) return;
      setMagazine((prev)=> parseInt(prev + 1));
    }

    // Brochures buttons handles
    const handleBroMinus =(e)=>{
      e.preventDefault()
      if(brochure <= 0) return;
      setBrochure((prev) => parseInt(prev - 1));
    }

    const handleBroPlus =(e)=>{
      e.preventDefault()
    
      setBrochure((prev)=> parseInt(prev + 1));
    }
    // Books buttons handles
    const handleBookMinus =(e)=>{
      e.preventDefault()
      if(book <= 0) return;
      setBook((prev) => parseInt(prev - 1));
    }

    const handleBookPlus =(e)=>{
      e.preventDefault()
    
      setBook((prev)=> parseInt(prev + 1));
    }
    // Tracts and Articles buttons handles
    const handleTractMinus =(e)=>{
      e.preventDefault()
      if(tracts <= 0) return;
      setTracts((prev) => parseInt(prev - 1));
    }

    const handleTractPlus =(e)=>{
      e.preventDefault()
    
      setTracts((prev)=> parseInt(prev + 1));
    }
    
    // Videos buttons handles
    const handleVideoMinus =(e)=>{
      e.preventDefault()
      if(video <= 0) return;
      setVideo((prev) => parseInt(prev - 1));
    }

    const handleVideoPlus =(e)=>{
      e.preventDefault()
    
      setVideo((prev)=> parseInt(prev + 1));
    }
    
    // Bible studies buttons handles
    const handleStudyMinus =(e)=>{
      e.preventDefault()
      if(study <= 0) return;
      setStudy((prev) => parseInt(prev - 1));
    }

    const handleStudyPlus =(e)=>{
      e.preventDefault()
    
      setStudy((prev)=> parseInt(prev + 1));
    }
    // Bible studies buttons handles
    const handleReturnMinus =(e)=>{
      e.preventDefault()
      if(returnVisit <= 0) return;
      setReturnVisit((prev) => parseInt(prev - 1));
    }

    const handleReturnPlus =(e)=>{
      e.preventDefault()
    
      setReturnVisit((prev)=> parseInt(prev + 1));
    }

    const handleSubmit = () =>{
      try{
        const date = new Date(); // Replace this with your actual date

        const formattedDate = date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        });
        const year = formattedDate.split('/')[2];
        const month = formattedDate.split('/')[0];
        const day = formattedDate.split('/')[1];

        const formattedDateInCustomFormat = `${year}-${month}-${day}`;

        const time =  `${hour}:${minute}`
        console.log(time)

        const datas = {
          postedBy:userData?.firstname,
          userId: userData?.userId,
          time,
          magazine,
          brochure,
          book,
          tracts,
          video,
          returnVisit,
          study,
          comment,
          date: formattedDateInCustomFormat,
        };
        if(!userData) return ;
        console.log(userData?.userId)

        let reportCreatingPromise = createOrUpdateReport(datas);

        toast.promise(reportCreatingPromise,{
          loading: "sending report...",
          success:"Report added!",
          error:'Failed to add Report!'
        })

        reportCreatingPromise.then((response)=>{
          console.log(response)
          setHour('');
          setMinute('');
          setMagazine('');
          setBrochure('');
          setBook('');
          setTracts('');
          setVideo('');
          setReturnVisit('');
          setStudy('');
          setComment('');

          setOpen(false)
        })
       
      } catch(error){
        console.log("Error", error);
      }
    }
    
  


  return (
    <>
      {!open && (
        <Box
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            zIndex: 9999,
          }}
        >
          <SpeedDial
            ariaLabel="SpeedDial basic example"
            icon={<SpeedDialIcon />}
            onClick={handleOpen}
          >
          </SpeedDial>
        </Box>
      )}
    <Modal
      aria-labelledby="spring-modal-title"
      aria-describedby="spring-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          TransitionComponent: Fade,
      },
    }}
  >
    <Fade in={open}>
      <Box sx={style}  component="form" noValidate autoComplete="off">
        <div className="flex gap-3 items-center text-center pb-4">
          <Paper className='px-2 shadow-xl'>
            <button className='text-xs'  onClick={handleMinus}> <FaMinus /></button>
          </Paper>
          <TimeUserPicker hour={hour} minute={minute} setHour={setHour} setMinute={setMinute} />
          <Paper className='px-2 shadow-xl'>
            <button className='text-xs'  onClick={handlePlus}> <FaPlus /></button>
          </Paper>
        </div>
        <div className=" flex gap-3 items-center text-center pb-4">
          <Paper className='px-2 shadow-xl'>
            <button onClick={handleMagMinus} className='text-xs'> <FaMinus /></button>
          </Paper>
          <TextField 
            type='number' 
            value={magazine} 
            onChange={(e)=> setMagazine(parseInt(e.target.value))} 
            id="standard" 
            placeholder='Magazines' 
            variant="standard" 
            className='w-full'
             sx={textFieldStyle} 
          />
          <Paper className='px-2 shadow-xl'>
            <button onClick={handleMagPlus} className='text-xs'> <FaPlus /></button>
          </Paper>
        </div>
        <div className=" flex gap-3 items-center text-center pb-4">
          <Paper className='px-2 shadow-xl'>
            <button className='text-xs' onClick={handleBroMinus}> <FaMinus /></button>
          </Paper>
          <TextField
            value={brochure}
            onChange={(e)=> setBrochure(parseInt(e.target.value))}  
            type='number' 
            id="standard" 
            placeholder='Brochures' 
            variant="standard" 
            className='w-full' 
            sx={textFieldStyle} 
          />
          <Paper className='px-2 shadow-xl'>
            <button className='text-xs' onClick={handleBroPlus}> <FaPlus /></button>
          </Paper>
        </div>
        <div className=" flex gap-3 items-center text-center pb-4">
          <Paper className='px-2 shadow-xl'>
            <button className='text-xs' onClick={handleBookMinus}> <FaMinus /></button>
          </Paper>
          <TextField 
            value={book}
            onChange={(e)=> setBook(parseInt(e.target.value))} 
            type='number' 
            id="standard" 
            placeholder='Books' 
            variant="standard" 
            className='w-full' 
            sx={textFieldStyle} 
          />
          <Paper className='px-2 shadow-xl'>
            <button className='text-xs' onClick={handleBookPlus}> <FaPlus /></button>
          </Paper>
        </div>
        <div className=" flex gap-3 items-center text-center pb-4">
          <Paper className='px-2 shadow-xl'>
            <button className='text-xs' onClick={handleTractMinus}> <FaMinus /></button>
          </Paper>
          <TextField
            value={tracts} 
            onChange={(e)=> setTracts(parseInt(e.target.value))} 
            type='number' 
            id="standard" 
            placeholder='Tracts and Articles' 
            variant="standard" 
            className='w-full' 
            sx={textFieldStyle} 
          />
          <Paper className='px-2 shadow-xl'>
            <button className='text-xs' onClick={handleTractPlus}> <FaPlus /></button>
          </Paper>
        </div>
        <div className=" flex gap-3 items-center text-center pb-4">
          <Paper className='px-2 shadow-xl'>
            <button className='text-xs' onClick={handleVideoMinus}> <FaMinus /></button>
          </Paper>
          <TextField 
            value={video}
            onChange={(e)=> setVideo(parseInt(e.target.value))} 
            type='number' 
            id="standard" 
            placeholder='Video showing' 
            variant="standard" 
            className='w-full' 
            sx={textFieldStyle} 
          />
          <Paper className='px-2 shadow-xl'>
            <button className='text-xs' onClick={handleVideoPlus}> <FaPlus /></button>
          </Paper>
        </div>
        <div className=" flex gap-3 items-center text-center pb-4">
          <Paper className='px-2 shadow-xl'>
            <button className='text-xs' onClick={handleReturnMinus}> <FaMinus /></button>
          </Paper>
          <TextField 
            value={returnVisit}
            onChange={(e)=> setReturnVisit(parseInt(e.target.value))} 
            type='number' 
            id="standard" 
            placeholder='Return visit' 
            variant="standard" 
            className='w-full' 
            sx={textFieldStyle} 
          />
          <Paper className='px-2 shadow-xl'>
            <button className='text-xs' onClick={handleReturnPlus}> <FaPlus /></button>
          </Paper>
        </div>
        <div className=" flex gap-3 items-center text-center pb-4">
          <Paper className='px-2 shadow-xl'>
            <button className='text-xs' onClick={handleStudyMinus}> <FaMinus /></button>
          </Paper>
          <TextField 
            value={study}
            onChange={(e)=> setStudy(parseInt(e.target.value))} 
            type='number' 
            id="standard" 
            placeholder='Bible studies' 
            variant="standard" 
            className='w-full' 
            sx={textFieldStyle} 
          />
          <Paper className='px-2 shadow-xl'>
            <button className='text-xs' onClick={handleStudyPlus}> <FaPlus /></button>
          </Paper>
        </div>
        <div className=" pb-3">
          <TextField 
            value={comment}
            onChange={(e)=> setComment(e.target.value)}
            id="standard" 
            placeholder='write your comment' 
            variant="standard" 
            className='w-full' 
            sx={textFieldStyle} 
          /> 
        </div>

        <div className="flex justify-between items-center pt-3">
          <Button variant='outlined' onClick={handleClose} >Cancel</Button>
          <Button variant='contained' onClick={handleSubmit}>Add</Button>
        </div>
        
      </Box>
    </Fade>
  </Modal>
</>
  );
};

export default ClickButton;
