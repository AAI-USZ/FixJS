function(done) {
      assert.ok(model._id);
      // we will eventually remove this
      calendars[1] = new Calendar.Models.Calendar({
        accountId: model._id,
        remote: { id: 777 }
      });

      calStore.persist(calendars[1], done);
    }