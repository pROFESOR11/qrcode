import * as Contacts from "expo-contacts";
import { BarcodeTypeVcard } from "./detectBarcodeType";
import { uuidv4 } from "./uuid";

export async function getContactsPermission() {
  const { status } = await Contacts.requestPermissionsAsync();
  return status === "granted";
}

export async function createContact(detail: BarcodeTypeVcard) {
  try {
    const { n, adr } = detail;
    let name = n || "";
    let address = adr || "";
    await Contacts.addContactAsync({
      name,
      firstName: name,
      contactType: "person",
      id: uuidv4(),
      addresses: [{ id: "1", label: address }],
      company: detail.org,
      emails: [{ id: "1", email: detail.email, label: "Email" }],
      note: detail.note,
      jobTitle: detail.title,
      urlAddresses: [{ id: "1", url: detail.url, label: "Web" }],
      phoneNumbers: [
        {
          id: "1",
          number: detail.tel,
          label: "Phone",
        },
      ],
    });
    return true;
  } catch (err) {
    console.log("err", err);
    return false;
  }
}
