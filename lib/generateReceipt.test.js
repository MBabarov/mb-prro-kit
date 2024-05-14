import generateReceipt from "./generateReceipt.js";
import receiptData from "./textReceiptGenerator/index.js";

describe("receipt", () => {
  it("generateReceipt", async () => {
    expect(await generateReceipt(receiptData)).toEqual({});
  });
});
