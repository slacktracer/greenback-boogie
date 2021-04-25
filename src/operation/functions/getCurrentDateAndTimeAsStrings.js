export const getCurrentDateAndTimeAsStrings = ({ timestamp } = {}) => {
  const newDate = new Date(timestamp);

  const year = newDate.getFullYear();
  const month = String(newDate.getMonth() + 1).padStart(2, "0");
  const dayOfTheMonth = String(newDate.getDate()).padStart(2, "0");

  const date = `${year}-${month}-${dayOfTheMonth}`;

  const hours = String(newDate.getHours()).padStart(2, "0");
  const minutes = String(newDate.getMinutes()).padStart(2, "0");

  const time = `${hours}:${minutes}`;

  return { date, month, time, year };
};
