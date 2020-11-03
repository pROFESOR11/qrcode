type ValueOf<T> = T[keyof T];

export interface DetectedBarcodeType {
  type: ValueOf<typeof BARCODE_TYPES>;
  value: string | string[];
}

export const BARCODE_TYPES = {
  url: "BARCODE_TYPE_URL",
  email: "BARCODE_TYPE_EMAIL",
  sms: "BARCODE_TYPE_SMS",
  vCard: "BARCODE_TYPE_VCARD",
  geo: "BARCODE_TYPE_GEO_COORDINATE",
  phone: "BARCODE_TYPE_PHONE",
  freeText: "BARCODE_TYPE_FREE_TEXT",
};

export const detectBarcodeTypes = (data: string) => {
  let types: DetectedBarcodeType[] = [];
  const url = getUrl(data);
  const emails = getEmails(data);

  if (url) types.push({ type: BARCODE_TYPES.url, value: url });
  if (emails) types.push({ type: BARCODE_TYPES.email, value: emails });

  return types;
};

export function getUrl(data: string) {
  const regex = new RegExp(
    "([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?(/.*)?"
  );
  const matches = data.match(regex);
  return matches?.[0];
}

export function getEmails(data: string) {
  const regex = new RegExp(
    "/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+.[a-zA-Z0-9_-]+)/gi"
  );
  const matches = data.match(regex);
  return matches;
}

//TODO: Regex for more types: vcard, geo, phone etc.
