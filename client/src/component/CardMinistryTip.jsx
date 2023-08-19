import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { FaPause, FaPlay, FaStop } from 'react-icons/fa'
import { Paper, Typography } from '@mui/material';

const CardMinistryTip = () => {
  
 
  return (
    <Box className="mx-auto w-[90%] md:w-[450px] pt-5">
      <Card sx={{ minWidth: 275, padding: 3 }}>
        <CardContent>
          <div className="flex justify-around items-center text-center">
            <h6 className='font-bold'>
              Ministry Tips
            </h6>
            <h6 className='text-gray-500 text-sm'>For August</h6>
          </div>
          <div className="pb-1 pt-2">
            <p><strong>#1:</strong></p>
          </div>
          <div className="pb-1">
            <p><strong>#2:</strong></p>
          </div>
          <div className="pb-1">
            <p><strong>#3:</strong></p>
          </div>
          
        </CardContent>
      </Card>
    </Box>
  );
};

export default CardMinistryTip;