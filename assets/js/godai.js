(() => {

  /*
  Store the calculated ciphertext and IV here, so we can decrypt the message later.
  */
  const iv = new TextEncoder().encode("mzJb7fqyHvSx8UKo");
  const ciphertext = "ANkJwzXZmRfTTcXJglt3Vc83KD7hoTAltBbGHo5mMn2ag43MMTQIjWCYXSoLvNhyj7R3NuToY97/Rs1nfZpOQsNTX+R2kEiaJ6ndHi6aPqNIwpfL4yhXqn38S8CKuAq9l+30FbEQOz6m8EM8KJpTYUaiOIHR4+kUMUz0RTXWugVxmHjnzU/FxfZeom+clMgSuCQnnqm1Ro9hasRIM1IaFgb57nKxnDOd5cTKayFwBwCGYBJgI9tCt9enIZdYnWDwKNjYjginiJ6XIJUMV180dFsv07H7qn1ot2cYp9b3AbC91IXUHiUMexXuQXH8yL0fD8ergHQzpfr+D05uEBf7XYdtoCniBf+2YNC9WGj79tFLl36nuH8+HGLIviRyyLyxfeSD/5CRehSWA/SRU50rKmvzNtbWkMs1Sc2Gcc/knfE1mDVjGuEh14xlU9nvSxoUEIUuGqovauHDgZj/JB5d1eV46IyHsefdBE5gesWnFYt4g9OEyaAZY0zLIkR0xBLZhJIQxPCacNjZSFLrwpAxeK0lRrvkjENynx28coaaDQ+g36ijKU1WCOKPDd2jMkprOMPqXl+FzBOJiBFdnuV1Kv9zI+7E6gzYO9pdowuXyXbfuV8LmKYSi+mQfDYqIWkRyRukw5sKuO3H4Ii+g0QbwlS+cQepfYz3CGWBx1bzEvSs4WYEoClrf0UCHTyJE+aZ0f+6g0ox6LWi4TY0YyqEeO+yrG52BdBu95RhdqZb7lrpPgSYPxOCcMDC+V1wAXDVcupvmVw0yYtgtRTyhrFiB16v/cGwo1XtQq+WbD+qGKvtEfTFNSsIp6mmSnik39jP9LtHemLil02Lo7bJXT3xD+SaIaUqp0/U6ZhkNAXzjOk2n8MsObpI5z8LOG3YGWYKYEK8vi0oSTAXWiQwUfNAZlla9DDFSKURXa4YmkAnDFSEEAAiQQPhzTQ7MZFJ/TM4xVdPgQW2lSn/xLk51RM5wjtsdsr8PpywSkTcT+yN8W7Bj9IOZozX5lfYpVXfd6HC60BnBZiRGEc+n6Vv7oY7BUoLRfdC+U6T34MJe7stDw4Qn8SUcdAqmw7BkXCf6UprpI+8xNm0bLNjY6Bk2cS4mWNHMMnP7tLZUpm4n7EbsA/9g9MqsDpvaazvQkEk3UJPCsg61uMSWtyD4ys/0XoXo/rCds9sPxcTPgtUIFJ1PyOvA0quv7SJeFCZz7PxdNuleYdGAmnckB2u4jTsjJqDpB2AO5VBzYfCfNb6qqMCTLTwrjj0DrxrW6FcJCBRtzisXhhLCHv/mER9aU8qstZybOmMxgHRWKI74Psw2RNXsufF171Uy5zN6ap4v1T0XZRpI+F3NJSy5PvGsyAE/DvXOmiv9U98urrray7mkoqSsCDRMpEvMOu6w1XiQB5IJOYx9IgnGNNcg83JId0IWm7vblk21kLY4hfkpxPbaIfsk7EwiTGOB2DGJPgLIXG6c0v069G+zR+aA8Qq0DiaXd320Q==";

  /*
  Fetch the contents of the "message" textbox, and encode it
  in a form we can use for the encrypt operation.
  */
  async function getKey() {
    const key_box = document.querySelector('input[name="key"]');
    let enc = new TextEncoder();
    let raw_key = enc.encode(key_box.value);
    return window.crypto.subtle.importKey(
      "raw",
      raw_key.buffer,
      "AES-CBC",
      false,
      ["encrypt", "decrypt"]
    );
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
  function decryptMessage() {
    let buffer = base64ToArrayBuffer(ciphertext);
    getKey().then((key) => {
      console.log("1",key);
      window.crypto.subtle.decrypt({
          name: "AES-CBC",
          iv,
          length: 128
        },
        key,
        buffer
      ).then((decrypted) => {
        console.log("2", decrypted);
        let dec = new TextDecoder();
        const decryptedValue = document.querySelector("#decrypted-data");
        console.log("3",decryptedValue);
        clear_text = dec.decode(decrypted);
        decryptedValue.innerHTML = clear_text;
        console.log("4", clear_text);
      });
    });
  }

  /*
  Generate an encryption key, then set up event listeners
  on the "Encrypt" and "Decrypt" buttons.
  */
  window.addEventListener('DOMContentLoaded', (event) => {
    const decryptButton = document.querySelector("#decrypt-button");
    decryptButton.addEventListener("click", () => {
        console.log("0","decrypt");
        decryptMessage();
    });
  });
})();
