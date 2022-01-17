function(callback) {
      //XXX: Make async
      var l10nId = 'calendar-local';
      var list = {};
      var name;
      var calendarClass = Calendar.Provider.Calendar.Local;

      if ('mozL10n' in window.navigator) {
        name = window.navigator.mozL10n.get(l10nId);
        if (name === l10nId) {
          name = null;
        }
      }

      if (!name) {
        name = 'Offline Calendar';
      }

      var cal = new calendarClass(this, {
        // XXX localize this name somewhere
        name: name,
        id: LOCAL_CALENDAR_ID
      });

      list[LOCAL_CALENDAR_ID] = cal;
      callback(null, list);
    }