/*global chrome*/
import { getDataItems } from "./text_data_service";

export function sendDataToChrome() {
  try {
    let data = getDataItems();
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { data: data });
    });
  } catch (e) {
    console.log(e);
  }
}
