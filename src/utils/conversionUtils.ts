
/**
 * Base64 encoding/decoding utilities
 */
export const encodeBase64 = (text: string): string => {
  try {
    return btoa(text);
  } catch (e) {
    console.error("Error encoding to Base64:", e);
    return "";
  }
};

export const decodeBase64 = (encoded: string): string => {
  try {
    return atob(encoded);
  } catch (e) {
    console.error("Error decoding from Base64:", e);
    return "";
  }
};

/**
 * URL encoding/decoding utilities
 */
export const encodeURL = (text: string): string => {
  return encodeURIComponent(text);
};

export const decodeURL = (encoded: string): string => {
  return decodeURIComponent(encoded);
};

/**
 * Binary/Hex/Decimal conversion utilities
 */
export const textToBinary = (text: string): string => {
  return text
    .split("")
    .map((char) => char.charCodeAt(0).toString(2).padStart(8, "0"))
    .join(" ");
};

export const binaryToText = (binary: string): string => {
  return binary
    .split(" ")
    .map((bin) => String.fromCharCode(parseInt(bin, 2)))
    .join("");
};

export const decimalToHex = (decimal: number): string => {
  return decimal.toString(16).toUpperCase();
};

export const hexToDecimal = (hex: string): number => {
  return parseInt(hex, 16);
};

/**
 * JSON/YAML conversion utilities
 */
export const jsonToText = (json: any): string => {
  try {
    return JSON.stringify(json, null, 2);
  } catch (e) {
    console.error("Error converting JSON to text:", e);
    return "";
  }
};

export const textToJson = (text: string): any => {
  try {
    return JSON.parse(text);
  } catch (e) {
    console.error("Error converting text to JSON:", e);
    return null;
  }
};

// Add more conversion utilities as needed
