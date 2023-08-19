export function getDaysLeftInMonth() {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    
    // Get the last day of the current month
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    // Calculate the number of days left
    const daysLeft = lastDayOfMonth - currentDate.getDate();
    
    return daysLeft;
  }
  
  
  