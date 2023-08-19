import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CardMain from "./CardMain";
import ClickButton from "./ClickButton";
import CardMinistryTip from "./CardMinistryTip";
import MonthlyReport from "./MonthlyReport";
import CardActivity from "./CardActivity";
import CardBibleStudy from "./CardBibleStudy";
import CardLiterature from "./CardLiterature";
import CardMonthGoal from "./CardMonthGoal";
import HomeModal from "./HomeModal";

const Main = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(true);
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box
          sx={{
            bgcolor: "#d3d3d3",
            height: "90vh",
            overflow: "auto",
            paddingBottom: "20px",
          }}
        >
          <HomeModal
            isOpen={isLoginModalOpen}
            onClose={() => setIsLoginModalOpen(false)}
          />
          <CardMain />
          {/* <CardBibleStudy /> */}
          {/* <CardMonthGoal /> */}
          <MonthlyReport />
          <ClickButton />
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default Main;
