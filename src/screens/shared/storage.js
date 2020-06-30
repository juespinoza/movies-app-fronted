import AsyncStorage from "@react-native-community/async-storage";
// Apparently this fixes the https://stackoverflow.com/questions/56101754/how-to-pre-select-items-in-react-native-sectioned-multi-select
// create function for saving items to storage
export const SaveItem = async (key, value) => {
  try {
    console.log("key", key);
    await AsyncStorage.setItem(key, value);
    console.log(`saved storage ${key}`, value);
  } catch (e) {
    console.log(e);
  }
};

// create function for saving items to storage
export const ReadItem = async (key) => {
  try {
    var result = await AsyncStorage.getItem(key);
    return result;
  } catch (e) {
    return e;
  }
};
