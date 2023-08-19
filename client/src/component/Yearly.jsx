import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { MdArrowForwardIos,MdArrowBackIos } from 'react-icons/md'
import axios from 'axios';


const YearlyReport = ({userId}) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [ newHours, setNewHours ] = useState('00:00')
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


    useEffect(() => {
        const year = currentDate.getFullYear();
        fetchData(year);
      }, [currentDate]);
    
      const fetchData = async (year) => {
        try {
          const response = await axios.get(`http://localhost:4000/api/reportYear`, {
            params: {
              year,
              userId,
            },
          });
          const data = response.data;
    
          // Calculate totals and update the reportData state
          const totals = calculateTotals(data);

           // Convert totalMinutes back to hours and minutes
           const totalHours = Math.floor(totals.hour / 60);
           const remainingMinutes = totals.hour % 60;
           const newHour = `${totalHours}:${remainingMinutes}`
           setNewHours(newHour)
           console.log(newHour)
           // Display the result
           console.log(`Total Hours: ${totalHours}:${remainingMinutes}`);
          setReportData(totals);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      const calculateTotals = (data) => {
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
          const totalMinutes = hours * 60 + minutes;
          return totalMinutes;
        }
    
        data.forEach(report => {
          for (const key in totals) {
            if (key === 'hour') {
              const [hours, minutes] = report[key].split(':').map(Number);
              totals[key] += calculateTime(hours, minutes);
            } else {
              totals[key] += report[key] || 0;
            }
          }
        });
    
        return totals;
      };
      console.log(reportData)

    const handleYearChange = (years) => {
      const newDate = new Date(currentDate);
      newDate.setFullYear(newDate.getFullYear() + years);
      setCurrentDate(newDate);
    };
  return (
    <>
        <div className="flex justify-between items-center px-4 pb-2">
            <Button onClick={() => handleYearChange(-1)}><MdArrowBackIos className='text-xl font-bold' /> </Button>
            <div className="text-sm md:text-lg font-semibold">
                {currentDate.toLocaleDateString('en-US', {
                year: 'numeric',
                })}
            </div>
            <Button onClick={() => handleYearChange(1)}><MdArrowForwardIos className='text-xl font-bold' /> </Button>
        </div>
        <div className=''>
            <div className='flex justify-between items-center'>
                <h3 className='font-bold text-sm md:text-md'>Total hours</h3>
                <h4>{newHours}h</h4>
            </div>
            <div className='flex justify-between items-center pl-3 border-b-2 border-b-black/50 py-2'>
                <h5>Ministry hours</h5>
                <p>{newHours}h</p>
            </div>
            <div className='flex justify-between items-center'>
                <h3 className='font-bold text-sm md:text-md'>Placements</h3>
                <h4> </h4>
            </div>
            <div className='pl-3 border-b-2 border-b-black/50 py-2'>
                <div className='flex justify-between items-center  '>
                    <h5>Magazines</h5>
                    <p>{reportData?.magazine}</p>
                </div>
                <div className='flex justify-between items-center  '>
                    <h5>Brochures</h5>
                    <p>{reportData?.brochure}</p>
                </div>
                <div className='flex justify-between items-center  '>
                    <h5>Books</h5>
                    <p>{reportData?.book}</p>
                </div>
                <div className='flex justify-between items-center  '>
                    <h5>Tracts </h5>
                    <p>{reportData?.tracts}</p>
                </div>
            </div>
            <div className='flex justify-between items-center  border-b-2 border-b-black/50 py-1 '>
                <h3 className='font-bold text-sm md:text-md'>Videos Showing</h3>
                <h4>{reportData?.videoShowing}</h4>
            </div>
            <div className='flex justify-between items-center  border-b-2 border-b-black/50 py-1 '>
                <h3 className='font-bold text-sm md:text-md'>Return Visits</h3>
                <h4>{reportData?.returnVisit}</h4>
            </div>
            <div className='flex justify-between items-center  border-b-2 border-b-black/50 py-1'>
                <h3 className='font-bold text-sm md:text-md'>Studies</h3>
                <h4>{reportData?.bibleStudy}</h4>
            </div>
        </div>
    </>
  )
}

export default YearlyReport