import { View } from "react-native";
import styled from "styled-components";
import Header from "../calendar/Header";
import Body from "../calendar/Body";
import { useEffect, useState } from "react";
import { PanGestureHandler } from "react-native-gesture-handler";

export default function Calendar() {
  const [date, setDate] = useState(new Date().getDate());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [day, setDay] = useState(new Date().getDay());

  useEffect(() => {
    setDay(new Date(year, month - 1, date).getDay());
  }, [year, month, date]);

  function handleGesture({ nativeEvent }) {
    if (nativeEvent.velocityY > 0) {
      console.log("Swipe down");
    } else {
      console.log("Swipe up");
    }
  }

  return (
    <Container>
      <Header
        setMonth={setMonth}
        setYear={setYear}
        date={date}
        month={month}
        day={day}
        year={year}
      />
      <Body date={date} month={month} day={day} year={year} />
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
