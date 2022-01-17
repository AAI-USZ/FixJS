function gCtByGroup(successCb, errorCb, contacts) {
      if (typeof contacts !== 'undefined') {
        buildContacts(contacts, successCb);
      } else {
        var options = {
          sortBy: 'familyName',
          sortOrder: 'ascending'
        };

        var request = api.find(options);
        request.onsuccess = function findCallback() {
          buildContacts(request.result, successCb);
        };

        request.onerror = errorCb;
        }
    }