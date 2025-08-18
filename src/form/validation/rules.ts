import * as yup from "yup";

export const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("invalid email address")
    .required("Email is required"),
  password: yup.string().required("password is required"),
});

export const signUpValidationSchema = yup.object().shape({
  first_name: yup.string().required("first name is required"),
  last_name: yup.string().required("last name is required"),
  gender: yup.string().required("gender is required"),
  email: yup
    .string()
    .email("invalid email address")
    .required("email is required"),
  password: yup.string().required("password is required"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Passwords must match")
    .required("Please confirm your password"),
  phone: yup.string().required("phone number is required"),
  referral_code: yup.string().required("needed"),
});

export const passwordResetValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("invalid email address")
    .required("email is required"),
});

export const passwordUpdateValidationSchema = yup.object().shape({
  password: yup.string().required("password is required"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Passwords must match")
    .required("Please confirm your password"),
});

export const messageActionFormValidationSchema = yup.object().shape({
  // name: yup.string().required("name is required"),
  // phone: yup.string().required("phone number is required"),
  // email: yup
  //   .string()
  //   .email("invalid email address")
  //   .required("email is required"),
  message: yup.string().required("message is required"),
});

export const consultationFormValidationSchema = yup.object().shape({
  name: yup.string().required("name is required"),
  phone: yup.string().required("phone number is required"),
  email: yup
    .string()
    .email("invalid email address")
    .required("email is required"),
  message: yup.string().required("message is required"),
  priority: yup.string().required("priority is required"),
  type: yup.string().required("consultation type is required"),
});

export const updateProfileValidationSchema = yup.object().shape({
  address: yup.string().required("address is required"),
  dob: yup.string().required("DOB is required"),
  // profile_img: yup.string().required("profile image is required"),
  referred_by: yup.string().required("referred by is required"),
});

export const createServiceValidationSchema = yup.object().shape({
  category: yup.string().required("category is required"),
  brand: yup.string().required("brand is required"),
  type: yup.string().required("type is required"),
  model: yup.string().required("model is required"),
  fee: yup.string().required("fee is required"),
  has_online_payment: yup.string().required("this is required"),
  description: yup.string().required("description is required"),
  status: yup.string().required("status is required"),
  image_file: yup.string().required("image is required"),
  location: yup.string().required("location is required"),
});
