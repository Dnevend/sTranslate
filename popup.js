let changeColor = document.getElementById("changeColor");

changeColor.onclick = function (el) {
    chrome.storage.sync.get("color", function (data) {
      let { color } = data;
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.executeScript(tabs[0].id, {
          code: 'document.body.style.backgroundColor = "' + color + '";',
        });
      });
    });
  };