import AsyncStorage from "@react-native-async-storage/async-storage";

export const setObject = async (key: string, value: object | any[]) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    // saving error
    console.log(e);
  }
};

export const setValue = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // saving error
    console.log(e);
  }
};

export const getObject = async (key: string) => {
  try {
    const data = await AsyncStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    // error reading value
    console.log(e);
  }
};

export const getValue = async (key: string) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (e) {
    // error reading value
    console.log(e);
  }
};

export const remove = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    // error removing value
    console.log(e);
  }
};
