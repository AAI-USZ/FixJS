function prepareDeps() {
    if (!jwcrypto) {
      jwcrypto = require("./jwcrypto");
    }
  }