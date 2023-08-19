import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { FaPause, FaPlay, FaStop } from 'react-icons/fa'
import { Paper } from '@mui/material';

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
    setIsRunning(true);
    setIsStopped(false);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleStop = () => {
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
    <Box className="mx-auto w-[90%] md:w-[450px] pt-5">
      <Card sx={{ minWidth: 275, padding: 3 }}>
        <CardContent>
          <div className='flex justify-between items-center'>
            <button onClick={handlePlay}>
              <FaPlay />
            </button>

            <button onClick={handleStop}>
              <FaStop />
            </button>

            <button onClick={handlePause}>
              <FaPause />
            </button>
          </div>
          <div className="pt-10">
            <Paper elevation={3} className='w-3/5 p-4 mx-auto text-center shadow-lg font-bold text-md md:text-lg'>
              {formatTime(elapsedTime)}
            </Paper>
          </div>

        </CardContent>
      </Card>
    </Box>
  );
};

export default CardMain;