import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { LuTimerReset } from 'react-icons/lu'
import { FaPause, FaPlay, FaStop } from 'react-icons/fa'
import { Paper, Typography } from '@mui/material';
import { fetchUser } from '../utils/fetchMainUser';

const CardMonthGoal = () => {
  const userInfo = fetchUser();
 
  return (
    <>
    {(userInfo?.minProfile === "Regular pioneer" || userInfo?.minProfile === "Auxillary pioneer") && (
      <Box className="mx-auto w-[90%] md:w-[450px] pt-5">
        <Card sx={{ minWidth: 275, padding: 3 }}>
          <CardContent>
            <div className="flex justify-around items-center text-center">
              <LuTimerReset className='text-3xl' />
              <div className=" text-3xl">
                <span>5:18 h</span>
              </div>
            </div>
            <p className='text-sm md:text-lg pt-5 text-slate-400 text-center'>To be on target to reach your goal of 50 hours this month.</p>
            
          </CardContent>
        </Card>
      </Box>
    )}
    </>
  );
};

export default CardMonthGoal;