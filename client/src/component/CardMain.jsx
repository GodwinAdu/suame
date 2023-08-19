import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { FaPause, FaPlay, FaStop } from 'react-icons/fa'
import { RxLapTimer } from 'react-icons/rx'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { Paper } from '@mui/material';
import {toast} from 'react-hot-toast';

const CardMain = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [isStopped, setIsStopped] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let interval;
    if (isRunning && !isStopped) {
      interval = setInterval(() => {
        setElapsedTime(prevElapsedTime => prevElapsedTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning, isStopped]);

  const handlePlay = () => {
    toast.success('Timer has started')
    setIsRunning(true);
    setIsStopped(false);
  };

  const handlePause = () => {
    toast.success('Timer has paused')
    setIsRunning(false);
  };

  const handleStop = () => {
    if(isRunning){
      toast.success('Timer has stopped')
    }
    setIsRunning(false);
    setIsStopped(true);
    setElapsedTime(0); // Reset the timer to 0
  };

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <Box className="mx-auto w-[90%] md:w-[450px] pt-5 ">
      <Card sx={{bgcolor:'#fff' ,minWidth: 275, padding: 3,boxShadow:'2px 2px 4px 4px rgba(0,0,0,.2)' }}>
        <CardContent>
          <div className="flex justify-between items-center pb-5 text-center">
            <h6 className='flex gap-2 text-center text-dark'> 
              <RxLapTimer className='text-2xl' /> 
              Timer
            </h6>
            <BsThreeDotsVertical className='text-dark' />
          </div>
          <div className='flex justify-between items-center'>
            {!isRunning ? (
              <Paper elevation={3} className='p-1 md:p-3'>
                <button onClick={handlePlay} className='border-2 border-gray-500 shadow-lg p-1 rounded-full'>
                  <FaPlay className='text-dark' />
                </button>
              </Paper>
            ):(
              <Paper elevation={3} className='p-1 md:p-3' >
                <button onClick={handlePause} className='border-2 border-gray-500 shadow-lg p-1 rounded-full' >
                  <FaPause className='text-dark  ' />
                </button>
              </Paper>
            )}
            <div className="">
              <Paper elevation={3} className=' p-4 mx-auto text-center shadow-lg font-bold text-md md:text-lg'>
                {formatTime(elapsedTime)}
              </Paper>
            </div>

           <Paper elevation={3} className='p-1 md:p-3'>
            <button onClick={handleStop} className='border-2 border-gray-500 shadow-lg p-1 rounded-full'>
                <FaStop className='text-dark' />
              </button>
           </Paper>

            
          </div>
          

        </CardContent>
      </Card>
    </Box>
  );
};

export default CardMain;
