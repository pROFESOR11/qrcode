import * as Analytics from "expo-firebase-analytics";
import { ValueOf } from "./detectBarcodeType";

export const ANALYTICS_EVENTS = {
    SCAN_EVENT: "SCAN_EVENT",
    SCREEN_VIEW: "SCREEN_VIEW"
}

export function logAnalyticsEvent(eventName: ValueOf<typeof ANALYTICS_EVENTS>, eventData = {}) {
  Analytics.logEvent(eventName, eventData).then(() => {
    console.log("Firebase Analytics - Logged Event", { eventName, eventData });
  });
}
