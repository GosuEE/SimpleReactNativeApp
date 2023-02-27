import { Pressable, StyleSheet, Text, View } from "react-native";
import styled from "styled-components";
import { AntDesign } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import toBeforeMonth from "../utils/toBeforeMonth";
import toNextMonth from "../utils/toNextMonth";

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
function Header({ month, year, setMonth, setYear, calendarMode }) {
  function toBeforeWeek() {}
  function toNextWeek() {}
  return (
    <Container>
      <Pressable onPress={() => toBeforeMonth(month, year, setMonth, setYear)}>
        <LeftIcon name="left" size={28} color="#0078ff" />
      </Pressable>
      <Month>{`${months[month]} ${year}`}</Month>
      <Pressable onPress={() => toNextMonth(month, year, setMonth, setYear)}>
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
