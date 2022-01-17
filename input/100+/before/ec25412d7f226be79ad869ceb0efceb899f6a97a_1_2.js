function () {
    tasks = new Collections.Tasks();
    archived_tasks = new Collections.ArchivedTasks(null, {liveupdate_keys: 'all'});

    tasks.reset([{id: 0, archived: 0}, {id: 1, archived: 1}, {id: 2, archived: 1}]);
    assert.equal(tasks.length, 3);
    assert.equal(archived_tasks.length, 2);

    //Update 0 so that it should be in the archived set
    tasks.get(0).set({archived: 1});
    assert.equal(tasks.length, 3);
    assert.equal(archived_tasks.length, 3);
  }