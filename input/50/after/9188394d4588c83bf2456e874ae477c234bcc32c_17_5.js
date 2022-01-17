function(done) {
      calendars[2] = new Calendar.Models.Calendar({
        accountId: 'some-other',
        remote: { id: 666 }
      });

      // this is our control to ensure
      // we are not removing extra stuff
      calStore.persist(calendars[2], done);
    }