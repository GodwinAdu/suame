export const fetchData = async (date) => {
    try {
        // Make your API call here to fetch data for the given date
        const response = await fetch(`/api/reports?date=${date.toISOString()}`);
        const data = await response.json();

        // Update the reportData state with the fetched data
        setReportData(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export const fetchDataMonth = async (year, month) => {
    try {
        // Calculate the number of days in the specified month
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const fetchedData = [];

        // Fetch data for each day in the month
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            const response = await fetch(`/api/reports?date=${date.toISOString()}`);
            const data = await response.json();
            fetchedData.push({ date, data });
        }

        // Update the reportData state with the fetched data
        setReportData(fetchedData);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};
