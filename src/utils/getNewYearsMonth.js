export default function getNewYearsMonth(year, month) {
  let newYear = year;
  let newMonth = month;
  if (newMonth < 1) {
    newYear -= 1;
    newMonth += 12;
  }
  if (newMonth > 12) {
    newYear += 1;
    newMonth -= 12;
  }
  return { newYear, newMonth };
}
