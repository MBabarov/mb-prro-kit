import receipt from "receipt";
import receiptData from "./textReceiptGenerator/index.js";

const generateReceipt = async () => {
  return await receipt.create(receiptData)
};

export default generateReceipt;
