function buildContacts(contacts) {
      var len = contacts.length;
      var ret = [], group;
      if (len > 0) {
        group = getGroupName(contacts[0]);
      }

      for (var i = 0; i < len; i++) {
        var letter = getGroupName(contacts[i]);

        if (letter !== group) {
          iterateOverGroup(group, ret);
          ret = [contacts[i]];
        } else {
          ret.push(contacts[i]);
        }

        group = letter;
      }

      if (ret.length > 0) {
        iterateOverGroup(group, ret);
      }
    }