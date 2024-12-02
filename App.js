// import React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
// import SignInScreen from "./SignInScreen";
// import SignUpScreen from "./SignUpScreen";
// import TaskScreen from "./TaskScreen";

// const Stack = createStackNavigator();

// const App = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="SignIn">
//         <Stack.Screen name="SignIn" component={SignInScreen} />
//         <Stack.Screen name="SignUp" component={SignUpScreen} />
//         <Stack.Screen name="Home" component={TaskScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default App;

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignInScreen from "./SignInScreen";
import SignUpScreen from "./SignUpScreen";
import TaskScreen from "./TaskScreen";
import AddEventScreen from "./AddEventScreen";
import FavoriteEventsScreen from "./FavoriteEventsScreen";
import EditEventScreen from "./EditEventScreen";


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Home" component={TaskScreen} />
        <Stack.Screen name="AddEvent" component={AddEventScreen} />
        <Stack.Screen name="FavoriteEvents" component={FavoriteEventsScreen} />
        <Stack.Screen name="EditEvent" component={EditEventScreen} />
        <Stack.Screen name="SignIN" component={SignInScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
