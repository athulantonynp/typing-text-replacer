let wordReplacements = [];

chrome.runtime.onMessage.addListener(function (request) {
  if (request.data) {
    wordReplacements = request.data;
  }
  console.log(wordReplacements);
});

document.addEventListener("keyup", function (event) {
  const inputField = event.target;
  console.log("injected script");
  if (
    inputField.isContentEditable ||
    inputField.tagName === "TEXTAREA" ||
    inputField.tagName === "INPUT"
  ) {
    const text = inputField.value || inputField.innerText;

    wordReplacements.forEach(function (item) {
      console.log(`${item.key} => ${item.value}`);
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
});
