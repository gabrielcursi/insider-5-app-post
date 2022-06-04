import React from "react";
import { StatusBar } from "react-native";
import Home from "./src/pages/Home";
import Routes from "./src/routes";
import { NavigationContainer } from "@react-navigation/native";

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#232630" barStyle="light-content" />
      <Routes />
    </NavigationContainer>
  );
};

export default App;
