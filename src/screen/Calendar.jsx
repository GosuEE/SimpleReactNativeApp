import { View } from "react-native";
import styled from "styled-components";
import Header from "../calendar/Header";
import Body from "../calendar/Body";
import { useEffect, useState } from "react";
import { PanGestureHandler } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { CALENDAR_MODE } from "../helper/constants";

export default function Calendar() {
  const [date, setDate] = useState(new Date().getDate());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [calendarMode, setCalendarMode] = useState(CALENDAR_MODE.MONTH);

  const dispatch = useDispatch();

  function handleGesture({ nativeEvent }) {
    if (nativeEvent.velocityY > 0) {
      setCalendarMode(CALENDAR_MODE.MONTH);
    } else {
      setCalendarMode(CALENDAR_MODE.WEEK);
    }
  }

  return (
    <Container>
      <Header
        setMonth={setMonth}
        setYear={setYear}
        month={month}
        year={year}
        calendarMode={calendarMode}
      />
      <Body date={date} month={month} year={year} calendarMode={calendarMode} />
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
  background-color: blueviolet;
  flex: 1 0 auto;
`;

const Container = styled(View)`
  background-color: yellowgreen;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
