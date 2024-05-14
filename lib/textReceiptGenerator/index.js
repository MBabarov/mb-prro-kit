import getHeaders from "./header.js";
import receiptConfig from "../../config/receiptConfig.js";

// const receiptFormatter = (receiptConfig.width < 40) ? 'narrowTable' : 'customTable';
const headers = getHeaders();

const receiptData = [
  { type: 'table', headers, lines: [] },
];

export default receiptData;

