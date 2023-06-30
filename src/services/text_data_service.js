import { isEmpty } from "../utils/utils";

const DATA_ITEMS_KEY = "data_items";

export function setNewData(data) {
  let out = [];
  data.map((e) => {
    if (!isEmpty(e.key) && !isEmpty(e.value)) {
      out.push(e);
    }
  });
  localStorage.setItem(DATA_ITEMS_KEY, JSON.stringify(out));
}

export function setNewDataItem(key, value) {
  let existingItems = getDataItems();
  existingItems.push({
    key: key,
    value: value,
  });
  localStorage.setItem(DATA_ITEMS_KEY, JSON.stringify(existingItems));
}

export function getDataItems() {
  try {
    let data = localStorage.getItem(DATA_ITEMS_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {}
  return [];
}
