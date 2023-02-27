import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { DAYS_IN_MONTH } from "../helper/constants";
import getNewYearsMonth from "../utils/getNewYearsMonth";

function useWeekDate(
  selectedYear,
  selectedMonth,
  selectedDate,
  year,
  month,
  calendarDates,
  isMounted
) {
  const [weekCalendarDates, setWeekCalendarDates] = useState();

  useEffect(() => {
    if (isMounted) {
      let selected = false;

      for (let i = 0; i < calendarDates.length; i++) {
        const { date, month, year } = calendarDates[i];
        if (
          date === selectedDate &&
          month == selectedMonth &&
          year === selectedYear
        ) {
          selected = true;
          break;
        }
      }

      if (selected) {
        const selectedDay = new Date(
          selectedYear,
          selectedMonth - 1,
          selectedDate
        ).getDay();
        selectedDay;

        const beforeWeekDays = new Array(selectedDay)
          .fill("")
          .map((v, i) => ({
            year: selectedYear,
            month: selectedMonth,
            date: selectedDate - (i + 1),
            color: "black",
          }))
          .reverse();

        const afterWeekDays = new Array(6 - selectedDay)
          .fill("")
          .map((v, i) => ({
            year: selectedYear,
            month: selectedMonth,
            date: selectedDate + (i + 1),
            color: "black",
          }));

        setWeekCalendarDates(
          beforeWeekDays
            .concat([
              {
                year: selectedYear,
                month: selectedMonth,
                date: selectedDate,
                color: "black",
              },
            ])
            .concat(afterWeekDays)
            .map((v, i) => {
              const { date } = v;
              if (date < 1) {
                const { newMonth, newYear } = getNewYearsMonth(
                  year,
                  selectedMonth - 1
                );
                return {
                  year: newYear,
                  month: newMonth,
                  date: DAYS_IN_MONTH[newMonth] + v.date,
                  color: "black",
                };
              } else if (date > DAYS_IN_MONTH[selectedMonth]) {
                const { newMonth, newYear } = getNewYearsMonth(
                  year,
                  selectedMonth + 1
                );
                return {
                  year: newYear,
                  month: newMonth,
                  date: v.date - DAYS_IN_MONTH[selectedMonth],
                  color: "black",
                };
              }
              return v;
            })
        );
      } else {
        setWeekCalendarDates(
          calendarDates.slice(0, 7).map((v) => {
            const { year, month, date } = v;
            return { year, month, date, color: "black" };
          })
        );
      }
    }
  }, [calendarDates, selectedDate, selectedMonth, selectedYear, isMounted]);

  return weekCalendarDates;
}

export default useWeekDate;
