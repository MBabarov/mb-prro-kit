import generateReceipt from "./generateReceipt.js";
import receiptData from "./textReceiptGenerator/index.js";

describe("receipt", () => {
  it("generateReceipt", () => {
    expect(generateReceipt(receiptData)).toEqual({});
  });
});
