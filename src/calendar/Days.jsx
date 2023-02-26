import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import styled from "styled-components";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function handleColorType(day) {
  switch (day) {
    case "Sun":
      return "#CD1039";
    case "Sat":
      return "#2828CD";
    default:
      return "#c0c0c0";
  }
}

function Days() {
  return (
    <StDays>
      {days.map((v, i) => (
        <Day
          width={`${100 / 7}%`}
          key={v}
          day={v}
          handleColorType={handleColorType}
        >
          {v}
        </Day>
      ))}
    </StDays>
  );
}

const StDays = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Day = styled(Text)`
  margin-bottom: 15px;
  text-align: center;
  font-size: 20px;
  color: ${(props) => props.handleColorType(props.day)};
  width: ${(props) => props.width};
`;

export default Days;
