import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome, FontAwesome5, Feather, Entypo } from "@expo/vector-icons";

import Calendar from "../screen/Calendar";
import Home from "../screen/Home";
import Library from "../screen/Library";
import MyPage from "../screen/MyPage";

const BottomTab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="HOME"
      screenOptions={{
        tabBarInactiveTintColor: "gray",
        tabBarActiveTintColor: "black",
      }}
    >
      <BottomTab.Screen
        name="HOME"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <FontAwesome5
              name="home"
              size={24}
              color={focused ? "black" : "gray"}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="CALENDAR"
        component={Calendar}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="calendar"
              size={24}
              color={focused ? "black" : "gray"}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="LIBRARY"
        component={Library}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <FontAwesome5
              name="dumbbell"
              size={24}
              color={focused ? "black" : "gray"}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="MY PAGE"
        component={MyPage}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Feather name="user" size={24} color={focused ? "black" : "gray"} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

export default BottomTabNavigator;
