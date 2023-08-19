import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { MdArrowForwardIos, MdArrowBackIos } from "react-icons/md";
import { fetchUser } from "../utils/fetchMainUser";
import axios from "axios";

const DailyReport = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [newHours, setNewHours] = useState("00:00");
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
  console.log(reportData);

  const userInfo = fetchUser();

  console.log(userInfo.userId);

  useEffect(() => {
    // Fetch data based on the current date and update reportData state
    fetchData(currentDate);
  }, [currentDate]);
  console.log(currentDate);

  const fetchData = async (date) => {
    try {
      const year = date.getFullYear();
      const month = date.getMonth() + 1; // Months are zero-indexed
      const day = date.getDate();
      // Construct the formatted date string (YYYY-MM-DD)
      const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
        .toString()
        .padStart(2, "0")}`;
      // Make your API call here to fetch data for the given date
      const response = await axios.get(
        `http://localhost:4000/api/report?date=${formattedDate}&&userId=${userInfo?.userId}`
      );
      // Access data from the response object
      const data = response.data;
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
      const total = data.reduce(
        (accumulator, report) => {
          for (const key in totals) {
            if (key === "hour") {
              const [hours, minutes] = report[key].split(":").map(Number);
              accumulator[key] += calculateTime(hours, minutes);
            } else {
              accumulator[key] += report[key] || 0;
            }
          }
          return accumulator;
        },
        {
          hour: 0,
          placement: 0,
          magazine: 0,
          brochure: 0,
          book: 0,
          tracts: 0,
          videoShowing: 0,
          returnVisit: 0,
          bibleStudy: 0,
        }
      );

      // Convert totalMinutes back to hours and minutes
      const totalHours = Math.floor(total.hour / 60);
      const remainingMinutes = total.hour % 60;
      const newHour = `${totalHours}:${remainingMinutes}`;
      setNewHours(newHour);
      console.log(newHour);
      // Display the result
      console.log(`Total Hours: ${totalHours}:${remainingMinutes}`);

      // Update the reportData state with the fetched data and totals
      setReportData({ total });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  console.log(reportData);

  const handleDateChange = (days) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + days);
    setCurrentDate(newDate);
  };

  return (
    <>
      <div className="flex justify-between items-center px-4 pb-2">
        <Button onClick={() => handleDateChange(-1)}>
          <MdArrowBackIos className="text-xl font-bold" />
        </Button>
        <div className="text-sm md:text-lg font-semibold">
          {currentDate.toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </div>
        <Button onClick={() => handleDateChange(1)}>
          <MdArrowForwardIos className="text-xl font-bold" />
        </Button>
      </div>
      <div className="">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-sm md:text-md">Total hours</h3>
          <h4></h4>
        </div>
        <div className="flex justify-between items-center pl-3 border-b-2 border-b-black/50 py-2">
          <h5>Ministry hours</h5>
          <p>{newHours}</p>
        </div>
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-sm md:text-md">Placements</h3>
          <h4> {reportData?.total?.placements} </h4>
        </div>
        <div className="pl-3 border-b-2 border-b-black/50 py-2">
          <div className="flex justify-between items-center  ">
            <h5>Magazines</h5>
            <p> {reportData?.total?.magazine} </p>
          </div>
          <div className="flex justify-between items-center  ">
            <h5>Brochures</h5>
            <p> {reportData?.total?.brochure} </p>
          </div>
          <div className="flex justify-between items-center  ">
            <h5>Books</h5>
            <p> {reportData?.total?.book} </p>
          </div>
          <div className="flex justify-between items-center  ">
            <h5>Tracts </h5>
            <p> {reportData?.total?.tracts} </p>
          </div>
        </div>
        <div className="flex justify-between items-center  border-b-2 border-b-black/50 py-1 ">
          <h3 className="font-bold text-sm md:text-md">Videos Showing</h3>
          <h4> {reportData?.total?.videoShowing} </h4>
        </div>
        <div className="flex justify-between items-center  border-b-2 border-b-black/50 py-1 ">
          <h3 className="font-bold text-sm md:text-md">Return Visits</h3>
          <h4> {reportData?.total?.returnVisit} </h4>
        </div>
        <div className="flex justify-between items-center  border-b-2 border-b-black/50 py-1">
          <h3 className="font-bold text-sm md:text-md">Bible Studies</h3>
          <h4> {reportData?.total?.bibleStudy} </h4>
        </div>
        <div className="py-5">
          <p className="py-2 text-blue-500 font-bold">
            {userInfo?.firstname} {userInfo?.lastname} {userInfo?.middlename}
          </p>
          <p className="text-xs font-bold ">
            Only todays report will be shown here please. To see your Report for
            the Month, kindly move to the Monthly report session.
            <br /> Thank you
          </p>
        </div>
      </div>
    </>
  );
};

export default DailyReport;
