import { useParams } from "react-router-dom"
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { AppBar } from '@mui/material';
import Layout from '../layout'
import Daily from '../component/Daily';
import Monthly from '../component/Monthly';
import Yearly from '../component/Yearly';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function GroupReport() {
  const [value, setValue] = useState(0);

  const {userId }= useParams()

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Layout>
        <Box sx={{ width: '100%' }}>
        <AppBar position="static" color="default">
            <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
            >
            <Tab label="Daily" {...a11yProps(0)} />
            <Tab label="Monthly" {...a11yProps(1)} />
            <Tab label="Yearly" {...a11yProps(2)} />
            </Tabs>
        </AppBar>
        <CustomTabPanel value={value} index={0}>
            <Daily userId={userId} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
            <Monthly userId={userId} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
            <Yearly userId={userId} />
        </CustomTabPanel>
        </Box>
    </Layout>
  );
}