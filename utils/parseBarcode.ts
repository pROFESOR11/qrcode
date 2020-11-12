import { ParsedBarcodeEvent } from "../types/barcodeEvent";

export const parseBarcode = (key: string, value: string) => {
  const parsedValue: Omit<ParsedBarcodeEvent, "key"> = JSON.parse(value);
  return {
    key,
    ...parsedValue,
  };
};
