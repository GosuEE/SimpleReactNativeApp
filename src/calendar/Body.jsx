import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import Days from "./Days";
import styled from "styled-components";
import CallendarDate from "./CallendarDate";
import useMonthDate from "../hooks/useMonthDate";

function Body({ year, month, date }) {
  const { callendarDates, isMounted } = useMonthDate(year, month);

  const [selectedDate, setSelectedDate] = useState(date);
  const [selectedMonth, setSelectedMonth] = useState(month);
  const [selectedYear, setSelectedYear] = useState(year);

  const [week, setWeek] = useState();

  function setSelected(item) {
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
          data={callendarDates}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          renderItem={({ item, index }) => (
            <CallendarDate
              item={item}
              index={index}
              month={month}
              selectedDate={selectedDate}
              selectedMonth={selectedMonth}
              selectedYear={selectedYear}
              setSelected={setSelected}
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
