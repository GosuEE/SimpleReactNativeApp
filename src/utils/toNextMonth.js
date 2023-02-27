export default function toNextMonth(month, year, setMonth, setYear) {
  if (month >= 12) {
    setMonth(month + 1 - 12);
    setYear(year + 1);
  } else {
    setMonth(month + 1);
  }
}
