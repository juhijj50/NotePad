// src/utils/encryption.js
import CryptoJS from 'crypto-js';

export const encryptNote = (text, password) => {
  const encrypted = CryptoJS.AES.encrypt(text, password).toString();
  return encrypted;
};

export const decryptNote = (encryptedText, password) => {
  const bytes = CryptoJS.AES.decrypt(encryptedText, password);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
};
