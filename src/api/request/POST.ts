// import axios, { AxiosRequestConfig } from "axios";
// import { BASE_URL } from "@env";

// export const POST = async (
//   endpoint: string,
//   payload: any,
//   config?: AxiosRequestConfig
// ) => {
//   try {
//     const { data, status } = await axios.post(
//       `${BASE_URL}${endpoint}`,
//       payload,
//       config
//     );
//     return { status, data };
//   } catch (error: any) {
//     if (error.response) {
//       //API responded with an error status (e.g., 400, 500)
//       return { status: error?.response?.status, data: error?.response?.data };
//     } else if (error.request) {
//       //No response received (e.g., network error, timeout)
//       return { status: 0, data: null }; // `0` indicates network failure
//     } else {
//       //Other unexpected errors
//       return { status: -1, data: null };
//     }
//   }
// };

import axios, { AxiosRequestConfig } from "axios";
import { BASE_URL } from "@env";

export const POST = async (
  endpoint: string,
  payload: any,
  config?: AxiosRequestConfig
) => {
  try {
    // Ensure clean URL
    const url = `${BASE_URL.replace(/\/$/, "")}/${endpoint.replace(/^\//, "")}`;

    const { data, status } = await axios.post(url, payload, {
      headers: {
        "Content-Type":
          payload instanceof FormData
            ? "multipart/form-data"
            : "application/json",
        ...config?.headers,
      },
      ...config,
    });

    return { status, data };
  } catch (error: any) {
    if (error.response) {
      return { status: error.response.status, data: error.response.data };
    } else if (error.request) {
      return { status: 0, data: null }; // network error
    } else {
      return { status: -1, data: null };
    }
  }
};
