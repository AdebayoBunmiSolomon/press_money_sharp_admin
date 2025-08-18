import { QueryClient } from "@tanstack/react-query";
import * as Network from "expo-network";
import moment from "moment";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});
/**
 * @returns boolean status of the internetConnection
 */
export const getNetworkStatus = async () => {
  const status = await Network.getNetworkStateAsync();
  return {
    isNetworkConnectedAndReachable: status.isInternetReachable,
  };
};

/**
 * logs the response from the API only in development mode
 * @param status
 * @param success
 * @param code
 * @param message
 */

export const APILogger = (
  status: number,
  success: boolean,
  code: string,
  message: string
) => {
  if (__DEV__) {
    console.log("🚀 Response Log:");
    console.log("Status:", status);
    console.log("Success:", success);
    console.log("Code:", code);
    console.log("Message:", message);
  }
};

/**
 * Extracts the first capitalized word segment from a PascalCase or CamelCase string.
 *
 * This function detects the second capital letter and returns the part of the string
 * before it. Useful for splitting strings like "WordClass" → "Word".
 *
 * @param word - The input PascalCase or CamelCase string.
 * @returns The first word segment (up to the second capital letter).
 *
 * @example
 * getFirstCapitalSegment("UserModel"); // "User"
 * getFirstCapitalSegment("GetUserData"); // "Get"
 * getFirstCapitalSegment("Service"); // "Service" (only one capital word)
 */
export const getFirstCapitalSegment = (word: string): string => {
  const match = word.match(/[A-Z][a-z]*/g);
  if (!match) return word; // fallback if no capital letters found
  return match[0]; // return the first word
};

export const formatApiErrorMessage = (error: any): string => {
  const generalMessage = error?.message ?? "An error occurred.";
  const fieldErrors = error?.fields;

  const formattedFieldMessages = fieldErrors
    ? Object.values(fieldErrors).flat().join(" ")
    : "";

  return [generalMessage, formattedFieldMessages].filter(Boolean).join(" ");
};

/**
 * Removes all "+" signs from the given string.
 *
 * @param input - The string to clean.
 * @returns A new string with all "+" signs removed.
 *
 * @example
 * removePlusSign("+2348012345678") // "2348012345678"
 * removePlusSign("Hello+World") // "HelloWorld"
 */
export const removePlusSign = (input: string): string => {
  return input.replace(/\+/g, "");
};

/**
 * Combines country dial code with user input (phone number)
 * Removes +, trims leading 0 from phone, and returns a full international format
 * @param dialCode e.g. "+234"
 * @param number e.g. "08012345678"
 * @returns e.g. "+2348012345678"
 */
export const formatPhoneWithCountryCode = (
  dialCode: string,
  number: string
): string => {
  const cleanedDialCode = dialCode.replace(/\+/g, "");
  const cleanedNumber = number.replace(/^0+/, ""); // remove leading zero(s)
  return `+${cleanedDialCode}${cleanedNumber}`;
};
/**
 *
 * @param amount e.g. 1000
 * @returns 1,000
 */
export const formatAmountWithCommas = (amount: number) => {
  let amtStr = amount.toString();
  let formattedAmt = amtStr.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return formattedAmt;
};

export const extractTextFromHtml = (htmlText: string): string => {
  // Remove all HTML tags
  const withoutTags = htmlText.replace(/<\/?[^>]+(>|$)/g, "");

  // Decode basic HTML entities (optional step)
  const text = withoutTags
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");

  // Trim and normalize spaces
  return text.replace(/\s+/g, " ").trim();
};

/**
 * truncates text by default to length of 10 characters or by length of choice.
 * @param text
 * @param length
 * @returns
 */

export const truncateText = (text: string, length = 10): string => {
  if (!text) return "...";

  const limit = Math.max(0, length);
  return text.length > limit ? `${text.substring(0, limit).trim()}...` : text;
};

export const getDateStringVal = (dateVal: string, showDateTime?: boolean) => {
  if (!dateVal || isNaN(new Date(dateVal).getTime())) {
    return "Invalid date";
  }

  const date = new Date(dateVal); // do not append anything!

  const year = date.getFullYear();
  const monthName = date.toLocaleString("default", { month: "long" });
  const day = date.getDate();

  const getOrdinal = (n: number): string => {
    if (n > 3 && n < 21) return `${n}th`;
    switch (n % 10) {
      case 1:
        return `${n}st`;
      case 2:
        return `${n}nd`;
      case 3:
        return `${n}rd`;
      default:
        return `${n}th`;
    }
  };

  // Function to format time in 12-hour format
  const formatTime = (date: Date): string => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";

    // Convert to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 should be 12

    // Add leading zero to minutes if needed
    const minutesStr = minutes < 10 ? "0" + minutes : minutes.toString();

    return `${hours}:${minutesStr} ${ampm}`;
  };

  if (showDateTime) {
    const timeString = formatTime(date);
    return `${timeString}`;
  } else {
    return `${getOrdinal(day)} ${monthName}, ${year}`;
  }
};

/**
 * ✅ NEW: Helper to group messages by date
 *  */
export const groupMessagesByDate = (messages: any) => {
  const grouped: any = {};

  messages.forEach((msg: any) => {
    const dateKey = moment(msg.created_at).format("YYYY-MM-DD");
    if (!grouped[dateKey]) {
      grouped[dateKey] = [];
    }
    grouped[dateKey].push(msg);
  });

  return Object.keys(grouped).map((date) => ({
    date,
    data: grouped[date],
  }));
};

/**
 * Helps to fix broken url returned from the server
 * @param url takes the value of the wrong URL
 * @returns the right URL as in https:// instead of /storage://....
 */
export const fixImageUrl = (url: string) => {
  if (!url) return "";

  const storagePrefix = "/storage/";
  if (url.startsWith(storagePrefix)) {
    return url.replace(storagePrefix, "");
  }

  return url; // already correct
};

/**
 *
 * @param imgName
 * @returns the image extension and @mimeType returns the image/png
 */
export const getImgExtNType = (imgName: string) => {
  if (imgName) {
    const ext = imgName.split(".").pop()?.toLowerCase() || "jpg";
    const mimeType = ext === "png" ? "image/png" : "image/jpeg";
    return {
      ext: ext,
      mimeType: mimeType,
    };
  }
};
