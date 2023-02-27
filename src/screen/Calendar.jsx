import { View } from "react-native";
import styled from "styled-components";
import Header from "../calendar/Header";
import Body from "../calendar/Body";
import { useEffect, useState } from "react";
import { PanGestureHandler } from "react-native-gesture-handler";
import { CALENDAR_MODE } from "../helper/constants";

export default function Calendar() {
  const [date, setDate] = useState(new Date().getDate());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [calendarMode, setCalendarMode] = useState(CALENDAR_MODE.MONTH);

  const [headerMonth, setHeaderMonth] = useState(new Date().getMonth() + 1);
  const [headerYear, setHeaderYear] = useState(new Date().getFullYear());

  function handleGesture({ nativeEvent }) {
    if (nativeEvent.velocityY > 0) {
      setCalendarMode(CALENDAR_MODE.MONTH);
      setMonth(headerMonth);
      setYear(headerYear);
    } else {
      setCalendarMode(CALENDAR_MODE.WEEK);
    }
  }
  useEffect(() => {
    setHeaderMonth(month);
    setHeaderYear(year);
  }, [month, year]);

  return (
    <Container>
      <Header
        setHeaderMonth={setHeaderMonth}
        setHeaderYear={setHeaderYear}
        headerMonth={headerMonth}
        headerYear={headerYear}
        setMonth={setMonth}
        setYear={setYear}
        month={month}
        year={year}
        calendarMode={calendarMode}
      />
      <Body
        date={date}
        month={month}
        year={year}
        setYear={setYear}
        setMonth={setMonth}
        calendarMode={calendarMode}
      />
      <PanGestureHandler
        onGestureEvent={handleGesture}
        onHandlerStateChange={handleGesture}
      >
        <Other />
      </PanGestureHandler>
    </Container>
  );
}

const Other = styled(View)`
  background-color: white;
  flex: 1 0 auto;
`;

const Container = styled(View)`
  background-color: white;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
