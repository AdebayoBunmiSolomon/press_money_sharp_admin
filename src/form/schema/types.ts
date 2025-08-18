export type loginFormTypes = {
  email: string;
  password: string;
};

export type signUpFormTypes = {
  first_name: string;
  last_name: string;
  gender: string;
  email: string;
  password: string;
  confirm_password: string;
  phone: string;
  referral_code: string;
};

export type passwordResetFormTypes = {
  email: string;
};

export type passwordUpdateFormTypes = {
  password: string;
  confirm_password: string;
};

export type messageActionFormTypes = {
  // name: string;
  // email: string;
  // phone: string;
  message: string;
};

export type consultationFormTypes = {
  name: string;
  email: string;
  phone: string;
  message: string;
  priority: string;
  type: string;
};

export type updateProfileFormTypes = {
  address: string;
  dob: string;
  // profile_img: string;
  referred_by: string;
};

export type createServiceFormTypes = {
  category: string;
  brand: string;
  type: string;
  model: string;
  fee: string;
  has_online_payment: string; //boolean
  description: string;
  status: string;
  image_file: string;
  location: string;
};
