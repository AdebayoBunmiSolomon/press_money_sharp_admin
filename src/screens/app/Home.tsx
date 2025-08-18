import { CustomText } from "@src/components/shared";
import { appScreenNames } from "@src/navigation";
import { colors } from "@src/resources/color/color";
import { DVH, DVW, moderateScale } from "@src/resources/responsiveness";
import { RootStackScreenProps } from "@src/router/types";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Screen } from "../Screen";
import { StatusBar } from "expo-status-bar";
import { ScrollContainer } from "../ScrollContainer";
import {
  useGetCarBrand,
  useGetCarTypes,
  useGetCategory,
  useGetServiceStatus,
} from "@src/api/hooks/queries/app";
import { useAuthStore } from "@src/api/store/auth";

export const Home = ({
  navigation,
}: RootStackScreenProps<appScreenNames.HOME>) => {
  const {} = useGetCategory();
  const {} = useGetCarBrand();
  const {} = useGetCarTypes();
  const {} = useGetServiceStatus();
  const { userData } = useAuthStore();

  return (
    <>
      <StatusBar style='dark' />
      <Screen style={styles.screenContainer} safeArea>
        <View
          style={{
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <CustomText type='regular' size={20} black style={{}}>
            Welcome, {userData?.first_name}
          </CustomText>
        </View>
        <ScrollContainer style={styles.scrollContainer}>
          <View
            style={{
              paddingVertical: DVH(5),
            }}
          />
        </ScrollContainer>
      </Screen>
    </>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: moderateScale(15),
  },
  input: {
    backgroundColor: "#F9F9F9",
    borderWidth: DVW(0.3),
    borderColor: "#BDBDBD",
    borderRadius: moderateScale(20),
  },
  cta: {
    backgroundColor: colors.red,
    paddingTop: moderateScale(20),
    borderRadius: moderateScale(15),
    overflow: "hidden",
  },
  xPloreBtn: {
    width: "30%",
    paddingVertical: moderateScale(10),
    borderRadius: moderateScale(15),
    marginBottom: moderateScale(20),
  },
  leftInnerCta: {
    gap: moderateScale(50),
    paddingLeft: moderateScale(15),
  },
  ctaImgContainer: {
    width: DVW(60),
    height: DVH(17),
  },
  ctaImg: {
    width: "100%",
    height: "100%",
  },
  imgXploreContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingLeft: moderateScale(15),
  },
  scrollContainer: {
    gap: moderateScale(10),
    paddingTop: moderateScale(10),
  },
});
