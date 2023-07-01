let wordReplacements = [];

chrome.runtime.onMessage.addListener(async function (request) {
  if (request.data) {
    wordReplacements = request.data;
    await saveData(wordReplacements);
    setUpListners();
  }
});

const typeReplacer = (event) => {
  const inputField = event.target;
  if (
    inputField.isContentEditable ||
    inputField.tagName === "TEXTAREA" ||
    inputField.tagName === "INPUT"
  ) {
    const text = inputField.value || inputField.innerText;

    wordReplacements.forEach(function (item) {
      const regex = new RegExp(item.key, "gi");
      const newText = text.replace(regex, item.value);
      if (newText !== text) {
        if (inputField.value) {
          inputField.value = newText;
        } else {
          inputField.innerText = newText;
        }
      }
    });
  }
};

function setUpListners() {
  document.removeEventListener("keyup", typeReplacer);
  document.addEventListener("keyup", typeReplacer);
}

async function saveData(data) {
  await chrome.storage.sync.set({ data: JSON.stringify(data) });
}

function getData() {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(["data"], (e) => {
      if (e.data) {
        resolve(JSON.parse(e.data));
      } else {
        resolve([]);
      }
    });
  });
}

getData().then((e) => {
  console.log(e);
  wordReplacements = e;
  setUpListners();
});