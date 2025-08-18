export const endpoint = {
  AUTH: {
    signUp: "/users", //create new user
    verifyEmail: "/verify-email", //verify user email
    login: "/auth/login", //login
    requestPassword: "/auth/request-password",
    verifyToken: "/auth/verify-token",
    updatePassword: "/auth/change-password",
  },
  APP: {
    getCategories: "/category", //get category
    scheduleConsultation: "/consultations",
    getAllService: "/services?page=1&per_page=10&sort=desc", //&search=&type=&range%5Bfrom%5D=&range%5Bto%5D=
    viewService: "/services", //pass the service_uuid as query parameter
    sendMessage: "/admin/chats",
    getSettings: "/settings",
    getUserNotifications: "/notifications/user", //pass the user uuid
    addProductToWishList: "/wishlists",
    getUserWishList: "/wishlists/mywish",
    deleteUserWishList: "/wishlists", //pass the wishlist uuid -> /wishlist/{uuid}/remove
    addProductToRecentlyViewed: "/recent-views",
    getUserRecentlyViewed: "/recent-views/myviews",
    deleteUserRecentlyViewed: "/recent-views", //pass the wishlist uuid -> /recent-views/{uuid}
    getUserReferral: "/referrals/myreferral",
    getUserReferralRewardHistory: "/referral-rewards/user",
    getAllUserChats: `/admin/chats/user`,
    getUserServiceMessages: "/admin/my-chats", //pass the service uuid -> /admin/my-chats/{uuid}
    sendChatMessage: "/admin/chats",
    updateUserProfile: "/users/profile",
    getTermsAndConditions: "/compliances",
  },
  ADMIN: {
    getCategories: "/category",
    getCarBrands: "/car-brand",
    getCarTypes: "/car-type",
    getServiceStatus: "/service-status",
    createService: "/admin/services",
    getAllAdminChats: `/admin/chats`,
    getAdminUserMessages: "/admin/view-chats", //pass the user_uuid and service_uuid
    sendReceiverMessage: "/admin/chats", //pass the receiver_uuid
  },
};
