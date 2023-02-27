import { Pressable, StyleSheet, Text, View } from "react-native";
import styled from "styled-components";
import { AntDesign } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import toBeforeMonth from "../utils/toBeforeMonth";
import toNextMonth from "../utils/toNextMonth";
import { useDispatch, useSelector } from "react-redux";
import getNewYearsMonth from "../utils/getNewYearsMonth";
import { CALENDAR_MODE, DAYS_IN_MONTH } from "../helper/constants";
import { setWeekDate } from "../app/slices/weekDateSlice";
import toBeforeWeek from "../utils/toBeforeWeek";
import toNextWeek from "../utils/toNextWeek";
import useAdjustYearMonth from "../hooks/useAdjustYearMonth";

const months = [
  "0",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
function Header({
  setHeaderMonth,
  setHeaderYear,
  headerMonth,
  headerYear,
  month,
  year,
  setMonth,
  setYear,
  calendarMode,
}) {
  const weekCalendarDates = useSelector((state) => state.weekDate.weekDate);
  const dispatch = useDispatch();

  useAdjustYearMonth(headerYear, headerMonth, setHeaderYear, setHeaderMonth);

  return (
    <Container>
      <Pressable
        onPress={() => {
          if (calendarMode === CALENDAR_MODE.MONTH)
            toBeforeMonth(month, year, setMonth, setYear);
          else toBeforeWeek(dispatch, weekCalendarDates);
        }}
      >
        <LeftIcon name="left" size={28} color="#0078ff" />
      </Pressable>
      <Month>{`${months[headerMonth]} ${headerYear}`}</Month>
      <Pressable
        onPress={() => {
          if (calendarMode === CALENDAR_MODE.MONTH)
            toNextMonth(month, year, setMonth, setYear);
          else toNextWeek(dispatch, weekCalendarDates);
        }}
      >
        <RightIcon name="right" size={24} color="#0078ff" />
      </Pressable>
    </Container>
  );
}

const Month = styled(Text)`
  margin: auto;
  font-size: 24px;
`;

const LeftIcon = styled(AntDesign)`
  margin-right: auto;
`;

const RightIcon = styled(AntDesign)`
  margin-left: auto;
`;

const Container = styled(View)`
  background-color: white;
  display: flex;
  flex-direction: row;
  padding: 20px;
  margin-top: 34px;
`;

export default Header;
