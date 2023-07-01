chrome.runtime.onInstalled.addListener(function () {
  chrome.runtime.onMessage.addListener(async function (request) {
    if (request.data) {
      saveData(request.data);
    }
  });
});

function saveData(data) {
  chrome.storage.local.set({ data: JSON.stringify(data) });
}

console.log("Background script started");
