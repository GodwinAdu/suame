import React, { useEffect, useState } from 'react';
import { Box, Button, Container, Paper, Stack, styled } from '@mui/material';
import Layout from '../layout';
import male from '../assets/male.jpg';
import female from '../assets/female.png';
import { fetchUser } from '../utils/fetchMainUser';
import { getGroupUser } from '../helper/helper';
import { Link } from 'react-router-dom';
import { AiFillCloseCircle } from 'react-icons/ai';
import ModalDisplay from '../component/Modal';
import Spinner from '../component/Spinner';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const style = {
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
};

const GroupoverseerPage = () => {
  const [groupUser, setGroupUser] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);

  const userInfo = fetchUser();

  useEffect(() => {
    if (userInfo) {
      getGroupUser(userInfo.group)
        .then((response) => {
          const data = response.data;
          if (Array.isArray(data)) {
            const filteredMembers = data.filter((member) => {
              return member.congregationGroup === userInfo.group;
            });
            setGroupUser(filteredMembers);
          }
        })
        .catch((error) => console.log(error));
    }
  }, [userInfo?.group]);

  const handleOpen = (member) => {
    setSelectedMember(member);
  };

  const handleClose = () => {
    setSelectedMember(null);
  };


  return (
    <Layout>
      <Container className="" maxWidth="lg">
        <h1 className='font-bold text-xl md:text-2xl text-center py-4 text-blue-500'>{userInfo?.group} Members</h1>
        <Box sx={{ width: '100%' }}>
          <div className="py-7">
            <Link to={`/group-report`}>
               <Button variant='contained' color='secondary' >All reports</Button>
            </Link>
          </div>
          {groupUser?.map((member) => (
            <Stack spacing={2} key={member?._id} className='pb-3'>
              {userInfo?.email !== member?.email && (
               <>
                {member.length <= 0 ? (
                  <Spinner message={`None of your member have registered yet`} />
                ):(
                  <Paper elevation={3} className='py-3 px-2 md:px-6 flex justify-between items-center text-center'>
                    <div className="flex gap-5 items-center text-center">
                      <img
                        className='w-10 h-10 rounded-full shadow-lg '
                        src={member?.profile || (member?.sex === 'Male' ? male : female) }
                        alt='profile image'
                      />
                      <h3 className='font-semibold text-sm md:text-xl'>{member?.firstName} {member?.lastName}</h3>
                    </div>
                    
                    <Button variant='contained' size='small' onClick={() => handleOpen(member)}>More Info</Button>
                  </Paper>
                )}
               </>
              )}
            </Stack>
          ))}
        </Box>
        <ModalDisplay member={selectedMember} onClose={handleClose} />
      </Container>
    </Layout>
  );
}

export default GroupoverseerPage;
