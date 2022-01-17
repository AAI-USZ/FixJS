function(callback) {
      //XXX: Make async
      var list = {};
      var calendarClass = Calendar.Provider.Calendar.Local;
      var cal = new calendarClass(this, {
        // XXX localize this name somewhere
        name: 'your_device',
        id: LOCAL_CALENDAR_ID
      });

      list[LOCAL_CALENDAR_ID] = cal;
      callback(null, list);
    }