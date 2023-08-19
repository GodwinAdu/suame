import React from 'react';
import { Box, Button, Modal, Paper, Typography } from '@mui/material';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const ModalDisplay = ({ member, onClose }) => {
  if (!member) {
    return null;
  }

  return (
    <Modal
      open={Boolean(member)}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90%', // Default width for all screen sizes
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 2,

        '@media (min-width: 960px)': {
          width: 400,
        },
      }}>
        <div className="">
          <div className="flex justify-between items-center">
            <h3 className='text-blue-500 font-bold text-lg' >Information About {member?.firstName}</h3>
            <AiFillCloseCircle className='cursor-pointer' onClick={onClose} />
          </div>
          <p className='pt-3'>You can access comprehensive information about this group member right here. Simply select the option below to view their profile or ministry activities</p>
          <div className="flex justify-between items-center pt-4">
            {/* Link to user profile */}
            <Link to={`/user-profile/${member?._id}`} >
              <Button variant='outlined'>Profile</Button>
            </Link>
            {/* Link to group report */}
            <Link to={`/group-report/${member?._id}`} >
              <Button variant='outlined'>Ministry</Button>
            </Link>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default ModalDisplay;
