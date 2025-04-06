
import { saveAs } from 'file-saver';

// Document Conversions
export const convertTextToHTML = (text: string): string => {
  return text.split('\n').map(line => `<p>${line}</p>`).join('');
};

export const convertHTMLToText = (html: string): string => {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  return tempDiv.textContent || tempDiv.innerText || '';
};

export const convertMarkdownToHTML = (markdown: string): string => {
  // Basic markdown conversion (headers, bold, italic, lists)
  let html = markdown
    // Headers
    .replace(/^# (.*$)/gm, '<h1>$1</h1>')
    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
    // Bold and Italic
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Lists
    .replace(/^\s*\* (.*$)/gm, '<ul><li>$1</li></ul>')
    .replace(/^\s*\d+\. (.*$)/gm, '<ol><li>$1</li></ol>')
    // Line breaks
    .replace(/\n/g, '<br>');
  
  return html;
};

// Data Conversions
export const convertJSONToCSV = (jsonData: string): string => {
  try {
    const data = JSON.parse(jsonData);
    if (!Array.isArray(data) || !data.length) {
      throw new Error('JSON must be an array of objects');
    }

    const headers = Object.keys(data[0]);
    const csvRows = [];
    
    // Add headers
    csvRows.push(headers.join(','));
    
    // Add rows
    for (const row of data) {
      const values = headers.map(header => {
        const value = row[header];
        return `"${value ? String(value).replace(/"/g, '""') : ''}"`;
      });
      csvRows.push(values.join(','));
    }
    
    return csvRows.join('\n');
  } catch (error) {
    console.error('Error converting JSON to CSV:', error);
    throw error;
  }
};

export const convertCSVToJSON = (csvData: string): string => {
  try {
    const lines = csvData.split('\n');
    const headers = lines[0].split(',').map(header => header.trim());
    const result = [];
    
    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue; // Skip empty lines
      
      const data = lines[i].split(',');
      const obj: Record<string, string> = {};
      
      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = data[j] ? data[j].trim() : '';
      }
      
      result.push(obj);
    }
    
    return JSON.stringify(result, null, 2);
  } catch (error) {
    console.error('Error converting CSV to JSON:', error);
    throw error;
  }
};

// Encoding Conversions
export const convertToBase64 = (input: string): string => {
  return btoa(input);
};

export const convertFromBase64 = (input: string): string => {
  try {
    return atob(input);
  } catch (error) {
    throw new Error('Invalid Base64 string');
  }
};

export const convertNumberToHex = (input: number): string => {
  return input.toString(16);
};

export const convertNumberToBinary = (input: number): string => {
  return input.toString(2);
};

export const convertHexToDecimal = (input: string): number => {
  return parseInt(input, 16);
};

export const convertBinaryToDecimal = (input: string): number => {
  return parseInt(input, 2);
};

// URL encoding
export const encodeURL = (input: string): string => {
  return encodeURIComponent(input);
};

export const decodeURL = (input: string): string => {
  return decodeURIComponent(input);
};

// Generate hash (using Web Crypto API)
export const generateMD5Hash = async (input: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data); // Using SHA-256 since MD5 isn't in Web Crypto
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

// Helper to download files
export const downloadFile = (content: string, filename: string, type: string) => {
  const blob = new Blob([content], { type });
  saveAs(blob, filename);
};
