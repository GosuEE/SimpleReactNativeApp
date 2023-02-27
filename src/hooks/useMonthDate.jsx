import { useEffect, useState } from "react";
import { DAYS_IN_MONTH } from "../helper/constants";
import isLeapYear from "../utils/isLeapYear";
import getNewYearsMonth from "../utils/getNewYearsMonth";

function useMonthDate(year, month) {
  const [calendarDates, setCalendarDates] = useState();
  const [isMounted, setIsMounted] = useState(false);

  const [end, setEnd] = useState(DAYS_IN_MONTH[month]);
  const [startDay, setStartDay] = useState(
    new Date(year, month - 1, 1).getDay()
  );

  useEffect(() => {
    if (isLeapYear(year)) DAYS_IN_MONTH[2] = 29;
    else DAYS_IN_MONTH[2] = 28;
  }, [year]);

  useEffect(() => {
    setEnd(() => DAYS_IN_MONTH[month]);
    setStartDay(() => new Date(year, month - 1, 1).getDay());
  }, [year, month]);

  useEffect(() => {
    const dates = new Array(end).fill("").map((v, i) => {
      return { year: year, month: month, date: i + 1, color: "black" };
    });

    let { newMonth, newYear } = getNewYearsMonth(year, month - 1);
    const beforeMonthDates = new Array(startDay)
      .fill("")
      .map((v, i) => {
        return {
          year: newYear,
          month: newMonth,
          date: DAYS_IN_MONTH[newMonth] - i,
          color: "#c0c0c0",
        };
      })
      .reverse();

    newMonth = getNewYearsMonth(year, month + 1).newMonth;
    newYear = getNewYearsMonth(year, month + 1).newYear;
    const endDay = new Date(year, month - 1, end).getDay();
    const nextMonthDates = new Array(6 - endDay).fill("").map((v, i) => {
      return { year: newYear, month: newMonth, date: i + 1, color: "#c0c0c0" };
    });

    setCalendarDates(beforeMonthDates.concat(dates).concat(nextMonthDates));
    setIsMounted(true);
  }, [end, startDay]);

  return { calendarDates, isMounted };
}

export default useMonthDate;
