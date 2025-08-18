import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from "@react-navigation/native-stack";
import { RootStackParamList } from "@src/router/types";
import React from "react";
import { appScreenNames } from "@src/navigation";
import * as CategoriesScreen from "..";

const ScreenStack = createNativeStackNavigator<RootStackParamList>();
const headerOptions: NativeStackNavigationOptions = { headerShown: false };

export const ServiceStack = () => {
  return (
    <ScreenStack.Navigator
      screenOptions={headerOptions}
      initialRouteName={"CreateService"}>
      <ScreenStack.Screen
        name={appScreenNames.CREATE_SERVICE}
        component={CategoriesScreen.CreateService}
      />
      <ScreenStack.Screen
        name={appScreenNames.CAR_SALES}
        component={CategoriesScreen.CarSales}
      />
      <ScreenStack.Screen
        name={appScreenNames.CAR_HIRE}
        component={CategoriesScreen.CarHire}
      />
      <ScreenStack.Screen
        name={appScreenNames.DEALERS_DEAL}
        component={CategoriesScreen.DealersDeal}
      />
      <ScreenStack.Screen
        name={appScreenNames.SPARE_PARTS}
        component={CategoriesScreen.SpareParts}
      />
      <ScreenStack.Screen
        name={appScreenNames.CONSULTATION_SERVICES}
        component={CategoriesScreen.ConsultationServices}
      />
    </ScreenStack.Navigator>
  );
};
