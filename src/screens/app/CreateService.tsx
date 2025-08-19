import { CustomButton, CustomInput, CustomText } from "@src/components/shared";
import { appScreenNames } from "@src/navigation";
import { colors } from "@src/resources/color/color";
import { DVH, DVW, moderateScale } from "@src/resources/responsiveness";
import { RootStackScreenProps } from "@src/router/types";
import React, { useEffect, useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Screen } from "../Screen";
import { StatusBar } from "expo-status-bar";
import { Header } from "@src/components/app/home";
import { ScrollContainer } from "../ScrollContainer";
import { Controller, useForm } from "react-hook-form";
import { createServiceValidationSchema } from "@src/form/validation/rules";
import { createServiceFormTypes } from "@src/form/schema/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { ImagePickerResult, useMedia } from "@src/hooks/services";
import { Image } from "expo-image";
import { FileUploadModal } from "@src/common";
import {
  useCarBrandsStore,
  useCarTypesStore,
  useCategoriesStore,
  useServiceStatusStore,
} from "@src/api/store/app";
import { useCreateService } from "@src/api/hooks/mutation/app";
import { useIsFocused } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { showFlashMsg } from "@src/helper/ui-utils";

export const CreateService = ({
  navigation,
}: RootStackScreenProps<appScreenNames.CREATE_SERVICE>) => {
  const isFocused = useIsFocused();
  const { categories } = useCategoriesStore();
  const { carBrands } = useCarBrandsStore();
  const { carTypes } = useCarTypesStore();
  const { serviceStatus } = useServiceStatusStore();
  const [fileUploadVisible, setFileUploadVisible] = useState<boolean>(false);
  const { pickMultipleFromGallery } = useMedia();
  const { CreateService, isPending, isSuccess } = useCreateService();
  const [arrImgResult, setArrImgResult] = useState<ImagePickerResult[] | null>(
    []
  );
  const [fields, setFields] = useState<any[]>([{ title: "", value: "" }]);
  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<createServiceFormTypes>({
    mode: "onChange",
    resolver: yupResolver(createServiceValidationSchema),
  });

  const handleAddField = () => {
    setFields((prev: any) => [...prev, { title: "", value: "" }]);
  };

  const handleRemoveField = (index: number) => {
    const updatedFields = fields.filter(
      (__: any, fieldIdx: number) => fieldIdx !== index
    );
    setFields(updatedFields);
  };

  const handleChange = (
    index: number,
    key: "title" | "value",
    text: string
  ) => {
    const updatedFields = [...fields];
    updatedFields[index][key] = text;
    setFields(updatedFields);
    setValue("description", JSON.stringify(updatedFields));
  };

  useEffect(() => {
    if (isSuccess) {
      reset();
      setArrImgResult(null);
      setFields([{ title: "", value: "" }]);
    }
  }, [isSuccess]);

  const onSubmit = (data: createServiceFormTypes) => {
    CreateService({
      category: data?.category,
      brand: data?.brand,
      type: data?.type,
      model: data?.model,
      fee: data?.fee,
      has_online_payment: data?.has_online_payment === "Yes" ? true : false,
      description: data?.description,
      status: data?.status,
      image_file: arrImgResult || null,
      location: data?.location,
    });
  };

  return (
    <>
      <StatusBar style='dark' />
      <Screen style={styles.screenContainer} safeArea>
        <Header
          leftIcon={
            <View style={styles.headerLeftIconContainer}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <AntDesign
                  name='arrowleft'
                  size={moderateScale(20)}
                  color={colors.lightBlack}
                />
              </TouchableOpacity>
              <CustomText
                type='medium'
                size={16}
                style={{
                  color: colors.lightBlack,
                }}>
                Create a Service
              </CustomText>
            </View>
          }
          color={colors.lightBlack}
        />
        <ScrollContainer style={styles.scrollContainer}>
          {arrImgResult && arrImgResult.length > 0 ? (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.imgScroll}>
              {arrImgResult.map((img, index) => (
                <TouchableOpacity
                  style={styles.imgBtn}
                  key={index}
                  onPress={() => setFileUploadVisible(!fileUploadVisible)}>
                  <Image
                    source={{ uri: img.uri }}
                    style={styles.profileImg}
                    contentFit='cover'
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>
          ) : (
            <TouchableOpacity
              style={[styles.imgBtn]}
              onPress={() => setFileUploadVisible(!fileUploadVisible)}>
              <View style={styles.emptyImgContainer}>
                <AntDesign
                  name='camera'
                  size={moderateScale(20)}
                  color={colors.white}
                />
              </View>
            </TouchableOpacity>
          )}
          <Controller
            control={control}
            render={({ field }) => (
              <CustomInput
                title='Category'
                value={field.value}
                dropDownItems={categories ? categories : []}
                onSelectDropDownItem={(selectedValue) => {
                  field.onChange(selectedValue);
                }}
                error={errors?.category?.message}
                type='dropdown'
                placeholder='select the category'
                placeHolderTextColor={"#BDBDBD"}
                showErrorText
                style={styles.input}
                dropDownBtnStyle={{
                  paddingTop: moderateScale(10),
                }}
              />
            )}
            name='category'
            defaultValue=''
          />

          <Controller
            control={control}
            render={({ field }) => (
              <CustomInput
                title='Brand'
                value={field.value}
                dropDownItems={carBrands ? carBrands : []}
                onSelectDropDownItem={(selectedValue) => {
                  field.onChange(selectedValue);
                }}
                error={errors?.brand?.message}
                type='dropdown'
                placeholder='select the priority'
                placeHolderTextColor={"#BDBDBD"}
                showErrorText
                style={styles.input}
                dropDownBtnStyle={{
                  paddingTop: moderateScale(10),
                }}
              />
            )}
            name='brand'
            defaultValue=''
          />

          <Controller
            control={control}
            render={({ field }) => (
              <CustomInput
                title='Type'
                value={field.value}
                dropDownItems={carTypes ? carTypes : []}
                onSelectDropDownItem={(selectedValue) => {
                  field.onChange(selectedValue);
                }}
                error={errors?.type?.message}
                type='dropdown'
                placeholder='select the type'
                placeHolderTextColor={"#BDBDBD"}
                showErrorText
                style={styles.input}
                dropDownBtnStyle={{
                  paddingTop: moderateScale(10),
                }}
              />
            )}
            name='type'
            defaultValue=''
          />

          <Controller
            control={control}
            render={({ field }) => (
              <CustomInput
                title='Model'
                value={field.value}
                onChangeText={(enteredValue) => field.onChange(enteredValue)}
                error={errors?.model?.message}
                type='custom'
                placeholder='car model'
                placeHolderTextColor={"#BDBDBD"}
                keyboardType='default'
                showErrorText
                style={styles.input}
              />
            )}
            name='model'
            defaultValue=''
          />

          <Controller
            control={control}
            render={({ field }) => (
              <CustomInput
                title='Fee'
                value={field.value}
                onChangeText={(enteredValue) => field.onChange(enteredValue)}
                error={errors?.fee?.message}
                type='custom'
                placeholder='0.00'
                placeHolderTextColor={"#BDBDBD"}
                keyboardType='number-pad'
                showErrorText
                style={styles.input}
              />
            )}
            name='fee'
            defaultValue=''
          />

          <Controller
            control={control}
            render={({ field }) => (
              <CustomInput
                title='Has online payment?'
                value={field.value}
                dropDownItems={["Yes", "No"]}
                onSelectDropDownItem={(selectedValue) => {
                  field.onChange(selectedValue);
                }}
                error={errors?.has_online_payment?.message}
                type='dropdown'
                placeholder='select the type'
                placeHolderTextColor={"#BDBDBD"}
                showErrorText
                style={styles.input}
                dropDownBtnStyle={{
                  paddingTop: moderateScale(10),
                }}
              />
            )}
            name='has_online_payment'
            defaultValue=''
          />

          <Controller
            control={control}
            render={({ field }) => (
              <CustomInput
                title='Status'
                value={field.value}
                dropDownItems={serviceStatus ? serviceStatus : []}
                onSelectDropDownItem={(selectedValue) => {
                  field.onChange(selectedValue);
                }}
                error={errors?.status?.message}
                type='dropdown'
                placeholder='select the type'
                placeHolderTextColor={"#BDBDBD"}
                showErrorText
                style={styles.input}
                dropDownBtnStyle={{
                  paddingTop: moderateScale(10),
                }}
              />
            )}
            name='status'
            defaultValue=''
          />

          <View style={{ flex: 1 }}>
            {fields.map((field: any, index: number) => (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 10, // spacing between rows
                }}>
                <View style={styles.titleContainer}>
                  <CustomInput
                    title='Title'
                    value={field.title}
                    onChangeText={(text) => handleChange(index, "title", text)}
                    type='custom'
                    placeholder='title'
                    placeHolderTextColor='#BDBDBD'
                    keyboardType='default'
                    showErrorText
                    style={styles.input}
                  />
                </View>
                <View style={styles.titleContainer}>
                  <CustomInput
                    title='Value'
                    value={field.value}
                    onChangeText={(text) => handleChange(index, "value", text)}
                    type='custom'
                    placeholder='value'
                    placeHolderTextColor='#BDBDBD'
                    keyboardType='default'
                    showErrorText
                    style={styles.input}
                  />
                </View>
                {index !== 0 && (
                  <CustomButton
                    lightBlack
                    textWhite
                    buttonType='Solid'
                    textSize={16}
                    textType='medium'
                    onPress={() => {
                      handleRemoveField(index);
                    }}
                    btnStyle={[
                      styles.addBtn,
                      {
                        width: "10%",
                        paddingLeft: moderateScale(10),
                        marginTop: moderateScale(25),
                      },
                    ]}
                    leftIcon={
                      <AntDesign
                        name='delete'
                        size={moderateScale(15)}
                        color={colors.white}
                      />
                    }
                  />
                )}
              </View>
            ))}

            {/* Keep the Add Button separate */}
            <CustomButton
              title='Add More'
              lightBlack
              textWhite
              buttonType='Solid'
              textSize={16}
              textType='medium'
              onPress={handleAddField}
              btnStyle={styles.addBtn}
            />
          </View>

          <Controller
            control={control}
            render={({ field }) => (
              <CustomInput
                title='Location'
                value={field.value}
                onChangeText={(enteredValue) => field.onChange(enteredValue)}
                error={errors?.location?.message}
                type='custom'
                placeholder='anywhere'
                placeHolderTextColor={"#BDBDBD"}
                keyboardType='default'
                showErrorText
                style={styles.input}
              />
            )}
            name='location'
            defaultValue=''
          />

          <CustomButton
            title='Create a Service'
            red
            textWhite
            buttonType='Solid'
            textSize={16}
            textType='medium'
            onPress={handleSubmit(onSubmit, (data) => {
              if (data?.description?.message) {
                showFlashMsg({
                  msgType: "ERROR",
                  title: "Error",
                  description: "Title and Value is empty",
                });
              }
            })}
            btnStyle={styles.createServiceBtn}
            isLoading={isPending}
            loaderColor={colors.white}
          />
          <View
            style={{
              paddingVertical: DVH(5),
            }}
          />
        </ScrollContainer>
      </Screen>
      <FileUploadModal
        visible={fileUploadVisible}
        onClose={() => setFileUploadVisible(!fileUploadVisible)}
        onClickGallery={async () => {
          const arrImgRes = await pickMultipleFromGallery({
            maxImages: 4, // Allow up to 8 images
            minImages: 4, // Require at least 4 images
            quality: 0.3, // Slightly higher quality
          });
          if (arrImgRes) {
            setFileUploadVisible(!fileUploadVisible);
            setArrImgResult(arrImgRes);
            setValue("image_file", arrImgRes[0]?.uri);
          }
        }}
        noCamera
      />
    </>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(0),
  },
  headerLeftIconContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(10),
  },
  input: {
    backgroundColor: "#bdbdbd2f",
    borderWidth: DVW(0.3),
    borderColor: "#BDBDBD",
  },
  scrollContainer: {
    gap: moderateScale(20),
  },
  imgBtn: {
    width: DVW(25),
    height: Platform.OS === "ios" ? DVH(11.5) : DVH(11.5),
    borderRadius: moderateScale(100),
    borderWidth: DVW(0.3),
    borderColor: colors.white,
    overflow: "hidden",
    alignSelf: "center",
  },
  profileImg: {
    width: "100%",
    height: "100%",
  },
  emptyImgContainer: {
    backgroundColor: colors.lightGray,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  createServiceBtn: {
    paddingVertical: moderateScale(17),
  },
  addBtn: {
    width: "100%",
    paddingVertical: moderateScale(10),
    marginTop: moderateScale(5),
    justifyContent: "center",
    alignItems: "center",
  },
  imgScroll: {
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(5),
    paddingRight: moderateScale(20),
  },
  titleContainer: {
    width: "43%",
  },
});
