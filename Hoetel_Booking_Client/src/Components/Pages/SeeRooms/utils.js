// utils.js

export const isRoomAvailable = (room, startDate, endDate) => {
    const requestedDates = getDatesBetween(startDate, endDate);
  
    for (const bookedDate of room.bookedDates) {
      if (requestedDates.includes(bookedDate)) {
        return false;
      }
    }
  
    return true;
  };
  
  export const getDatesBetween = (startDate, endDate) => {
    const dates = [];
    let currentDate = new Date(startDate);
  
    while (currentDate <= endDate) {
      dates.push(currentDate.toISOString().split('T')[0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }
  
    return dates;
  };
  