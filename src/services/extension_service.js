/*global chrome*/
import { tab } from "@testing-library/user-event/dist/tab";
import { getDataItems } from "./text_data_service";

export function sendDataToChrome() {
  try {
    let data = getDataItems();
    saveData(data);
    sendToBackground(data);
    sendToTab(data);
  } catch (e) {
    console.log(e);
  }
}

function saveData(data) {
  chrome.storage.local.set({ data: JSON.stringify(data) });
}

function sendToBackground(data) {
  try {
    chrome.runtime.sendMessage({ data: data }, function (response) {
      console.log(response);
    });
  } catch (e) {
    console.log(e);
  }
}

function sendToTab(data) {
  try {
    chrome.tabs.query({}, function (tabs) {
      for (let i = 0; i < tabs.length; i++) {
        chrome.tabs.sendMessage(tabs[i].id, { data: data });
      }
    });
  } catch (e) {
    console.log(e);
  }
}
