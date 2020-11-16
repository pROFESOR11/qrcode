import { format } from "date-fns";
import * as Calendar from "expo-calendar";
import { ParsedBarcodeEvent } from "../types/barcodeEvent";

export async function getCalendarPermission() {
  const { status } = await Calendar.requestCalendarPermissionsAsync();
  return status === "granted";
}

function formatDateStringForCalendar(dateString: string) {
  const year = dateString.substring(0, 4);
  const month = dateString.substring(4, 6);
  const day = dateString.substring(6, 8);
  const hh = dateString.substring(9, 11);
  const mm = dateString.substring(11, 13);
  const ss = dateString.substring(13, 15);

  const formattedDateString = `${year}-${month}-${day}T${hh}:${mm}:${ss}.000Z`;
  console.log("formattedDateString", formattedDateString);
  return formattedDateString;
}

export async function createCalendarEvent(
  data:
    | Partial<{
        type: "BARCODE_TYPE_CALENDAR";
        summary: string;
        dtstart: string;
        dtend: string;
        location: string;
        description: string;
      }>
    | undefined
) {
  const isPermitted = await getCalendarPermission();
  if (isPermitted) {
    try {
      const defaultCalendar = await Calendar.getDefaultCalendarAsync();

      const eventDetails: Partial<Calendar.Event> | undefined = {
        startDate: formatDateStringForCalendar(data!.dtstart!),
        endDate: formatDateStringForCalendar(data!.dtend!),
        title: data?.summary,
        location: data?.location,
        notes: data?.description,
      };

      eventDetails &&
        (await Calendar.createEventAsync(defaultCalendar.id, eventDetails));

      return true;
    } catch (err) {
      console.log("err", err);
      return false;
    }
  } else {
    throw new Error("Not Permitted");
  }
}
