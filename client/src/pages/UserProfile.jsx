import { Button, Container, Grid, Paper, styled } from '@mui/material'
import Layout from '../layout'
import male from '../assets/male.jpg'
import female from '../assets/female.png'
import { Link, useParams } from 'react-router-dom'
import { useStateContext } from '../contexts/createContext'
import { useEffect, useState,useRef } from 'react'
import { getUserProfile, updateUser } from '../helper/helper'
import { FaPlus } from 'react-icons/fa'
import { convertImageToBase64 } from '../utils/convertImage'
import  { fetchUser } from '../utils/fetchMainUser'
import EditProfileModal from '../component/EditProfileModal'
import toast from 'react-hot-toast'

const randomImage = 'https://source.unsplash.com/1600x900/?nature,photography,technology'

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

const UserProfile = () => {
    const [userProfile,setUserProfile ] = useState(null)
    const [selectedFile, setSelectedFile] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

     const fileInputRef = useRef(null);

    const userId = useParams();
    const user = fetchUser();

    const profileData = userProfile?.data

    useEffect(() => {
        getUserProfile(userId)
        .then((data) =>{
            setUserProfile(data)
        })
        .catch(error => console.log(error))
    },[userId])


      const handleEditProfile = () => {
        setIsEditModalOpen(true);
      };
    
      const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
      };
    

    const profileImage = profileData?.profile; // Replace with the actual property name

    const renderImageSrc = profileImage || (profileData?.sex === 'Male' ? male : female);
  
    console.log("profile:" ,userProfile)
  return (
    <Layout>
        <Container maxWidth='xl'>
            <div className="relative h-full pb-2 justify-center items-center">
                <div className="flex flex-col pb-5">
                    <div className="relative flex flex-col mb-7">
                        <div className="flex flex-col justify-center items-center">
                            <img 
                                src={randomImage}
                                className="w-full h-[150px] md:h-[200px] shadow-lg object-cover"
                                alt="banner-pic"                                
                            />
                            <div className="profile-image-container relative">
                           
                            <img
                                className="rounded-full w-20 h-20 -mt-10 object-cover shadow-xl cursor-pointer"
                                src={renderImageSrc}
                                alt="Profile"
                            />
                                
                            </div>
                            <h1 className="font-bold text-xl md:text-3xl text-center mt-3">{profileData?.firstName}</h1>
                        </div>

                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <Item>
                                    <div className="">
                                        <h1 className='text-md md:text-xl text-blue-500 font-extrabold py-2'>BIO</h1>
                                        <div className=" flex justify-between items-center pb-3 pr-3">
                                            <h1 className='font-semibold text-lg md:text-xl'>Name : </h1>
                                            <div className="flex gap-2 justify-start items-start font-bold text-slate-400 text-sm md:text-md">
                                                <p>{profileData?.firstName && profileData.firstName}</p>
                                                <p> {profileData?.lastName && profileData.lastName} </p>
                                                <p>{profileData?.middleName && profileData.middleName}</p>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center pb-3 pr-3 ">
                                            <h1  className='font-semibold text-md md:text-xl'>Email :</h1>
                                            <p className='font-bold text-slate-400 text-sm md:text-md'>{profileData?.email}</p>
                                        </div>
                                        <div className="flex justify-between items-center pb-3 pr-3 ">
                                            <h1  className='font-semibold text-md md:text-xl'>DOB :</h1>
                                            <p className='font-bold text-slate-400 text-sm md:text-md'>{profileData?.dateOfBirth}</p>
                                        </div>
                                        <div className="flex justify-between items-center pb-3 pr-3 ">
                                            <h1  className='font-semibold text-md md:text-xl'>Gender :</h1>
                                            <p className='font-bold text-slate-400 text-sm md:text-md' >{profileData?.sex}</p>
                                        </div>
                                    </div>
                                </Item>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Item>
                                    <div className="">
                                        <h1 className='text-md md:text-xl text-blue-500 font-extrabold py-2'>Address and Contact</h1>
                                        <div className=" flex justify-between items-center pb-3 pr-3 ">
                                            <h1  className='font-semibold text-md md:text-xl'>Phone Number : </h1>
                                            <p className='font-bold text-slate-400 text-sm md:text-md'>{profileData?.phone}</p>
                                        </div>
                                        <div className=" flex justify-between items-center pb-3 pr-3 ">
                                            <h1  className='font-semibold text-md md:text-xl'>Phone Number 2 : </h1>
                                            <p className='font-bold text-slate-400 text-sm md:text-md'>{profileData?.emergencyContact !== "" ? profileData?.emergencyContact : "Not Provided yet"}</p>
                                        </div>
                                        <div className=" flex justify-between items-center pb-3 pr-3 ">
                                            <h1  className='font-semibold text-md md:text-xl'>Address : </h1>
                                            <p className='font-bold text-slate-400 text-sm md:text-md'>{profileData?.address}</p>
                                        </div>
                                        <div className=" flex justify-between items-center pb-3 pr-3 ">
                                            <h1 className='font-semibold text-md md:text-xl'>Address 2 : </h1>
                                            <p className='font-bold text-slate-400 text-sm md:text-md'>{profileData?.addressOne !== "" ? profileData?.addressOne : "Not Provided yet"}</p>
                                        </div>
                                    </div>
                                </Item>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Item>
                                    <div className="">
                                        <h1 className='text-md md:text-xl text-blue-500 font-extrabold py-2'>Congregation</h1>
                                        <div className=" flex justify-between items-center pb-3 pr-3 ">
                                            <h1 className='font-semibold text-md md:text-xl'>Congregation Name : </h1>
                                            <p className='font-bold text-slate-400 text-sm md:text-md'>Suame</p>
                                        </div>
                                        <div className=" flex justify-between items-center pb-3 pr-3 ">
                                            <h1 className='font-semibold text-md md:text-xl'>Congregation Profile : </h1>
                                            <p className='font-bold text-slate-400 text-sm md:text-md'>{profileData?.congregationProfile}</p>
                                        </div>
                                        <div className=" flex justify-between items-center pb-3 pr-3 ">
                                            <h1 className='font-semibold text-md md:text-xl'>Ministry Profile : </h1>
                                            <p className='font-bold text-slate-400 text-sm md:text-md'>{profileData?.ministryProfile}</p>
                                        </div>
                                        <div className=" flex justify-between items-center pb-3 pr-3 ">
                                            <h1  className='font-semibold text-md md:text-xl'>Congregation Duties : </h1>
                                            <p className='font-bold text-slate-400 text-sm md:text-md'>{profileData?.congregationDuties}</p>
                                        </div>
                                    </div>
                                </Item>
                            </Grid>
                        </Grid>
                    </div>
                   {user?.email === profileData?.email && (
                     <div className="flex justify-between items-center">
                        <Link to={`/report/${profileData?._id}`}>
                            <Button variant='contained'>
                                view report
                            </Button>
                        </Link>
                        <Button variant='outlined' onClick={handleEditProfile}>Edit Profile</Button>
                        {isEditModalOpen && (
                            <EditProfileModal userProfile={userProfile} onClose={handleCloseEditModal} />
                        )}
                        </div>
                   
                   )}
                </div>
            </div>
        </Container>
    </Layout>
  )
}

export default UserProfile