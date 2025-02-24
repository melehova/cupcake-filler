chrome.storage.local.get("formData", (result) => {
  if (!result.formData) return alert("No data found");

  const data = JSON.parse(result.formData);

  function fillField(name, value) {
      const input = document.querySelector(`input[name="${name}"]`);
      if (!input) return;
      
      if (input.type === 'radio') {
          input.click();
          input.dispatchEvent(new Event('change', { bubbles: true }));
      } else if (input.type === 'tel') {
          fillPhone(input, value);
      } else {
          input.setAttribute('value', value);
          input.dispatchEvent(new Event('input', { bubbles: true }));
          input.dispatchEvent(new Event('change', { bubbles: true }));
      }
  }

  function fillPhone(input, phoneNumber) {
      input.dispatchEvent(new Event('focus', { bubbles: true }));
      input.value = '';
      
      phoneNumber.split('').forEach((char, i) => {
          setTimeout(() => {
              input.value += char;
              input.dispatchEvent(new Event('input', { bubbles: true }));
              input.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: char }));
              input.dispatchEvent(new KeyboardEvent('keyup', { bubbles: true, key: char }));
          }, i * 50);
      });

      setTimeout(() => {
          input.dispatchEvent(new Event('change', { bubbles: true }));
          input.dispatchEvent(new Event('blur', { bubbles: true }));
      }, phoneNumber.length * 50);
  }

  for (const key in data) {
      fillField(key, data[key]);
  }
});
