import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { MdArrowForwardIos, MdArrowBackIos } from "react-icons/md";
import axios from "axios";
import { fetchUser } from "../utils/fetchMainUser";
import { getDaysLeftInMonth } from "../utils/dayLeft";
import { FcEditImage } from 'react-icons/fc'

const MonthReport = () => {
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

  const userInfo = fetchUser();

  useEffect(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Months are zero-indexed
    fetchData(year, month);
  }, [currentDate]);

  const fetchData = async (year, month) => {
    try {
      const response = await axios.get(
        `https://suame-backend.onrender.com/api/reportMonth`,
        {
          params: {
            year,
            month,
            userId: userInfo?.userId,
          },
        }
      );
      const data = response.data;
      console.log(data);

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

  const totalPlacements =
    reportData?.total?.book +
      reportData?.total?.magazine +
      reportData?.total?.brochure +
      reportData?.total?.tracts || 0;

  const pioneerHours = 50;
  const auxillaryHours = 30;

  const totalHour =
    userInfo?.minProfile === "Regular pioneer" ? pioneerHours : auxillaryHours;

  const remainingDays = getDaysLeftInMonth();
  console.log(remainingDays);

  // Convert newHours to minutes for calculation
  const [newHoursHours, newHoursMinutes] = newHours.split(":").map(Number);
  console.log(newHoursHours, newHoursMinutes);
  const newHoursInMinutes = newHoursHours * 60 + newHoursMinutes;

  // Calculate the goal hour per day
  const goalHourPerDayInMinutes =
    remainingDays > 0
      ? Math.ceil((totalHour * 60 - newHoursInMinutes) / remainingDays)
      : 0;

  // Convert goalHourPerDay back to hours and minutes
  const goalHourPerDayHours = Math.floor(goalHourPerDayInMinutes / 60);
  const goalHourPerDayMinutes = goalHourPerDayInMinutes % 60;

  console.log("goalHourPerDayHours:", goalHourPerDayHours);
  console.log("goalHourPerDayMinutes:", goalHourPerDayMinutes);

  const handleMonthChange = (months) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + months);
    setCurrentDate(newDate);
  };

  return (
    <>
      <div className="flex justify-between items-center px-4 pb-2">
        <Button onClick={() => handleMonthChange(-1)}>
          <MdArrowBackIos className="text-xl font-bold" />{" "}
        </Button>
        <div className="text-sm md:text-lg font-semibold">
          {currentDate.toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </div>
        <Button onClick={() => handleMonthChange(1)}>
          <MdArrowForwardIos className="text-xl font-bold" />{" "}
        </Button>
      </div>
      <div className="">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-sm md:text-md">Total hours</h3>
          <h4
            className={`${
              newHoursInMinutes > totalHour * 60 ? "text-green-500" : ""
            } ${
              Math.abs(goalHourPerDayHours) > 2 ? "text-red-500" : ""
            } font-bold`}
          >
            {newHours}{" "}
            {(userInfo?.minProfile === "Regular pioneer" ||
              userInfo?.minProfile === "Auxillary pioneer") && (
              <>
                ({totalHour}h, {Math.abs(goalHourPerDayHours)}:
                {Math.abs(goalHourPerDayMinutes)}h/day)
              </>
            )}
          </h4>
        </div>
        <div className="flex justify-between items-center pl-3 border-b-2 border-b-black/50 py-2">
          <h5>Ministry hours</h5>
          <p>{newHours || 0}h</p>
        </div>
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-sm md:text-md">Placements</h3>
          <h4 className="font-bold"> {totalPlacements && totalPlacements} </h4>
        </div>
        <div className="pl-3 border-b-2 border-b-black/50 py-2">
          <div className="flex justify-between items-center  ">
            <h5>Magazines</h5>
            <p>{reportData?.total?.magazine || 0}</p>
          </div>
          <div className="flex justify-between items-center  ">
            <h5>Brochures</h5>
            <p>{reportData?.total?.brochure || 0}</p>
          </div>
          <div className="flex justify-between items-center  ">
            <h5>Books</h5>
            <p>{reportData?.total?.book || 0}</p>
          </div>
          <div className="flex justify-between items-center  ">
            <h5>Tracts </h5>
            <p>{reportData?.total?.tracts || 0}</p>
          </div>
        </div>
        <div className="flex justify-between items-center  border-b-2 border-b-black/50 py-1 ">
          <h3 className="font-bold text-sm md:text-md">Videos Showing</h3>
          <h4>{reportData?.total?.videoShowing || 0}</h4>
        </div>
        <div className="flex justify-between items-center  border-b-2 border-b-black/50 py-1 ">
          <h3 className="font-bold text-sm md:text-md">Return Visits</h3>
          <h4>{reportData?.total?.returnVisit || 0}</h4>
        </div>
        <div className="flex justify-between items-center  border-b-2 border-b-black/50 py-1">
          <h3 className="font-bold text-sm md:text-md">Bible Studies</h3>
          <h4>{reportData?.total?.bibleStudy || 0}</h4>
        </div>
        <div className="py-10 flex justify-around items-center">
          <div className="flex gap-x-4">
            <h2 className="font-bold">Profile :</h2>
            <h3 className="font-semibold text-sm md:text-md text-blue-500">
              {userInfo?.minProfile}
            </h3>
          </div>
          <div className="">
            <FcEditImage />
          </div>
        </div>
      </div>
    </>
  );
};

export default MonthReport;
