import React from "react";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import { fetchUser } from "../utils/fetchMainUser";

const HomeModal = ({ isOpen, onClose }) => {
  const userInfo = fetchUser();

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        className="flex items-center justify-center h-screen"
        sx={{
          outline: "none",
        }}
      >
        <div className="bg-white rounded-md p-6 shadow-lg max-w-sm w-[95%]">
          <h2 className="text-md font-bold mb-2 flex justify-center items-center text-blue-500">{`Welcome ${
            userInfo?.gender === "Male" ? "Brother" : "Sister"
          } ${userInfo?.firstname} ${userInfo?.lastname}`}</h2>
          <p className="text-gray-600 mb-1 mt-4">
            Exclusively for Suame Congregation members, this platform is your
            hub for recording ministry hours, book distributions, Bible studies,
            and more. Your active participation is essential in furthering our
            spiritual goals.
          </p>
          <p className="font-bold text-sm mb-1">
            If you encounter any issues, reach out to your Group Overseer for
            assistance.
          </p>
          <p className="mb-4 font-bold text-blue-500 text-sm">
            Thank you for your dedication!!!
          </p>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={onClose}
          >
            Close
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default HomeModal;
