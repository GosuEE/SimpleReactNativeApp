import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import Days from "./Days";
import styled from "styled-components";
import CalendarDate from "./CalendarDate";
import useMonthDate from "../hooks/useMonthDate";
import { useDispatch, useSelector } from "react-redux";
import useWeekDate from "../hooks/useWeekDate";
import { CALENDAR_MODE } from "../helper/constants";
import { PanGestureHandler, Swipeable } from "react-native-gesture-handler";
import toBeforeMonth from "../utils/toBeforeMonth";
import toBeforeWeek from "../utils/toBeforeWeek";
import toNextMonth from "../utils/toNextMonth";
import toNextWeek from "../utils/toNextWeek";

function Body({ year, month, setYear, setMonth, date, calendarMode }) {
  const { calendarDates, isMounted } = useMonthDate(year, month);
  const [selectedDate, setSelectedDate] = useState(date);
  const [selectedMonth, setSelectedMonth] = useState(month);
  const [selectedYear, setSelectedYear] = useState(year);
  const [renderData, setRenderData] = useState();
  const weekCalendarDates = useSelector((state) => state.weekDate.weekDate);
  const dispatch = useDispatch();

  useWeekDate(
    selectedYear,
    selectedMonth,
    selectedDate,
    year,
    calendarDates,
    isMounted
  );

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

  function handleGesture({ nativeEvent }) {
    if (nativeEvent.velocityX > 1000) {
      if (calendarMode === CALENDAR_MODE.MONTH) {
        toBeforeMonth(month, year, setMonth, setYear);
      } else {
        toBeforeWeek(dispatch, weekCalendarDates);
      }
    } else if (nativeEvent.velocityX < -1000) {
      if (calendarMode === CALENDAR_MODE.MONTH) {
        toNextMonth(month, year, setMonth, setYear);
      } else {
        toNextWeek(dispatch, weekCalendarDates);
      }
    }
  }

  return (
    <Container>
      <Days />
      {isMounted && (
        <PanGestureHandler
          activeOffsetX={[-100, 100]}
          onGestureEvent={handleGesture}
        >
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
        </PanGestureHandler>
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
