import React from "react";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";

const LoginModal = ({ isOpen, onClose }) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        className="flex items-center justify-center h-screen"
        sx={{
          outline: "none",
        }}
      >
        <div className="bg-white rounded-md p-6 shadow-lg max-w-sm w-[95%]">
          <h2 className="text-2xl font-bold mb-2">Session Expired</h2>
          <p className="text-gray-600 mb-4">
            Your session has expired. Please log in again to continue.
          </p>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={onClose}
          >
            Log In
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default LoginModal;
