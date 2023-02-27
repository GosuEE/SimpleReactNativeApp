import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import styled from "styled-components";

function CalendarDate({
  item,
  index,
  selectedYear,
  selectedMonth,
  selectedDate,
  selectDate,
}) {
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    const { date, month, year } = item;

    if (
      date === selectedDate &&
      month === selectedMonth &&
      year === selectedYear
    ) {
      setIsSelected(() => true);
    } else {
      setIsSelected(() => false);
    }
  }, [selectedDate, selectedMonth, selectedYear, item]);

  // useEffect(() => {
  //   if (month !== item.month && isSelected) setIsSelected(false);
  // }, [isSelected]);

  return (
    <DateWrapper width={`${100 / 7}%`}>
      <Date
        style={{
          color: `${item.color}`,
        }}
        key={index}
      >
        {`${item.date}`}
      </Date>
      {isSelected && <Selected></Selected>}
      <StPressable onPress={() => selectDate(item)} />
    </DateWrapper>
  );
}

const StPressable = styled(Pressable)`
  position: absolute;
  margin: auto;
  width: 40;
  height: 40;
`;

const DateWrapper = styled(View)`
  width: ${(props) => props.width};
  align-items: center;
  justify-content: center;
  position: relative;
`;

const Selected = styled(View)`
  background-color: 0;
  border-radius: 50%;
  border: solid 2px blue;

  position: absolute;
  margin: auto;
  width: 40;
  height: 40;
`;

const Date = styled(Text)`
  font-size: 24px;
  text-align: center;
  padding: 10px 0;
`;

export default CalendarDate;
