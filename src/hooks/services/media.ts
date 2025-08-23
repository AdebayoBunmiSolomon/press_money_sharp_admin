// import { useState } from "react";
// import * as ImagePicker from "expo-image-picker";
// import { Alert } from "react-native";

// export type ImagePickerResult = {
//   uri: string;
//   type: string;
//   name: string;
//   size?: number;
// };

// export type ImagePickerOptions = {
//   quality?: number;
//   allowsEditing?: boolean;
//   aspect?: [number, number];
// };

// export type UseImagePickerReturn = {
//   isLoading: boolean;
//   pickFromGallery: (
//     options?: ImagePickerOptions
//   ) => Promise<ImagePickerResult | null>;
//   pickFromCamera: (
//     options?: ImagePickerOptions
//   ) => Promise<ImagePickerResult | null>;
// };

// // Default options for ~50KB output
// const defaultOptions: ImagePickerOptions = {
//   quality: 0.2, // Lower quality for smaller file size
//   allowsEditing: true,
//   aspect: [4, 3],
// };

// export const useMedia = (): UseImagePickerReturn => {
//   const [isLoading, setIsLoading] = useState(false);

//   // Helper function to process image result
//   const processImageResult = (
//     result: ImagePicker.ImagePickerResult
//   ): ImagePickerResult | null => {
//     if (result.canceled || !result.assets || result.assets.length === 0) {
//       return null;
//     }

//     const asset = result.assets[0];
//     const name = asset.fileName
//       ? asset.fileName.toLowerCase().endsWith(".jpg") ||
//         asset.fileName.toLowerCase().endsWith(".jpeg")
//         ? asset.fileName
//         : `${asset.fileName}.jpg`
//       : `image_${Date.now()}.jpg`;

//     const imageResult = {
//       uri: asset.uri,
//       type: "image/jpeg", // Force JPEG to match Android
//       name,
//       size: asset.fileSize,
//     };

//     console.log("Processed image:", imageResult); // Log to verify size
//     return imageResult;
//   };

//   // Pick image from gallery
//   const pickFromGallery = async (
//     options: ImagePickerOptions = {}
//   ): Promise<ImagePickerResult | null> => {
//     try {
//       setIsLoading(true);

//       const permission =
//         await ImagePicker.requestMediaLibraryPermissionsAsync();
//       if (permission.status !== "granted") {
//         Alert.alert(
//           "Permission Required",
//           "Please allow access to your photo library to select images."
//         );
//         return null;
//       }

//       const mergedOptions = { ...defaultOptions, ...options };

//       const result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ["images"],
//         allowsEditing: mergedOptions.allowsEditing,
//         aspect: mergedOptions.aspect,
//         quality: mergedOptions.quality,
//         exif: false, // Exclude EXIF to reduce size
//         base64: false, // Avoid base64 to keep memory low
//       });

//       return processImageResult(result);
//     } catch (error) {
//       Alert.alert("Error", "Failed to pick image from gallery");
//       return null;
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Pick image from camera
//   const pickFromCamera = async (
//     options: ImagePickerOptions = {}
//   ): Promise<ImagePickerResult | null> => {
//     try {
//       setIsLoading(true);

//       const permission = await ImagePicker.requestCameraPermissionsAsync();
//       if (permission.status !== "granted") {
//         Alert.alert(
//           "Permission Required",
//           "Please allow access to your camera to take photos."
//         );
//         return null;
//       }

//       const mergedOptions = { ...defaultOptions, ...options };

//       const result = await ImagePicker.launchCameraAsync({
//         mediaTypes: ["images"],
//         allowsEditing: mergedOptions.allowsEditing,
//         aspect: mergedOptions.aspect,
//         quality: mergedOptions.quality,
//         exif: false, // Exclude EXIF
//         base64: false,
//       });

//       return processImageResult(result);
//     } catch (error) {
//       Alert.alert("Error", "Failed to take photo");
//       return null;
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return {
//     isLoading,
//     pickFromGallery,
//     pickFromCamera,
//   };
// };

import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";

export type ImagePickerResult = {
  uri: string;
  type: string;
  name: string;
  size?: number;
};

export type ImagePickerOptions = {
  quality?: number;
  allowsEditing?: boolean;
  aspect?: [number, number];
};

export type MultipleImagePickerOptions = ImagePickerOptions & {
  maxImages?: number;
  minImages?: number;
};

export type UseImagePickerReturn = {
  isLoading: boolean;
  pickFromGallery: (
    options?: ImagePickerOptions
  ) => Promise<ImagePickerResult | null>;
  pickFromCamera: (
    options?: ImagePickerOptions
  ) => Promise<ImagePickerResult | null>;
  pickMultipleFromGallery: (
    options?: MultipleImagePickerOptions
  ) => Promise<ImagePickerResult[] | null>;
};

// Default options for ~50KB output
const defaultOptions: ImagePickerOptions = {
  quality: 0.2, // Lower quality for smaller file size
  allowsEditing: true,
  aspect: [4, 3],
};

// Default options for multiple image selection
const defaultMultipleOptions: MultipleImagePickerOptions = {
  quality: 0.2,
  allowsEditing: false, // Usually disabled for multiple selection
  maxImages: 10,
  minImages: 1,
};

export const useMedia = (): UseImagePickerReturn => {
  const [isLoading, setIsLoading] = useState(false);

  // Helper function to process single image result
  const processImageResult = (
    result: ImagePicker.ImagePickerResult
  ): ImagePickerResult | null => {
    if (result.canceled || !result.assets || result.assets.length === 0) {
      return null;
    }

    const asset = result.assets[0];
    const name = asset.fileName
      ? asset.fileName.toLowerCase().endsWith(".jpg") ||
        asset.fileName.toLowerCase().endsWith(".jpeg")
        ? asset.fileName
        : `${asset.fileName}.jpg`
      : `image_${Date.now()}.jpg`;

    const imageResult = {
      uri: asset.uri,
      type: "image/jpeg", // Force JPEG to match Android
      name,
      size: asset.fileSize,
    };

    console.log("Processed image:", imageResult); // Log to verify size
    return imageResult;
  };

  // Helper function to process multiple image results
  const processMultipleImageResults = (
    result: ImagePicker.ImagePickerResult
  ): ImagePickerResult[] | null => {
    if (result.canceled || !result.assets || result.assets.length === 0) {
      return null;
    }

    const processedImages = result.assets.map((asset, index) => {
      const name = asset.fileName
        ? asset.fileName.toLowerCase().endsWith(".jpg") ||
          asset.fileName.toLowerCase().endsWith(".jpeg")
          ? asset.fileName
          : `${asset.fileName}.jpg`
        : `image_${Date.now()}_${index}.jpg`;

      return {
        uri: asset.uri,
        type: "image/jpeg",
        name,
        size: asset.fileSize,
      };
    });

    console.log(`Processed ${processedImages.length} images:`, processedImages);
    return processedImages;
  };

  // Pick single image from gallery
  const pickFromGallery = async (
    options: ImagePickerOptions = {}
  ): Promise<ImagePickerResult | null> => {
    try {
      setIsLoading(true);

      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permission.status !== "granted") {
        Alert.alert(
          "Permission Required",
          "Please allow access to your photo library to select images."
        );
        return null;
      }

      const mergedOptions = { ...defaultOptions, ...options };

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: mergedOptions.allowsEditing,
        aspect: mergedOptions.aspect,
        quality: mergedOptions.quality,
        exif: false, // Exclude EXIF to reduce size
        base64: false, // Avoid base64 to keep memory low
        selectionLimit: 1, // Explicitly set to 1 for single selection
      });

      return processImageResult(result);
    } catch (error) {
      Alert.alert("Error", "Failed to pick image from gallery");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Pick multiple images from gallery (up to 4)
  const pickMultipleFromGallery = async (
    options: MultipleImagePickerOptions = {}
  ): Promise<ImagePickerResult[] | null> => {
    try {
      setIsLoading(true);

      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permission.status !== "granted") {
        Alert.alert(
          "Permission Required",
          "Please allow access to your photo library to select images."
        );
        return null;
      }

      const mergedOptions = { ...defaultMultipleOptions, ...options };

      // ✅ only allow up to 4 images
      const maxImages = mergedOptions.maxImages || 4;

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: mergedOptions.allowsEditing,
        quality: mergedOptions.quality,
        exif: false,
        base64: false,
        selectionLimit: maxImages, // user can pick 1–4 images
        allowsMultipleSelection: true,
      });

      const processedResults = processMultipleImageResults(result);

      if (processedResults && processedResults.length > maxImages) {
        Alert.alert(
          "Too Many Images",
          `Please select no more than ${maxImages} images. You selected ${processedResults.length}.`
        );
        return null;
      }

      return processedResults;
    } catch (error) {
      console.error("Multiple image picker error:", error);
      Alert.alert("Error", "Failed to pick images from gallery");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Pick image from camera
  const pickFromCamera = async (
    options: ImagePickerOptions = {}
  ): Promise<ImagePickerResult | null> => {
    try {
      setIsLoading(true);

      const permission = await ImagePicker.requestCameraPermissionsAsync();
      if (permission.status !== "granted") {
        Alert.alert(
          "Permission Required",
          "Please allow access to your camera to take photos."
        );
        return null;
      }

      const mergedOptions = { ...defaultOptions, ...options };

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ["images"],
        allowsEditing: mergedOptions.allowsEditing,
        aspect: mergedOptions.aspect,
        quality: mergedOptions.quality,
        exif: false, // Exclude EXIF
        base64: false,
      });

      return processImageResult(result);
    } catch (error) {
      Alert.alert("Error", "Failed to take photo");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    pickFromGallery,
    pickFromCamera,
    pickMultipleFromGallery,
  };
};
