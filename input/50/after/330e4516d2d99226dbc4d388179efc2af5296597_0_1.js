function() {
      // We will get a 0 status if the app is in app://
      if (req.readyState === 4 && (req.status === 200 ||
                                   req.status === 0)) {
        var contacts = JSON.parse(req.responseText);
        this._insertContacts(contacts);
      }
    }