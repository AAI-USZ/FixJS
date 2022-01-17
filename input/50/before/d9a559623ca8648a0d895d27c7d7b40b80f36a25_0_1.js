function() {
  "use strict";

  window.BrowserID = window.BrowserID || {};

  // Define some constants.
  _.extend(window.BrowserID, {
    // always use 1024/160 DSA keys - see issue #1293
    // this used to be called keysize 128, but that made
    // no sense since no component of this is 128 bits
    // so making this 160 as per DSA 1024/160
    // EXCEPT, for backwards compatibility this is still 128 for now
    KEY_LENGTH: 128
  });
}