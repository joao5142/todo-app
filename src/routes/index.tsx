import { View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";

import { AppRoutes } from "./modules/app";
import { AuthRoutes } from "./modules/auth";
import { useStore } from "@/store";

export function Routes() {
  const isUserLogged = useStore((state) => state.isUserLogged);
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <NavigationContainer>
        {isUserLogged ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </View>
  );
}
