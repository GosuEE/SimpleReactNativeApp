import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import Days from "./Days";
import styled from "styled-components";
import CalendarDate from "./CalendarDate";
import useMonthDate from "../hooks/useMonthDate";
import { useSelector } from "react-redux";
import useWeekDate from "../hooks/useWeekDate";
import { CALENDAR_MODE } from "../helper/constants";

function Body({ year, month, date, calendarMode }) {
  const { calendarDates, isMounted } = useMonthDate(year, month);
  const [selectedDate, setSelectedDate] = useState(date);
  const [selectedMonth, setSelectedMonth] = useState(month);
  const [selectedYear, setSelectedYear] = useState(year);
  const [renderData, setRenderData] = useState();

  const weekCalendarDates = useWeekDate(
    selectedYear,
    selectedMonth,
    selectedDate,
    year,
    month,
    calendarDates,
    isMounted
  );

  const [weekCalendarYear, setWeekCalendarYear] = useState(year);
  const [weekCalendarMonth, setWeekCalendarMonth] = useState(month);
  const [weekCalendarDate, setWeekCalendarDate] = useState(date);

  useEffect(() => {
    if (calendarMode === CALENDAR_MODE.MONTH) {
      setRenderData(calendarDates);
    } else {
      setRenderData(weekCalendarDates);
    }
  }, [calendarMode, calendarDates, weekCalendarDates]);

  function selectDate(item) {
    if (item.year !== year || item.month !== month) return;
    setSelectedDate(item.date);
    setSelectedMonth(item.month);
    setSelectedYear(item.year);
  }

  return (
    <Container>
      <Days />
      {isMounted && (
        <FlatList
          data={renderData}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          renderItem={({ item, index }) => (
            <CalendarDate
              item={item}
              index={index}
              selectedDate={selectedDate}
              selectedMonth={selectedMonth}
              selectedYear={selectedYear}
              selectDate={selectDate}
            />
          )}
          numColumns={7}
        />
      )}
    </Container>
  );
}

const Container = styled(View)`
  background-color: white;
  display: flex;
  padding: 10px;
`;

export default Body;
