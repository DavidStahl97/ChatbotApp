import {AsyncStorage} from 'react-native';

export async function retrieveItem(id) {
  try {
    const string = await AsyncStorage.getItem(id);
    const data = JSON.parse(string);
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function storeItem(id, item) {
  try {
    await AsyncStorage.setItem(id, JSON.stringify(item));
  } catch (error) {
    console.log(error);
  }
}
