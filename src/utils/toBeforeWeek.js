import { setWeekDate } from "../app/slices/weekDateSlice";
import { DAYS_IN_MONTH } from "../helper/constants";
import getNewYearsMonth from "./getNewYearsMonth";

export default function toBeforeWeek(dispatch, weekCalendarDates) {
  dispatch(
    setWeekDate(
      weekCalendarDates.map((v) => {
        let { year, month, date } = v;
        date -= 7;
        if (date < 1) {
          const { newYear, newMonth } = getNewYearsMonth(year, month - 1);
          return {
            year: newYear,
            month: newMonth,
            date: DAYS_IN_MONTH[newMonth] + date,
            color: "black",
          };
        }
        return { ...v, date };
      })
    )
  );
}
