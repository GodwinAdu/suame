import React, { useEffect, useRef, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button } from '@mui/material';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import { fetchUser } from '../utils/fetchMainUser';
import axios from 'axios';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(name, values) {
  return { name, values };
}

;

export default function MonthlyReport() {
  const printContainerRef = useRef(null);
  const [currentDate, setCurrentDate] = useState(new Date());
    const [newHours, setNewHours ] =useState('00:00')
    const [reportData, setReportData] = useState({
        totalHours: 0,
        hour: 0,
        placement: 0,
        magazine: 0,
        brochure: 0,
        book: 0,
        tracts: 0,
        videoShowing: 0,
        returnVisit: 0,
        bibleStudy: 0,
    });

    const userInfo = fetchUser();


    useEffect(() => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1; // Months are zero-indexed
        fetchData(year, month);
      }, [currentDate]);


    const fetchData = async (year, month) => {
        try {
          const response = await axios.get(`http://localhost:4000/api/reportMonth`, {
            params: {
              year,
              month,
              userId: userInfo?.userId,
            },
          });
          const data = response.data;
          console.log(data)
          
        // Calculate the totals for each field
        const totals = {
            hour: 0,
            placement: 0,
            magazine: 0,
            brochure: 0,
            book: 0,
            tracts: 0,
            videoShowing: 0,
            returnVisit: 0,
            bibleStudy: 0,
        };
        
            
        function calculateTime(hours, minutes) {
            const total = hours * 60 + minutes;
            return total;
          }
          
          // Your existing code
          const total = data.reduce((accumulator, report) => {
            for (const key in totals) {
              if (key === 'hour') {
                const [hours, minutes] = report[key].split(':').map(Number);
                accumulator[key] += calculateTime(hours, minutes);
              } else {
                accumulator[key] += report[key] || 0;
              }
            }
            return accumulator;
          }, {
            hour: 0,
            placement: 0,
            magazine: 0,
            brochure: 0,
            book: 0,
            tracts: 0,
            videoShowing: 0,
            returnVisit: 0,
            bibleStudy: 0,
          });
          
          // Convert totalMinutes back to hours and minutes
          const totalHours = Math.floor(total.hour / 60);
          const remainingMinutes = total.hour % 60;
          const newHour = `${totalHours}:${remainingMinutes}`
          setNewHours(newHour)
          console.log(newHour)
          // Display the result
          console.log(`Total Hours: ${totalHours}:${remainingMinutes}`);
          
        // Update the reportData state with the fetched data and totals
        setReportData({total});
    
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      const totalPlacements = reportData?.total?.book + reportData?.total?.magazine + reportData?.total?.brochure + reportData?.total?.tracts || 0;

    console.log("reportData", reportData)

    const handleMonthChange = (months) => {
      const newDate = new Date(currentDate);
      newDate.setMonth(newDate.getMonth() + months);
      setCurrentDate(newDate);
    };

    const rows = [
      createData('Hours',`${newHours}h`),
      createData('Placements',totalPlacements),
      createData('Video showings',reportData?.total?.videoShowing),
      createData('Return Visits', reportData?.total?.returnVisit),
      createData('Studies', reportData?.total?.bibleStudy),
    ]

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    const printDocument = printWindow.document;
    const styles = `
      .print-container {
        border: 1px solid #ccc;
        padding: 20px;
        margin: 0 auto;
        max-width: 800px;
        background-color: white;
      }
      .print-container table {
        width: 100%;
        border-collapse: collapse;
      }
      .print-container th {
        background-color: #f2f2f2;
        padding: 10px;
        text-align: left;
        border: 1px solid #ccc;
      }
      .print-container td {
        padding: 10px;
        border: 1px solid #ccc;
      }
    `;

    printDocument.head.innerHTML = `<style>${styles}</style>`;
    printDocument.body.innerHTML = `<div class="print-container">${printContainerRef.current.innerHTML}</div>`;
    printWindow.print();
    printWindow.close();
  };

  return (
    <Box className='p-2 md:p-10 mt-5'>
      <div className="flex justify-between items-center px-4 pb-2">
            <Button onClick={() => handleMonthChange(-1)}><MdArrowBackIos className='text-xl font-bold' /> </Button>
            <div className="text-sm md:text-lg font-semibold">
                {currentDate.toLocaleDateString('en-US', {
                month: 'long',
                year: 'numeric',
                })}
            </div>
            <Button onClick={() => handleMonthChange(1)}><MdArrowForwardIos className='text-xl font-bold' /> </Button>
        </div>
      <Box ref={printContainerRef} overflowX="auto">
        <TableContainer component={Paper}>
          <Table sx={{ tableLayout: 'auto' }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Month Report</StyledTableCell>
                <StyledTableCell align="right">Total</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell className='text-blue-500' component="th" scope="row">
                    {row.name} :
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.values}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box className='mt-6 flex justify-center items-center'>
        <Button  variant="contained" color='primary' onClick={handlePrint}>
          Print report
        </Button>
      </Box>
    </Box>
  );
}
