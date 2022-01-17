function() {
      if (req.readyState === 4 && req.status === 200) {
        var contacts = JSON.parse(req.responseText);
        this._insertContacts(contacts);
      }
    }