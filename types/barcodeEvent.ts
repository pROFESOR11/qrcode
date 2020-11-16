import { DetectedBarcodeTypes } from "../utils/detectBarcodeType";

export type ParsedBarcodeEvent = {
  key: string;
  data: string;
  type: string;
  isFavourite: boolean;
  date: Date;
  details: DetectedBarcodeTypes;
};
