(() => {
  /*
  Store the calculated ciphertext and IV here, so we can decrypt the message later.
  */
  let ciphertext;
  let iv;
  let base;
  /*
  Fetch the contents of the "message" textbox, and encode it
  in a form we can use for the encrypt operation.
  */
  function getMessageEncoding() {
    const messageBox = document.querySelector("#aes-cbc-message");
    let message = messageBox.value;
    let enc = new TextEncoder();
    return enc.encode(message);
  }
  function arrayBufferToBase64(arrayBuffer) {
    const bytes = new Uint8Array(arrayBuffer);
    let binary = "";
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }
  /*
  Get the encoded message, encrypt it and display a representation
  of the ciphertext in the "Ciphertext" element.
  */
  async function encryptMessage(key) {
    let encoded = getMessageEncoding();
    // The iv must never be reused with a given key.
    iv = window.crypto.getRandomValues(new Uint8Array(16));
    ciphertext = await window.crypto.subtle.encrypt({
        name: "AES-CBC",
        iv
      },
      key,
      encoded
    );
    let buffer = new Uint8Array(ciphertext);
    const ciphertextValue = document.querySelector(".aes-cbc .ciphertext-value");
    ciphertextValue.classList.add('fade-in');
    ciphertextValue.addEventListener('animationend', () => {
      ciphertextValue.classList.remove('fade-in');
    });
    base = arrayBufferToBase64(buffer);
    ciphertextValue.textContent = base;
  }
  function base64ToArrayBuffer(base64) {
    const binaryString = window.atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  }
  /*
  Fetch the ciphertext and decrypt it.
  Write the decrypted message into the "Decrypted" box.
  */
  async function decryptMessage(key) {
    let buffer = base64ToArrayBuffer(base);
    let decrypted = await window.crypto.subtle.decrypt({
        name: "AES-CBC",
        iv
      },
      key,
      buffer //ciphertext
    );
    let dec = new TextDecoder();
    const decryptedValue = document.querySelector(".aes-cbc .decrypted-value");
    decryptedValue.classList.add('fade-in');
    decryptedValue.addEventListener('animationend', () => {
      decryptedValue.classList.remove('fade-in');
    });
    decryptedValue.textContent = dec.decode(decrypted);
  }
  /*
  Generate an encryption key, then set up event listeners
  on the "Encrypt" and "Decrypt" buttons.
  */
  window.crypto.subtle.generateKey({
      name: "AES-CBC",
      length: 256
    },
    true,
    ["encrypt", "decrypt"]
  ).then((key) => {
    const encryptButton = document.querySelector(".aes-cbc .encrypt-button");
    encryptButton.addEventListener("click", () => {
      encryptMessage(key);
    });
    const decryptButton = document.querySelector(".aes-cbc .decrypt-button");
    decryptButton.addEventListener("click", () => {
      decryptMessage(key);
    });
  });
})();
