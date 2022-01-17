function findOne(options, callback) {
    var mozContacts = navigator.mozContacts;
    if (mozContacts) {
      var request = mozContacts.find(options, callback);
      request.onsuccess = function findCallback() {
        if (request.result.length == 0)
          return;

        var contacts = request.result;
        callback(contacts[0]);
      };
    } else {
      callback(null);
    }
  }