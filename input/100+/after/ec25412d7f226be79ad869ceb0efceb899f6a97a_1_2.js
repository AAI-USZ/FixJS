function () {
    happened = {archived_tasks: 0, tasks: 0};

    tasks.unbind('reset');
    archived_tasks.unbind('reset');
    tasks.bind('reset', inc('tasks'));
    archived_tasks.bind('reset', inc('archived_tasks'));

    tasks.reset([ {id: 0, archived: 0, order: 0}
                , {id: 1, archived: 1, order: 1}
                , {id: 2, archived: 1, order: 2}]);

    assert.equal(happened.tasks, 1);
    assert.equal(happened.archived_tasks, 1);

    assert.deepEqual(tasks.pluck('id'), [0, 1, 2]);
    assert.deepEqual(archived_tasks.pluck('id'), [2, 1]);
    assert.deepEqual(_.pluck(tasks.models, 'cid'), ['c13', 'c14', 'c15']);
    assert.deepEqual(_.pluck(archived_tasks.models, 'cid'), ['c15', 'c14']);

    happened = {
      archived_tasks: 0
    , tasks: 0
    , tasks_add: 0
    , archived_tasks_add: 0
    , tasks_remove: 0
    , archived_tasks_remove: 0
    };

    _.each([tasks, archived_tasks], function (coll) {
      coll.unbind('add');
      coll.unbind('reset');
      coll.unbind('remove');
    });

    tasks.bind('add', inc('tasks_add'));
    archived_tasks.bind('add', inc('archived_tasks_add'));
    tasks.bind('reset', inc('tasks'));
    archived_tasks.bind('reset', inc('archived_tasks'));
    tasks.bind('remove', inc('tasks_remove'));
    archived_tasks.bind('remove', inc('archived_tasks_remove'));

    archived_tasks.reset([]);

    assert.equal(happened.tasks_add, 0);
    assert.equal(happened.archived_tasks_add, 0);
    assert.equal(happened.tasks, 1);
    assert.equal(happened.archived_tasks, 1);
    assert.equal(happened.tasks_remove, 0);
    assert.equal(happened.archived_tasks_remove, 0);

    assert.deepEqual(tasks.pluck('id'), [0, 1, 2]);
    assert.deepEqual(archived_tasks.pluck('id'), []);
    assert.deepEqual(_.pluck(tasks.models, 'cid'), ['c13', 'c14', 'c15']);
    assert.deepEqual(_.pluck(archived_tasks.models, 'cid'), []);
  }