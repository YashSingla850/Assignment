function solution(D) {
  // Define a mapping from day of the week (0-6) to day name
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  // Initialize an array to hold the sum of values for each day of the week
  const daySums = [0, 0, 0, 0, 0, 0, 0];
  
  // Convert each date string in the input dictionary to a Date object,
  // and use the getDay() method to determine the day of the week
  for (const dateString in D) {
    const date = new Date(dateString);
    const dayOfWeek = date.getDay();
    daySums[dayOfWeek] += D[dateString];
  }
  
  // Initialize an object to hold the output dictionary
  const output = {};
  
  // Loop over each day of the week, and add a key-value pair to the output dictionary
  for (let i = 0; i < daysOfWeek.length; i++) {
    const dayName = daysOfWeek[i];
    const daySum = daySums[i];
    
    // If the sum is 0, skip this day of the week
    if (daySum === 0) {
      continue;
    }
    
    // If the sum is negative, set the value in the output dictionary to 0
    if (daySum < 0) {
      output[dayName] = 0;
    } else {
      output[dayName] = daySum;
    }
  }
  
  // Fill in missing days with the mean of the previous and next days
  for (let i = 0; i < daysOfWeek.length; i++) {
    const dayName = daysOfWeek[i];
    const prevDayName = daysOfWeek[(i - 1 + 7) % 7];
    const nextDayName = daysOfWeek[(i + 1) % 7];
    
    // If the current day is already in the output dictionary, skip it
    if (output[dayName] !== undefined) {
      continue;
    }
    
    // Otherwise, calculate the mean of the previous and next days
    const prevDaySum = output[prevDayName] || 0;
    const nextDaySum = output[nextDayName] || 0;
    const mean = Math.round((prevDaySum + nextDaySum) / 2);
    
    output[dayName] = mean;
  }
  
  return output;
}
