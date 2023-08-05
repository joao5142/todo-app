import { StatusBar } from "react-native";
import Toast from "react-native-toast-message";

import {
  useFonts as useRobotoFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import {
  useFonts as useInterFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import { ThemeProvider } from "styled-components";

import defaultTheme from "@/theme";

import { Routes } from "@/routes";
import { Loading } from "@/components/ui/Loading";

import { SheetProvider } from "react-native-actions-sheet";

import "@/customLibraries/sheet";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { useStore } from "@/store";
import { TOKEN_COLLECTION } from "@/storage";
import { useEffect } from "react";

export default function App() {
  const login = useStore((state) => state.login);

  const [robotoFontsLoaded] = useRobotoFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  const [interFontsLoaded] = useInterFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
  });

  async function checkIsUserLoggedIn() {
    const userToken = await AsyncStorage.getItem(TOKEN_COLLECTION);

    if (userToken) {
      login();
    }
  }

  useEffect(() => {
    checkIsUserLoggedIn();
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <SheetProvider>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="light-content"
        />
        {robotoFontsLoaded && interFontsLoaded ? <Routes /> : <Loading />}
        <Toast />
      </SheetProvider>
    </ThemeProvider>
  );
}
