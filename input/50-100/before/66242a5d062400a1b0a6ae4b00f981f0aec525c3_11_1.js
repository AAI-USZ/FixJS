function() {
    assert.deepEqual(subject._routeViewFn, {});

    assert.instanceOf(
      subject.timeController,
      Calendar.Controllers.Time
    );

    assert.instanceOf(subject.db, Calendar.Db);
    assert.instanceOf(subject.router, Calendar.Router);
  }