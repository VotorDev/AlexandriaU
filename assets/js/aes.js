// Generate a random initialization vector (IV) of 16 bytes

function generateIV() {

  return window.crypto.getRandomValues(new Uint8Array(16));

}

// Encrypt plaintext using AES with the specified key and IV

function encryptAES(plaintext, key, iv) {

  const algorithm = { name: 'AES-GCM', iv };

  return window.crypto.subtle.encrypt(algorithm, key, plaintext);

}

// Decrypt ciphertext using AES with the specified key and IV

function decryptAES(ciphertext, key, iv) {

  const algorithm = { name: 'AES-GCM', iv };

  return window.crypto.subtle.decrypt(algorithm, key, ciphertext);

}
