import { useEffect, useState } from "react";

function getNewYearsMonth(year, month) {
  let newYear = year;
  let newMonth = month;
  if (newMonth < 1) {
    newYear -= 1;
    newMonth += 12;
  }
  if (newMonth > 12) {
    newYear = +1;
    newMonth -= 12;
  }
  return { newYear, newMonth };
}

function isLeapYear(year) {
  return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
}

const daysInMonth = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function useMonthDate(year, month) {
  const [callendarDates, setCallendarDates] = useState();
  const [isMounted, setIsMounted] = useState(false);

  const [end, setEnd] = useState(daysInMonth[month]);
  const [startDay, setStartDay] = useState(
    new Date(year, month - 1, 1).getDay()
  );

  useEffect(() => {
    if (isLeapYear(year)) daysInMonth[2] = 29;
    else daysInMonth[2] = 28;
  }, [year]);

  useEffect(() => {
    setEnd(() => daysInMonth[month]);
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
          date: daysInMonth[newMonth] - i,
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

    setCallendarDates(beforeMonthDates.concat(dates).concat(nextMonthDates));
    setIsMounted(true);
  }, [end, startDay]);

  return { callendarDates, isMounted };
}

export default useMonthDate;
