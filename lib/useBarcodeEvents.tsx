import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";

export interface AsyncStorageBarcodeEvent {
  key: string;
  value: string | null;
}

export function useBarcodeEvents(trigger: boolean) {
  const [barcodeEvents, setbarcodeEvents] = useState<
    AsyncStorageBarcodeEvent[]
  >();

  useEffect(() => {
    (async function () {
      if (!trigger) return;
      let keys = [];
      let data: AsyncStorageBarcodeEvent[] = [];
      try {
        keys = await AsyncStorage.getAllKeys();
        if (keys.length > 0) {
          const _data = await AsyncStorage.multiGet(keys);
          _data.map((entry) => {
            const [key, value] = entry;
            data.push({
              key,
              value,
            });
          });
        }
        setbarcodeEvents(data);
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, [trigger]);

  return barcodeEvents;
}
