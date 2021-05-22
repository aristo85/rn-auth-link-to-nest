import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { Provider } from "react-redux";
import store from "./redux";
import MainNavigation from "./navigation/MainNavigation";

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts} //this has to be a function and return a promise
        onFinish={() => setDataLoaded(true)} //a listener
        onError={(error) => console.log(error)} // in case of error fetching, we can show alternative component or ~cl~
      />
    );
  }
  return (
    <Provider store={store}>
      <StatusBar hidden />
      <MainNavigation />
    </Provider>
  );
}
