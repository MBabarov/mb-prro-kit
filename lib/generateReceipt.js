import receipt from "receipt";
import receiptData from "./textReceiptGenerator/index.js";

const generateReceipt = () => {
  return receipt.create(receiptData)
};

export default generateReceipt;
