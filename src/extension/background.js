chrome.runtime.onInstalled.addListener(function () {
  console.log("installed extension");
  chrome.runtime.onMessage.addListener(async function (request) {
    console.log("Got in background script");
    console.log(request);
  });
});

console.log("Background script started");
