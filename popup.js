document.getElementById('saveData').addEventListener('click', () => {
  const input = document.getElementById('dataInput');
  const data = input.value;
  console.log({data});
  try {
    JSON.parse(data); // Validate JSON
    chrome.storage.local.set({ formData: data }, () => {
      console.log("Value is set");
      input.value = '';
      return alert('Data saved!');
    });
  } catch (e) {
    console.error(e);
    return alert('Invalid JSON format');
  }
});

document.getElementById('fillForm').addEventListener('click', async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab || tab.id < 0) {
    return alert("No active tab found!");
  }

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["content.js"]
  });
});
