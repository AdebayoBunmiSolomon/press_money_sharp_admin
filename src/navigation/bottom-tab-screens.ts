import { bottomTabScreenTypes } from "@src/types/types";
import { bottomTabScreenNames } from "./navigation-names";
import * as Screen from "@src/screens/app/bottom-tab";

export const bottomTabScreens: bottomTabScreenTypes[] = [
  {
    screenName: bottomTabScreenNames.HOME_STACK,
    component: Screen.HomeStack,
  },
  {
    screenName: bottomTabScreenNames.SERVICES_STACK,
    component: Screen.ServiceStack,
  },
  {
    screenName: bottomTabScreenNames.NOTIFICATION_STACK,
    component: Screen.NotificationStack,
  },
  {
    screenName: bottomTabScreenNames.MESSAGES_STACK,
    component: Screen.MessagesStack,
  },
  {
    screenName: bottomTabScreenNames.PROFILE_STACK,
    component: Screen.ProfileStack,
  },
];
