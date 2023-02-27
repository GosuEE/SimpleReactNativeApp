export default function toBeforeMonth(month, year, setMonth, setYear) {
  if (month <= 1) {
    setMonth(month - 1 + 12);
    setYear(year - 1);
  } else {
    setMonth(month - 1);
  }
}
