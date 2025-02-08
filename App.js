import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { PlantProvider } from "./contexts/PlantContext";
import AppNavigator from "./navigation/Navigator";

const App = () => {
  return (
    <PlantProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </PlantProvider>
  );
};

export default App;
