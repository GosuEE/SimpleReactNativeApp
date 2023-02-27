import { useEffect } from "react";
import { useSelector } from "react-redux";

function useAdjustYearMonth(year, month, setYear, setMonth) {
  const weekCalendarDates = useSelector((state) => state.weekDate.weekDate);

  useEffect(() => {
    if (weekCalendarDates.length !== 0) {
      let flag = true;
      for (let i = 0; i < weekCalendarDates.length; i++) {
        if (month === weekCalendarDates[i].month) {
          flag = false;
          break;
        }
      }
      if (flag) {
        setYear(() => weekCalendarDates[0].year);
        setMonth(() => weekCalendarDates[0].month);
      }
    }
  }, [weekCalendarDates]);
}

export default useAdjustYearMonth;
