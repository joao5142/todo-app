import { StatusBar } from "react-native";

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

export default function App() {
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

  return (
    <ThemeProvider theme={defaultTheme}>
      <SheetProvider>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="light-content"
        />
        {robotoFontsLoaded && interFontsLoaded ? <Routes /> : <Loading />}
      </SheetProvider>
    </ThemeProvider>
  );
}
