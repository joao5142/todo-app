import { View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";

import { AppRoutes } from "./modules/app";
import { AuthRoutes } from "./modules/auth";

export function Routes() {
	return (
		<View style={{ flex: 1, backgroundColor: "white" }}>
			<NavigationContainer>
				<AuthRoutes />
				{/* <AppRoutes /> */}
			</NavigationContainer>
		</View>
	);
}
