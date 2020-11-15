import { UrlTile } from "react-native-maps";

type ValueOf<T> = T[keyof T];
type KeysEnum<T> = { [P in keyof Required<T>]: true };

type BarcodeTypeSms = {
  type: "BARCODE_TYPE_SMS";
  phoneNumber: string;
  message: string;
};

type BarcodeTypePhone = {
  type: "BARCODE_TYPE_PHONE";
  phoneNumber: string;
};

type BarcodeTypeUrl = {
  type: "BARCODE_TYPE_URL";
  url: string;
};

type BarcodeTypeCalendar = Partial<{
  type: "BARCODE_TYPE_CALENDAR";
  summary: string;
  dtstart: string;
  dtend: string;
  location: string;
  description: string;
}>;

type BarcodeTypeVcard = Partial<{
  type: "BARCODE_TYPE_VCARD";
  n: string;
  org: string;
  title: string;
  tel: string;
  url: string;
  email: string;
  adr: string;
  note: string;
}>;

type BarcodeTypeGeo = {
  type: "BARCODE_TYPE_GEO";
  latitude: string;
  longitude: string;
  query?: string;
};

type BarcodeTypeEmail = {
  type: "BARCODE_TYPE_EMAIL";
  emailLinkingUrl: string;
};

export type DetectedBarcodeTypes = (
  | BarcodeTypeSms
  | BarcodeTypePhone
  | BarcodeTypeUrl
  | BarcodeTypeCalendar
  | BarcodeTypeVcard
  | BarcodeTypeGeo
  | BarcodeTypeEmail
)[];

export const BARCODE_TYPES = {
  URL: "BARCODE_TYPE_URL",
  CALENDAR: "BARCODE_TYPE_CALENDAR",
  EMAIL: "BARCODE_TYPE_EMAIL",
  SMS: "BARCODE_TYPE_SMS",
  VCARD: "BARCODE_TYPE_VCARD",
  GEO: "BARCODE_TYPE_GEO_COORDINATE",
  PHONE: "BARCODE_TYPE_PHONE",
  FREE_TEXT: "BARCODE_TYPE_FREE_TEXT",
};

export const detectBarcodeTypes = (data: string) => {
  let types: DetectedBarcodeTypes = [];
  const url = getUrlInfo(data);
  const calendar = getCalendarInfo(data);
  const email = getEmailInfo(data);
  const sms = getSmsInfo(data);
  const vCard = getVcardInfo(data);
  const geo = getGeoInfo(data);
  const phone = getPhoneInfo(data);

  if (url) types.push(url);
  if (calendar) types.push(calendar);
  if (email) types.push(email);
  if (sms) types.push(sms);
  if (vCard) types.push(vCard);
  if (geo) types.push(geo);
  if (phone) types.push(phone);

  return types;
};

export function getUrlInfo(data: string): BarcodeTypeUrl | undefined {
  // const dataLower = data.toLowerCase();
  // const urlIndicator = "urlto:";
  // const urlIndicatorIndex = dataLower.indexOf(urlIndicator);
  // let urlString;

  // if (urlIndicatorIndex !== -1) {
  //   urlString = data.substring(urlIndicatorIndex + urlIndicator.length);
  // } else {
  //   urlString = data;
  // }

  const matches = data.match(/\bhttps?:\/\/\S+/);

  if (matches) {
    return {
      type: "BARCODE_TYPE_URL",
      url: matches[0],
    };
  }
}

export function getEmailInfo(data: string): BarcodeTypeEmail | undefined {
  const dataLower = data.toLowerCase();

  const mailtoSeperator = "mailto:";
  const mailtoIndex = dataLower.indexOf(mailtoSeperator);
  if (mailtoIndex === -1) return;
  return {
    type: "BARCODE_TYPE_EMAIL",
    emailLinkingUrl: data,
  };
}

export function getPhoneInfo(data: string): BarcodeTypePhone | undefined {
  const dataLower = data.toLowerCase();

  function notExistsConverter(i: number) {
    if (i === -1) return 10000000;
    return i;
  }

  const phoneIndicator = "tel:";
  const phoneIndicatorIndex = dataLower.indexOf(phoneIndicator);
  if (phoneIndicatorIndex === -1) return;
  const phoneNumber = data.substring(
    phoneIndicatorIndex + phoneIndicator.length,
    Math.min(
      data.length,
      notExistsConverter(
        data.indexOf("\n", phoneIndicatorIndex + phoneIndicator.length)
      ),
      notExistsConverter(
        data.indexOf(":", phoneIndicatorIndex + phoneIndicator.length)
      ),
      notExistsConverter(
        data.indexOf(",", phoneIndicatorIndex + phoneIndicator.length)
      )
    )
  );
  return {
    type: "BARCODE_TYPE_PHONE",
    phoneNumber,
  };
}

// const data = "smsto:554812542503400:hi,whats up?"
export function getSmsInfo(data: string): BarcodeTypeSms | undefined {
  let smsIndicator = "smsto:";
  let smsIndicatorIndex = data.toLowerCase().indexOf(smsIndicator);

  if (smsIndicatorIndex === -1) {
    smsIndicator = "sms:";
    smsIndicatorIndex = data.toLowerCase().indexOf(smsIndicator);
  }

  if (smsIndicatorIndex === -1) return;

  const seperator = ":";
  const nextSeperatorIndex = data.indexOf(
    seperator,
    smsIndicatorIndex + smsIndicator.length
  );
  const phoneNumber = data.substring(
    smsIndicatorIndex + smsIndicator.length,
    nextSeperatorIndex
  );
  const message = data.substring(
    data.indexOf(phoneNumber) + phoneNumber.length + seperator.length
  );
  return {
    type: "BARCODE_TYPE_SMS",
    phoneNumber,
    message,
  };
}

// const data = `BEGIN:VEVENT
// SUMMARY:I am title!
// DTSTART:20201112T014800Z
// DTEND:20201118T184500Z
// LOCATION:Istanbul Location
// DESCRIPTION:Hi, I am a description
// END:VEVENT`
export function getCalendarInfo(data: string): BarcodeTypeCalendar | undefined {
  if (data.indexOf("VEVENT") === -1) return;
  const dataLines = data.split(/\r?\n/);

  const posssibleKeys = [
    "summary",
    "dtstart",
    "dtend",
    "location",
    "description",
  ];

  let eventDetails: BarcodeTypeCalendar = {};
  dataLines.forEach((line) => {
    const keyValue = line.split(":");
    const key = keyValue.shift();
    const value = keyValue.join(":");

    if (key && value && posssibleKeys.includes(key.toLowerCase())) {
      const keyLower = key.toLowerCase() as keyof Omit<
        BarcodeTypeCalendar,
        "type"
      >;
      eventDetails[keyLower] = value;
    }
  });
  return {
    type: "BARCODE_TYPE_CALENDAR",
    ...eventDetails,
  };
}

// BEGIN:VCARD
// VERSION:3.0
// N:name name2
// ORG:company company2
// TITLE:title title2
// TEL:23123012301230
// URL:webstie.ur.lcom
// EMAIL:asdasdo@coasd.com
// ADR:adres1-1 adres1-2 adres2-1 adres2-2
// NOTE:memo1 memo2
// END:VCARD
export function getVcardInfo(data: string): BarcodeTypeVcard | undefined {
  if (data.indexOf("VCARD") === -1) return;
  const dataLines = data.split(/\r?\n/);

  const posssibleKeys = [
    "n",
    "org",
    "title",
    "tel",
    "url",
    "email",
    "adr",
    "note",
  ];

  let cardDetails: BarcodeTypeVcard = {};
  dataLines.forEach((line) => {
    const keyValue = line.split(":");
    const key = keyValue.shift();
    const value = keyValue.join(":");
    if (key && value && posssibleKeys.includes(key.toLowerCase())) {
      const keyLower = key.toLowerCase() as keyof Omit<
        BarcodeTypeVcard,
        "type"
      >;
      cardDetails[keyLower] = value;
    }
  });
  return {
    type: "BARCODE_TYPE_VCARD",
    ...cardDetails,
  };
}

// const data = `geo:25.558,-18.26569?q=i am query here`
export function getGeoInfo(data: string): BarcodeTypeGeo | undefined {
  const dataLower = data.toLowerCase();
  const geoText = "geo:";
  const geoIndex = dataLower.indexOf(geoText);
  if (geoIndex === -1) return;
  const commaIndex = dataLower.indexOf(",", geoIndex + geoText.length);
  const latitude = data.substring(geoIndex + geoText.length, commaIndex);
  let longitude;
  let query;
  const querySeperator = "?q=";
  let queryIndex = dataLower.indexOf(querySeperator);
  if (queryIndex === -1) {
    longitude = data.substring(commaIndex + 1);
  } else {
    longitude = data.substring(commaIndex + 1, queryIndex);
    query = data.substring(queryIndex + querySeperator.length);
  }
  return {
    type: "BARCODE_TYPE_GEO",
    latitude,
    longitude,
    query,
  };
}

// const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
// const latLng = `${lat},${lng}`;
// const label = 'Custom Label';
// const url = Platform.select({
//   ios: `${scheme}${label}@${latLng}`,
//   android: `${scheme}${latLng}(${label})`
// });

// Linking.openURL(url);
