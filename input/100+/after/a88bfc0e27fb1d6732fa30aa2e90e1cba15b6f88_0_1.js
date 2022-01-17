function cm_getContactData(number, callback) {
    // so desktop keeps working
    if (!navigator.mozSms || !navigator.mozContacts)
      callback(null);

    var options = {
      filterBy: ['tel'],
      filterOp: 'contains',
      filterValue: number
    };

    var cacheResult = this.contactData[number];
    if (typeof cacheResult !== 'undefined') {
      var cacheArray = cacheResult ? [cacheResult] : [];
      callback(cacheArray);
    }

    var self = this;
    var req = window.navigator.mozContacts.find(options);
    req.onsuccess = function onsuccess() {
      // Update the cache before callback.
      var cacheData = self.contactData[number];
      var result = req.result;
      if (result.length > 0) {
        if (cacheData && (cacheData.name[0] == dbData.name[0]))
          return;

        self.contactData[number] = result[0];
      } else {
        if (cacheData === null)
          return;

        self.contactData[number] = null;
      }
      callback(result);
    };

    req.onerror = function onerror() {
      var msg = 'Contact finding error. Error: ' + req.errorCode;
      console.log(msg);
      callback(null);
    };
  }