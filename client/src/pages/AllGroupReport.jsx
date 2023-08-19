import React, { useEffect, useRef, useState } from "react"
import Layout from '../layout'
import { fetchUser } from "../utils/fetchMainUser"
import { getGroupUser } from "../helper/helper"
import axios from "axios"
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md"
import { Box, Button } from "@mui/material"


const AllGroupReport = () => {
    const [groupedUsers, setGroupedUsers ] = useState(null)
    const [currentDate, setCurrentDate] = useState(new Date());
    const [newHours, setNewHours ] = useState('00:00')
    const [memberIds, setMemberIds] = useState("");
    const [reportData, setReportData] = useState({});
    
    const userInfo = fetchUser()
    const printContainerRef = useRef(null);

    useEffect(() => {
        if (userInfo) {
          getGroupUser(userInfo.group)
            .then((response) => {
              const data = response.data;
              if (Array.isArray(data)) {
                const filteredMembers = data.filter((member) => {
                  return member.congregationGroup === userInfo.group;
                });
                setGroupedUsers(filteredMembers);
              }
            })
            .catch((error) => console.log(error));
        }
      }, [userInfo?.group]);

      console.log("membersids",memberIds)
    useEffect(() => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1; // Months are zero-indexed

        const fetchData = async (year, month) => {
            try {
              const response = await axios.get(`http://localhost:4000/api/reportMonthGroup`, {
                params: {
                  year,
                  month,
                },
              });
              const data = response.data;
              console.log(data);
          
              // Calculate the totals for each field
              const memberTotals = {}; // Create an object to store totals for each member

              data.forEach((report) => {
                const memberId = report?.userId;
                console.log("Member ID:", memberId);
                if (!memberTotals[memberId]) {
                  memberTotals[memberId] = {
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
                  
                    
                }

              function calculateTime(hours, minutes) {
                const total = hours * 60 + minutes;
                return total;
              }
          
             
                for (const key in memberTotals[memberId]) {
                  if (key === 'hour') {
                    const [hours, minutes] = report[key].split(':').map(Number);
                    memberTotals[memberId][key] += calculateTime(hours, minutes);
                  } else {
                    memberTotals[memberId][key] += report[key] || 0;
                  }
                }
                // Calculate total hours and remaining minutes
                const totalHours = Math.floor(memberTotals[memberId].hour / 60);
                const remainingMinutes = memberTotals[memberId].hour % 60;
                const newHour = `${totalHours}:${remainingMinutes}`;
               

                // Make sure memberTotals[memberId] exists before setting newHour
                if (memberTotals[memberId]) {
                    memberTotals[memberId].newHour = newHour;
                    setNewHours(newHour)
                }
              });
          
              // Update the reportData state with the calculated member totals
              setReportData(memberTotals);
          
           
              // Display the result
            //   console.log(`Total Hours: ${totalHours}:${remainingMinutes}`);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          };
          
        fetchData(year, month);
      }, [currentDate]);

      const handleMonthChange = (months) => {
        const newDate = new Date(currentDate);
        newDate.setMonth(newDate.getMonth() + months);
        setCurrentDate(newDate);
      };
  
     
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
    <Layout>
    <div ref={printContainerRef} className="overflow-x-auto">
        <div className="flex justify-center items-center py-3">
            <h2 className="text-blue-500 font-bold">{userInfo?.group} Members Report</h2>
        </div>
        <div className="flex justify-between items-center px-5 py-4">
            <Button onClick={() => handleMonthChange(-1)}><MdArrowBackIos className='text-xl font-bold' /> </Button>
            <div className="text-sm md:text-lg font-semibold">
                {currentDate.toLocaleDateString('en-US', {
                month: 'long',
                year: 'numeric',
                })}
            </div>
            <Button onClick={() => handleMonthChange(1)}><MdArrowForwardIos className='text-xl font-bold' /> </Button>
        </div>
      <table className="table w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2">Members</th>
            <th className="border border-gray-300 px-4 py-2">Hour</th>
            <th className="border border-gray-300 px-4 py-2">Placement</th>
            <th className="border border-gray-300 px-4 py-2">Video</th>
            <th className="border border-gray-300 px-4 py-2">Return</th>
            <th className="border border-gray-300 px-4 py-2">Studies</th>
          </tr>
        </thead>
        <tbody>
        {groupedUsers?.map((user) => (
            <tr key={user._id}>
                <td className="border border-gray-300 px-4 py-2">{`${user.firstName} ${user.lastName}`}</td>
                {reportData[user._id] && (
                <React.Fragment>
                    <td className="border border-gray-300 px-4 py-2">{reportData[user._id].newHour}</td>
                    <td className="border border-gray-300 px-4 py-2">{reportData[user._id].magazine + reportData[user._id].book + reportData[user._id].brochure + reportData[user._id].tracts}</td>
                    <td className="border border-gray-300 px-4 py-2">{reportData[user._id].videoShowing}</td>
                    <td className="border border-gray-300 px-4 py-2">{reportData[user._id].returnVisit}</td>
                    <td className="border border-gray-300 px-4 py-2">{reportData[user._id].bibleStudy}</td>
                </React.Fragment>
                )}
            </tr>
            ))}

        </tbody>

      </table>
    </div>
    <Box className='mt-6 flex justify-center items-center'>
        <Button  variant="contained" color='primary' onClick={handlePrint}>
          Print 
        </Button>
      </Box>
  </Layout>
  )
}

export default AllGroupReport