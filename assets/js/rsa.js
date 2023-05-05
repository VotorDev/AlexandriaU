// Generate an RSA key pair with the specified key size

async function generateRSAKeyPair(keySize) {

  const algorithm = { name: 'RSA-OAEP', modulusLength: keySize, publicExponent: new Uint8Array([0x01, 0x00, 0x01]) };

  return window.crypto.subtle.generateKey(algorithm, true, ['encrypt', 'decrypt']);

}

// Encrypt plaintext using the public key

async function encryptRSA(plaintext, publicKey) {

  const algorithm = { name: 'RSA-OAEP' };

  return window.crypto.subtle.encrypt(algorithm, publicKey, plaintext);

}

// Decrypt ciphertext using the private key

async function decryptRSA(ciphertext, privateKey) {

  const algorithm = { name: 'RSA-OAEP' };

  return window.crypto.subtle.decrypt(algorithm, privateKey, ciphertext);

}

// Sign data using the private key

async function signData(data, privateKey) {

  const algorithm = { name: 'RSASSA-PKCS1-v1_5', hash: { name: 'SHA-256' } };

  return window.crypto.subtle.sign(algorithm, privateKey, data);

}

// Verify the signature using the public key

async function verifySignature(signature, data, publicKey) {

  const algorithm = { name: 'RSASSA-PKCS1-v1_5', hash: { name: 'SHA-256' } };

  return window.crypto.subtle.verify(algorithm, publicKey, signature, data);

}

