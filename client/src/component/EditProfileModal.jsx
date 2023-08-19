import React, { useRef, useState } from "react";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {
  Box,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
} from "@mui/material";
import { AiFillCloseCircle } from "react-icons/ai";
import { updateUser } from "../helper/helper";
import toast from "react-hot-toast";
import { convertImageToBase64 } from "../utils/convertImage";
import male from "../assets/male.jpg";
import female from "../assets/female.png";

const EditProfileModal = ({ userProfile, onClose }) => {
  const [editedProfile, setEditedProfile] = useState(userProfile);
  const [selectedFile, setSelectedFile] = useState(null);

  const fileInputRef = useRef(null);

  const handleInputChange = (field, value) => {
    setEditedProfile((prevProfile) => ({
      ...prevProfile,
      data: {
        ...prevProfile.data,
        [field]: value,
      },
    }));
  };

  const handleImageUpload = async (file) => {
    if (file) {
      try {
        setSelectedFile(file);
        const base64Image = await convertImageToBase64(file);

        setEditedProfile((prevProfile) => ({
          ...prevProfile,
          data: {
            ...prevProfile.data,
            profile: base64Image, // Update the profile field with base64 image data
          },
        }));
      } catch (error) {
        console.error("Error converting image to base64:", error);
      }
    }
  };

  const handleSubmit = async () => {
    try {
      const {
        address,
        addressOne,
        congregationDuties,
        congregationGroup,
        congregationProfile,
        dateOfBirth,
        email,
        emergencyContact,
        firstName,
        lastName,
        middleName,
        ministryProfile,
        phone,
        profile,
        role,
        sex,
      } = editedProfile.data;
      const data = editedProfile.data;

      console.log(data, "profile data");

      const token = localStorage.getItem("token"); // Replace with the actual token
      let waitingPromise = updateUser(token, data);
      toast.promise(waitingPromise, {
        loading: "Updating...",
        success: "Updated",
        error: "Error Occurred!",
      });
      waitingPromise
        .then((response) => {
          console.log(response);
          window.location.reload();
        })
        .catch((error) => console.log(error));
      onClose(); // Close the modal after successful update
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const profileImage = editedProfile?.data?.profile; // Replace with the actual property name

  const renderImageSrc =
    profileImage || (editedProfile?.data?.sex === "Male" ? male : female);

  console.log(editedProfile, "editedProfile");

  return (
    <Modal open={true} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%", // Default width for all screen sizes
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 2,
          overflow: "auto", // Add overflow property
          maxHeight: "90vh", // Limit the maximum height

          "@media (min-width: 960px)": {
            width: 400,
          },
        }}
      >
        <div className="">
          <div className="flex justify-between items-center">
            <h3 className="text-blue-500 font-bold text-lg">Edit Profile </h3>
            <AiFillCloseCircle className="cursor-pointer" onClick={onClose} />
          </div>
          <div className="flex justify-center items-center ">
            <div className="relative mt-10">
              {selectedFile ? (
                <img
                  className="rounded-full w-20 h-20 -mt-10 object-cover shadow-xl cursor-pointer"
                  src={URL.createObjectURL(selectedFile)}
                  alt="Profile"
                  onClick={() => fileInputRef.current.click()}
                />
              ) : (
                <img
                  className="rounded-full w-20 h-20 -mt-10 object-cover shadow-xl cursor-pointer"
                  src={renderImageSrc}
                  alt="Profile"
                  onClick={() => fileInputRef.current.click()}
                />
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e.target.files[0])}
              className="hidden"
              ref={fileInputRef}
            />
          </div>
          <div className="flex flex-col gap-4 pt-5">
            <TextField
              fullWidth
              label="First Name"
              value={editedProfile?.data?.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
            />

            <TextField
              fullWidth
              label="Middle Name"
              value={editedProfile?.data?.middleName}
              onChange={(e) => handleInputChange("middleName", e.target.value)}
            />

            <TextField
              fullWidth
              label="Last Name"
              value={editedProfile?.data?.lastName}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
            />
            <TextField
              fullWidth
              label="Email"
              value={editedProfile.data.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
            <TextField
              fullWidth
              label="Date of Birth"
              value={editedProfile?.data?.dateOfBirth}
              onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
            />
            <TextField
              fullWidth
              label="Gender"
              value={editedProfile?.data?.sex}
              onChange={(e) => handleInputChange("sex", e.target.value)}
            />
            <Divider />
            <TextField
              fullWidth
              label="Phone"
              value={editedProfile?.data?.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
            />
            <TextField
              fullWidth
              label="Emergency Contacy"
              value={editedProfile?.data?.emergencyContact}
              onChange={(e) =>
                handleInputChange("emergencyContact", e.target.value)
              }
            />
            <TextField
              fullWidth
              label="Address"
              value={editedProfile?.data?.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
            />
            <TextField
              fullWidth
              label="Address 2"
              value={editedProfile?.data?.addressOne}
              onChange={(e) => handleInputChange("addressOne", e.target.value)}
            />
            <Divider />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-helper-label">
                Group
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={editedProfile?.data?.congregationGroup}
                label="Gender"
                onChange={(e) =>
                  handleInputChange("congregatonGroup", e.target.value)
                }
              >
                <MenuItem value="">
                  <em>Select your group</em>
                </MenuItem>
                <MenuItem value="Group one">Group one</MenuItem>
                <MenuItem value="Group two">Group two</MenuItem>
                <MenuItem value="Group three">Group three</MenuItem>
                <MenuItem value="Group four">Group four</MenuItem>
                <MenuItem value="Group five">Group five</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-helper-label">
                Congregation profile
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={editedProfile?.data?.congregationProfile}
                label="Congregation profile"
                onChange={(e) =>
                  handleInputChange("congregationProfile", e.target.value)
                }
              >
                <MenuItem value="">
                  <em>Choose below</em>
                </MenuItem>
                <MenuItem value="Elder">Elder</MenuItem>
                <MenuItem value="Ministerial servant">
                  Ministerial servant
                </MenuItem>
                <MenuItem value="Publisher">Publisher</MenuItem>
                <MenuItem value="Unbaptize Publisher">
                  {" "}
                  Unbaptize Publisher
                </MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-helper-label">
                Ministry Profile
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={editedProfile?.data?.ministryProfile}
                label="Ministry Profile"
                onChange={(e) =>
                  handleInputChange("ministryProfile", e.target.value)
                }
              >
                <MenuItem value="">
                  <em>Choose below</em>
                </MenuItem>
                <MenuItem value="Special pioneer">Special pioneer</MenuItem>
                <MenuItem value="Regular pioneer">Regular pioneer</MenuItem>
                <MenuItem value="Auxillary pioneer">Auxillary pioneer</MenuItem>
                <MenuItem value="Publisher">Publisher</MenuItem>
                <MenuItem value="Unbaptize publisher">
                  Unbaptize publisher
                </MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="flex justify-between items-center pt-4">
            <Button variant="contained" onClick={handleSubmit}>
              Save
            </Button>
            <Button variant="outlined" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default EditProfileModal;
