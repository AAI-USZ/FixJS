function(done) {
      calendars = {};
      calStore = subject.db.getStore('Calendar');

      model = subject._createModel({
        providerType: 'Local'
      });

      subject.persist(model, done);
    }